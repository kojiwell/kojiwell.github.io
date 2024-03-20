---
id: idrac
title: iDRAC - integrated Dell Remote Access Controller
sidebar_label: iDRAC
---

The iDRAC is a device in a Dell server that allows IT administrators to manage 
and monitor a remote and local server. It doesn't only provide a web UI but 
also very helpful, handy CLIs.

It also provides SSH public key access, which is wonderful when you manage hundreds of servers
by a parallel shell -- such as [pdsh](https://github.com/chaos/pdsh).

---
Install racadm and omreport

``` sh
# Install
dnf install -y srvadmin-omacore srvadmin-idrac

# Start and enable srvadmin-services
/opt/dell/srvadmin/sbin/srvadmin-services.sh start
/opt/dell/srvadmin/sbin/srvadmin-services.sh enable

# Check it
/opt/dell/srvadmin/sbin/omreport system
```

---
Register a SSH public key

``` sh
racadm -r <ip/hostname> -u <user> -p <password> \
    sshpkauth -i <number> -k <number> -t "$(cat ~/.ssh/id_rsa.pub)"
```

* `-i <number>` : User ID. root is 2
* `-k <number>` : Key ID. 1 ~ 4
* `-t "text"` : content of your public key

You can check a user name by this

``` shell
racadm get idrac.users.<number>.UserName
```

* `<number>` : Root is 2

---

Install Dell System Update, update GPG keys, and then run dsu

```shell
wget -q -O - http://linux.dell.com/repo/hardware/dsu/bootstrap.cgi | bash
curl -s https://linux.dell.com/repo/hardware/dsu/copygpgkeys.sh | bash
yum install dell-system-update
dsu --non-interactive --import-public-key --reboot
```

---

Setup a static IP on iDRAC

```shell
racadm setniccfg -s <IPv4Address> <netmask> <IPv4 gateway>
```

---

Updating iDRAC or BIOS would sometimes fail. If resetting iDRAC doesn't solve the problem, you have to try force-resetting 
jobqueue and then reset iDRAC like this:

``` sh
racadm jobqueue delete -i JID_CLEARALL_FORCE
sleep 120 # Wait for two minutes to make sure jobqueue is cleared
racadm racreset
sleep 300 # Wait for five minutes to ensure iDRAC is back to online
# and then
dsu --non-interactive --reboot
```

---
Generate the SupportAssist log by CLI

``` sh
racadm -r <ip/host> -u <user> -p <password> supportassist accepteula
racadm -r <ip/host> -u <user> -p <password> supportassist collect -f <filename>.zip
```

---
Set up the next boot with PXE and reboot (locally)

``` sh
racadm set iDRAC.ServerBoot.BootOnce Enabled
racadm set iDRAC.ServerBoot.FirstBootDevice PXE
reboot
```

---
Use serial console via iDRAC

```
ssh root@<ip/hostname of iDRAC>
racadm>> console com2
```
- To exit, `Ctrl` + `\`
- To enable the serial console on CentOS 8, add `console=tty0 console=ttyS0,115200n8` to `GRUB_CMDLINE_LINUX` in `/etc/sysconfig/grub`
