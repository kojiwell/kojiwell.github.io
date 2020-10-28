---
id: slurm
title: Slurm
sidebar_label: Slurm
---

Update the limits of a user

```
# Cores
sacctmgr --immediate modify user where name=kojiwell partition=short set GrpCpus=128
 
# Walltime
sacctmgr --immediate modify user where name=kojiwell partition=short set MaxWall=12:00:00
```
