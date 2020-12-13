---
id: conman
title: Conman - console manager
sidebar_label: Conman
---

Connect console

``` sh
conman <name>
```

Exit from console

``` sh
&.
```

Install from source

``` sh
# Required packages
dnf install expect freeipmi freeipmi-devel

# Download, compile, and install
git clone https://github.com/dun/conman.git
cd conman
git tag
git checkout conman-0.3.0
./bootstrap
./configure --prefix=/opt/conman-0.3.0
make
make install
ln -s /opt/conman-0.3.0 /opt/conman
mkdir -p /var/log/conman/console_log/conman/
```

Example conman.conf(e.g. `/opt/conman/etc/conman.conf`)

``` text
server timestamp=1h
SERVER logdir="/var/log/conman/console_log/conman/"
SERVER logfile="conman.log"
global log="/var/log/conman/console_log/%N/%N.%Y.%m%d.%H%M%S"
global logopts="timestamp"

console name="host1" dev="/opt/conman/lib/conman/exec/ipmitool.exp %N-mg.example.com user"
console name="host2" dev="/opt/conman/lib/conman/exec/ipmitool.exp %N-mg.example.com user"
```

Example of `/etc/conman.pswd`

``` text
host[1-2]-mg.example.com : user : password
```

Example conman.service(`/etc/systemd/system/conman.service`)

``` text
[Unit]
Description=ConMan Console Management Daemon
After=network.target

[Service]
Type=forking
# For installations with large number of users, raise the limit
# of open file descriptors:
#LimitNOFILE=10000
ExecStart=/opt/conman/sbin/conmand -c /opt/conman/etc/conman.conf

[Install]
WantedBy=multi-user.target
```

## Setup remote access to serial console CentOS/Redhat

On the `/etc/sysconfig/grub`, add `console=tty0 console=ttyS0,115200n8` to `GRUB_CMDLINE_LINUX` like this:

```
--- /etc/sysconfig/grub 2020-12-08 10:32:54.784876819 +0900
+++ /etc/sysconfig/grub.orig    2020-12-08 09:44:09.023170789 +0900
@@ -3,6 +3,6 @@
 GRUB_DEFAULT=saved
 GRUB_DISABLE_SUBMENU=true
 GRUB_TERMINAL_OUTPUT="console"
-GRUB_CMDLINE_LINUX="crashkernel=auto resume=UUID=dce8618b-f6e2-4a6d-be51-62a1d1dec0ef console=tty0 console=ttyS0,115200n8"
+GRUB_CMDLINE_LINUX="crashkernel=auto resume=UUID=dce8618b-f6e2-4a6d-be51-62a1d1dec0ef rhgb quiet"
 GRUB_DISABLE_RECOVERY="true"
 GRUB_ENABLE_BLSCFG=true
```

Apply the change (and reboot after this command):

```
# Backup grub.cfg
cp /boot/efi/EFI/centos/grub.cfg{,.orig}

# CentOS
grub2-mkconfig -o /boot/efi/EFI/centos/grub.cfg
# Redhat
grub2-mkconfig -o /boot/efi/EFI/centos/grub.cfg
```

Test it

```
# By ipmitool
ipmitool -H host1-mg -I lanplus -U <user> -P <password> sol activate | tee -a console_log.txt

# By conman's ipmitool.exp
/opt/conman-0.3.0/lib/conman/exec/ipmitool.exp host1-mg.oist.jp <user> <password>
```

## References

* [やるメモ- conman](https://shachimaru.wiki.fc2.com/wiki/conman)
