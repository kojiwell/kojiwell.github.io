---
slug: 2018-02-27-lustre-on-centos72
title:  Install Lustre on Multiple CentOS 7 Machines
authors: kojiwell
tags: [centos, lustre]
---

[Lustre](http://lustre.org/) is a parallel distributed file system that's often used in supercomputers. It's a high performance file system, highly scalable, and free -- available under an open source license called [GPL v2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html). If you're interested in supercomputers, Lustre will be one of the things you'd want to put together.

On this post, I'm going to write about how to install Lustre, using six CentOS 7 instances on AWS. This is not about testing Lustre's performance but about understanding the structure of Lustre by actually installing it, so AWS is a convenient platform to do that.

Here, I try my best to explain the Lustre structure with my testing setup. So look at the network diagram below.

![Drawing](/img/lustre_architecture.svg)

 Lustre file system is composed of three types of servers -- MGS(Management Server), MDS(Metadata Server) and OSS(Object Storage Server).

First, look at the MGS. The MGS provides configuration informantion and status updates of all the other servers to all the clients and servers. Those pieces of information and logs are stored in MGT(Management Terget). I will create the MGT on `/dev/xvdb` of the MGS.

Next is the MDS. It provides the index(or namespace) for the Lustre file system. The file metadata -- such as directory structures and file names, permissions and layouts -- are recorded on the MDT(Metadata Terget). In the example, the MDT is made on `/dev/xvdb` of the MDS.

Then, look at the OSS 1, OSS 2 and OSS 3. They are Object Storage Servers, which provide the data storage for all file contents. Those data are stored on OSTs(Object Storage Tergets) -- `/dev/xvdb` and `/dev/xvdc` on the OSSs in my example.

The Client mounts the Lustre file system on a directory -- ``/lustrefs`` in this example -- and uses it like a NFS mounted directory that has high-performance capabilities. In a supercomputer, there are usually a lot of compute nodes -- the hosts on the internal network of a supercomputer are referred to as "nodes", and those nodes become Lustre clients. I have only one client in my example just because I want to simplify the process. So imagine there are a lot of client nodes in a real-world Lustre setup.

## Build The Base Part of All Nodes

As I previously explained, hosts in the internal network of a supercomputer are called as "nodes", so I call hosts nodes. Also, to simplify the process, I assume every step is done by ``root`` account.

To start the installation, add these nodes on `/etc/hosts` of all nodes. The node names are all lower-case letters with no space, and the `/etc/hosts` looks like this:

``` text
127.0.0.1   localhost localhost.localdomain

172.31.47.35   client
172.31.44.215  mgs
172.31.44.227  mds
172.31.39.125  oss1
172.31.32.6    oss2
172.31.44.150  oss3
```

NOTE: You have to update `/etc/hosts` of all the nodes.

Next, install EPEL and ZFS repositories, and also install [Chrony](https://chrony.tuxfamily.org/). (Chrony is a NTP implementation. You can also use `ntp` instead.):

``` text
yum -y install epel-release
rpm -ivh http://download.zfsonlinux.org/epel/zfs-release.el7.centos.noarch.rpm
yum -y install chrony
systemctl start chronyd
systemctl enable chronyd
```

NOTE: It is important to have the correct time on all nodes.

Set the timezone if needed. It's `Asia/Tokyo` in my case, and you can set it by `timedatectl` command like this:

``` text
timedatectl set-timezone Asia/Tokyo
```

Create the Lustre repository configuration file `/etc/yum.repos.d/lustre.repo` and put the follows in it:

``` text
[lustre-server]
name=CentOS-$releasever - Lustre
baseurl=https://downloads.hpdd.intel.com/public/lustre/latest-feature-release/el7/server/
gpgcheck=0

[e2fsprogs]
name=CentOS-$releasever - Ldiskfs
baseurl=https://downloads.hpdd.intel.com/public/e2fsprogs/latest/el7/
gpgcheck=0

[lustre-client]
name=CentOS-$releasever - Lustre
baseurl=https://downloads.hpdd.intel.com/public/lustre/latest-feature-release/el7/client/
gpgcheck=0
```

Install the latest Lustre-enabled kernel and the Lustre client on all nodes:

``` text
yum -y install e2fsprogs \
    lustre-client \
    kernel-3.10.0-514.21.1.el7_lustre.x86_64 \
    kernel-devel-3.10.0-514.21.1.el7_lustre.x86_64 \
    kernel-headers-3.10.0-514.21.1.el7_lustre.x86_64
```

Now you need to **reboot all the nodes** to boot the nodes with the Lustre-enabled kernel.

## Setup LNET Module on Servers(MGS, MDS and OSSs)

Create a modeprobe configuration file for the LNet -- `/etc/modprobe.d/lnet.conf` -- and set
the `networks` parameter as `tcp0(eth0)`. Basically, you just need this one line on the file:

``` text
options lnet networks=tcp0(eth0)
```

LNet is Lustre's network communicatoin protocol. The option `networks=tcp0(eth0)` means that the
node belongs to the LNet named `tcp0` using the network interface `eth0`.

Load the LNET module manually with `modprobe` command like this:

``` text
modprobe lnet
```

Make sure the LNET module is loaded:

``` text
lsmod | grep lnet
```

To automatically load the LNet modules at boot, create
`/etc/sysconfig/modules/lnet.modules` and put the following script in the file:

``` text
#!/bin/sh

if [ ! -c /dev/lnet ] ; then
    exec /sbin/modprobe lnet >/dev/null 2>&1
fi
```

## Setup Lustre Module on Client


Load the Lustre module
with `modprobe` command like this:

``` text
modprobe lustre
```

Check if the Lustre module is loaded:

``` text
lsmod | grep lustre
```

To automatically load the Lustre module at boot, create `/etc/sysconfig/modules/lustre.modules`
with the script below:

``` text
#!/bin/sh

/sbin/lsmod | /bin/grep lustre 1>/dev/null 2>&1
if [ ! $? ] ; then
   /sbin/modprobe lustre >/dev/null 2>&1
fi
```

Now you're ready to create a Lustre file system.

## Create Lustre File System

Now your nodes are ready to create a Lustre file system.

**Create MGT on MGS:**

``` text
ssh root@mgs
mkfs.lustre --mgs /dev/xvdb
mkdir /mgt
mount.lustre /dev/xvdb /mgt
```

**Create MDT on MDS:**

``` text
ssh root@mds
mkfs.lustre --fsname=lustrefs --mgsnode=mgs@tcp0 \
    --mdt --index=0 /dev/xvdb
mkdir /mdt
mount.lustre /dev/xvdb /mdt
```

**Create OST 1 and OST 2 on OSS 1:**

``` text
ssh root@oss1
mkfs.lustre --ost --fsname=lustrefs --mgsnode=mgs@tcp0 \
    --index=1 /dev/xvdb
mkfs.lustre --ost --fsname=lustrefs --mgsnode=mgs@tcp0 \
    --index=2 /dev/xvdc
mkdir /ost1
mkdir /ost2
mount.lustre /dev/xvdb /ost1
mount.lustre /dev/xvdc /ost2
```

**Create OST 3 and OST 4 on OSS 2:**

``` text
ssh root@oss2
mkfs.lustre --ost --fsname=lustrefs --mgsnode=mgs@tcp0 \
    --index=3 /dev/xvdb
mkfs.lustre --ost --fsname=lustrefs --mgsnode=mgs@tcp0 \
    --index=4 /dev/xvdc
mkdir /ost3
mkdir /ost4
mount.lustre /dev/xvdb /ost3
mount.lustre /dev/xvdc /ost4
```

**Create OST 5 and OST 6 on OSS 3:**

``` text
ssh root@oss3
mkfs.lustre --ost --fsname=lustrefs --mgsnode=mgs@tcp0 \
    --index=5 /dev/xvdb
mkfs.lustre --ost --fsname=lustrefs --mgsnode=mgs@tcp0 \
    --index=6 /dev/xvdc
mkdir /ost5
mkdir /ost6
mount.lustre /dev/xvdb /ost5
mount.lustre /dev/xvdc /ost6
```

**Mount Lustre file system on Client**

``` text
mkdir /lustrefs
mount -t lustre mgs@tcp0:/lustrefs /lustrefs
```

## Check the file system

From the client node, you can check the status with `lfs` command.

Check /lustrefs:

``` text
df -h /lustrefs
Filesystem                   Size  Used Avail Use% Mounted on
172.31.42.130@tcp:/lustrefs   56G  223M   53G   1% /lustrefs
```

Check servers:

``` text
lfs check servers
lustrefs-MDT0000-mdc-ffff88003bfbd000 active.
lustrefs-OST0001-osc-ffff88003bfbd000 active.
lustrefs-OST0002-osc-ffff88003bfbd000 active.
lustrefs-OST0003-osc-ffff88003bfbd000 active.
lustrefs-OST0004-osc-ffff88003bfbd000 active.
lustrefs-OST0005-osc-ffff88003bfbd000 active.
lustrefs-OST0006-osc-ffff88003bfbd000 active.
```

Check the file system:

``` text
lfs df -h
UUID                       bytes        Used   Available Use% Mounted on
lustrefs-MDT0000_UUID        5.6G       45.8M        5.0G   1% /lustrefs[MDT:0]
lustrefs-OST0001_UUID        9.2G       37.1M        8.7G   0% /lustrefs[OST:1]
lustrefs-OST0002_UUID        9.2G       37.1M        8.7G   0% /lustrefs[OST:2]
lustrefs-OST0003_UUID        9.2G       37.1M        8.7G   0% /lustrefs[OST:3]
lustrefs-OST0004_UUID        9.2G       37.1M        8.7G   0% /lustrefs[OST:4]
lustrefs-OST0005_UUID        9.2G       37.1M        8.7G   0% /lustrefs[OST:5]
lustrefs-OST0006_UUID        9.2G       37.1M        8.7G   0% /lustrefs[OST:6]

filesystem_summary:        55.3G      222.9M       52.0G   0% /lustrefs
```

If the outputs look good, you're good to go for testing Lustre. Here's a quick test:


``` text
[root@client ~]# for aa in {1..5}; do dd if=/dev/zero of=/lustrefs/file$aa bs=4k iflag=fullblock,count_bytes count=1G; done
[root@client ~]# df -h /lustrefs
Filesystem                   Size  Used Avail Use% Mounted on
172.31.42.130@tcp:/lustrefs   56G  5.3G   47G  10% /lustrefs
[root@client ~]# lfs df -h
UUID                       bytes        Used   Available Use% Mounted on
lustrefs-MDT0000_UUID        5.6G       45.8M        5.0G   1% /lustrefs[MDT:0]
lustrefs-OST0001_UUID        9.2G        1.0G        7.7G  12% /lustrefs[OST:1]
lustrefs-OST0002_UUID        9.2G       37.1M        8.7G   0% /lustrefs[OST:2]
lustrefs-OST0003_UUID        9.2G        2.0G        6.6G  23% /lustrefs[OST:3]
lustrefs-OST0004_UUID        9.2G        1.0G        7.7G  12% /lustrefs[OST:4]
lustrefs-OST0005_UUID        9.2G       37.1M        8.7G   0% /lustrefs[OST:5]
lustrefs-OST0006_UUID        9.2G        1.0G        7.6G  12% /lustrefs[OST:6]
```

## Sidenotes

#### Build and Install Lustre from Source Code

``` text
sed -i '/^SELINUX=/s/.*/SELINUX=disabled/' /etc/selinux/config
yum groupinstall "Development tools"
yum -y install epel-release

yum -y install xmlto asciidoc elfutils-libelf-devel zlib-devel \
       libyaml-devel kernel-devel binutils-devel newt-devel \
       python-devel hmaccalc perl-ExtUtils-Embed bison \
       elfutils-devel audit-libs-devel python-docutils \
       sg3_utils expect attr lsof quilt libselinux-devel \
       e2fsprogs e2fsprogs-devel
yum -y install --enablerepo=base-debuginfo kernel-debuginfo kernel-debuginfo-common

git clone git://git.hpdd.intel.com/fs/lustre-release.git
cd lustre-release
sh ./autogen.sh
./configure --with-linux=/usr/src/kernels/$(uname -r)
make rpms
yum -y install *.$(arch).rpm
reboot
```

#### Infiniband

When you use InfiniBand, `/etc/modprobe.d/lnet.conf` should be like below. The
`ib0` in the config is the ib interface you want to use.

``` text
options lnet networks=o2ib0(ib0)
```

#### RAID

I used block devices for MGT, MDT and OSTs in the example, but in a production
setup, you need to have those on RAID because you don't want to cause data loss.

#### HA(High Availability) for MGS and MDS

The MGS and MDS are so important. So making an extra effort to setup HA is required
for a production.

* [DRBD](https://docs.linbit.com/) - RAID1 over network
* [Heartbeat](http://linux-ha.org/wiki/Heartbeat) or [Pacemaker](https://github.com/ClusterLabs/pacemaker) - Controls and checks communication between two nodes

#### Lustre Tuning

Many options in Lustre are set as kernel module parameters. Go check out
this link -- [Lustre Tuning](http://wiki.lustre.org/Lustre_Tuning).

## References

* [Getting Started With lustre](http://lustre.org/getting-started-with-lustre/)
* [wiki.lustre.org](http://wiki.lustre.org/Main_Page)
* [Quick three-node Lustre set-up on CentOS 6](https://gist.github.com/joshuar/4e283308c932ec62fc05)

