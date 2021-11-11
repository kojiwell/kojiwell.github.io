---
id: slurm
title: Slurm
sidebar_label: Slurm
---

List drain/draining/down nodes with the reasons

``` sh
sinfo -R -o "%n %E"
```

Parse hostnames from slurm's host list expression

``` sh
# Command
scontrol show hostname j-[001-004,010,123]

# Output
j-001
j-002
j-003
j-004
j-010
j-123
```

Obtain one particular node exclusively

``` sh
salloc -p <partition> -w <node> --exclusive -J <job> -t <walltime> --no-shell --no-kill
```

Update the limits of a user

``` sh
# Cores
sacctmgr --immediate modify user where name=kojiwell partition=short set GrpCpus=128
 
# Walltime
sacctmgr --immediate modify user where name=kojiwell partition=short set MaxWall=12:00:00
```

#### Create a maintenance reservation

``` sh
scontrol create reservation starttime=2020-12-22T08:00:00 \
   duration=infinite user=root,kojiwell flags=maint,ignore_jobs nodes=ALL
```

* The date format is `2020-12-22T08:00:00`
* The "ignore_jobs" flag is used to indicate that we can ignore currently running jobs when creating this reservation. By default, only resources which are not expected to have a running job at the start time can be reserved (the time limit of all running jobs will have been reached). In this case we can manually cancel the running jobs as needed to perform system maintenance.