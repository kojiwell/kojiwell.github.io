---
title:  "2023-04-28 Bits and pieces of notes"
author: Koji Tanaka
authorURL: http://twitter.com/kojiwell
---



## Les Davis

"Seymour thought them up, and Les made them work," said former Cray CEO Rollwagen. 

Seymour Cray is the pioneer, the genius, and the name of Cray Research, Inc. However, the engineer who has guided the company to keep producing successful supercomputers for years in the risky high-tech industry is Les Davis. He is the ultimate team builder who knows how to bring all the talent together to create excellent supercomputers.

Open [this link for more about the interesting supercomputer history (PDF)](https://cray-history.net/wp-content/uploads/2021/08/TheUltimateTeamPlayerLesDavid.pdf).

## Potato vs sweet potato

Potato is a stem, and sweet potato is a root. Potato has eyes which develop into shoots. So potato has to produce poison in itself to protect shoots from bugs, while sweet potato doesn't have to. 

I see it as a good analogy for career development. If you want to go up the ladder of success, you must develop poison in yourself to protect yourself. If you want to dig deep down into the technical adventure, it's dark and sweet.

## dsmc

Restore a directory from the backup data on the TSM

``` bash
# Check if the directory is in the backup data
dsmc query backup /path/to/dir_a/

# Restore the directory to the current directory
dsmc restore -inactive -subdir=yes /path/to/dir_a/ $PWD/

# Check the restored directory
tree $PWD/dir_a
```

## find

Search a file by a case-insensitive keyword

``` bash
find /path/to/dir -type f -iname "*keyword*"
```

## git

Set a different ssh private key for git

``` bash
# In the config of the current git repo
git config core.sshCommand "ssh -i /path/to/new-key"
cat .git/config

# By the encironment variable
export GIT_SSH_COMMAND="ssh -i /path/to/new-key"
```

## sed

Remove the last comma(,) from "host01,host04,host07,"

``` bash

echo "host01,host04,host07," |sed 's/.$//'

```

## sinfo

List the down and drained nodes

``` bash
sinfo  -h -t down,drained -o "%n %E" |sort

# -h, --noheader
# -t, --states
# -o, --format
```

Create the list of drained nodes because of either "Kill task failed" or "batch job complete failure"

```
sinfo -h -t drained -o "%n %E" |sort |awk '/Kill task|batch job/ {print $1}' ORS="," |sed 's/.$//'
```