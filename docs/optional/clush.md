---
id: clush
title: ClusterShell
sidebar_label: ClusterShell
---

## Install ClusterShell

```
# Ubuntu
apt install clustershell

# Rocky
dnf install clustershell

# macOS
pip3 install ClusterShell
```

## Example of configuration files

Although you can use `clush` by default, but here's the list configuration files
you should know. Especially, the `/etc/clustershell/groups.d/local.cfg` where you
can add groups of nodes as you need.

- /etc/clustershell/clush.conf
- /etc/clustershell/groups.conf
- /etc/clustershell/groups.d/local.cfg

### clush.conf

```
[Main]
fanout: 64
connect_timeout: 15
command_timeout: 0
color: auto
fd_max: 8192
history_size: 100
maxrc: no
node_count: yes
verbosity: 1
confdir: /etc/clustershell/clush.conf.d $CFGDIR/clush.conf.d

# Add always all remote hosts to known_hosts without confirmation
#ssh_user: root
#ssh_path: /usr/bin/ssh
#ssh_options: -oStrictHostKeyChecking=no
```

### groups.conf

```[Main]
default: local
confdir: /etc/clustershell/groups.conf.d $CFGDIR/groups.conf.d
autodir: /etc/clustershell/groups.d $CFGDIR/groups.d

[local]
map: [ -f $CFGDIR/groups ] && f=$CFGDIR/groups || f=$CFGDIR/groups.d/local.cfg; sed -n 's/^$GROUP:\(.*\)/\1/p' $f
all: [ -f $CFGDIR/groups ] && f=$CFGDIR/groups || f=$CFGDIR/groups.d/local.cfg; sed -n 's/^all:\(.*\)/\1/p' $f
list: [ -f $CFGDIR/groups ] && f=$CFGDIR/groups || f=$CFGDIR/groups.d/local.cfg; sed -n 's/^\([0-9A-Za-z_-]*\):.*/\1/p' $f
```

### groups.d/local.cfg

```
group1: node_a[01-10],node_b[01-05]
group2: node_c[01-05],node_d[01-03]
```

## Commands

### Run a command on multiple nodes

```
clush -w node[01-32,64-96] uptime
```

### Copy a file to multiple nodes

```
clush -w node[01-96] -c /path/to/file
```

## Tips

### Set a different config directory.

```
export CLUSTERSHELL_CFGDIR=$HOME/.config/clustershell
```
