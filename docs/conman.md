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

## Setup remote access to serial console (CentOS 8)

On `/etc/sysconfig/grub` file, add `console=tty0 console=ttyS0,115200n8` to `GRUB_CMDLINE_LINUX`, and execute this command

```
grub2-mkconfig -o /boot/efi/EFI/centos/grub.cfg
```

And then, reboot the system

Test it

```
# By ipmitool
ipmitool -H host1-mg -I lanplus -U <user> -P <password> sol activate | tee -a console_log.txt

# By conman's ipmitool.exp
/opt/conman-0.3.0/lib/conman/exec/ipmitool.exp deigo-login1-mg.oist.jp <user> <password>
```

## References

* [やるメモ- conman](https://shachimaru.wiki.fc2.com/wiki/conman)
