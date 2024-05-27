---
id: bash
title: Bash - Bourne again shell
sidebar_label: Bash
---

Bash is the default shell of most Linux distros. 

## Navigation

- `Ctrl` + `a` &rarr; Go to the beginning of the line
- `Ctrl` + `e` &rarr; Go to the end of the line
- `Alt` + `f` &rarr; Move cursor to the next word
- `Alt` + `b` &rarr; Move cursor to the previous word
- `Ctrl` + `x`, `x` &rarr; Move cursor between the current position and the begining of the line

## Editing

- `Ctrl` + `k` &rarr; Cut line after cursor and copy it to the clipboard
- `Ctrl` + `u` &rarr; Cut line before cursor and copy it to the clipboard
- `Ctrl` + `y` &rarr; Paste what you have on the clipbaord
- `Ctrl` + `_` &rarr; Undo your last key press

## Processing

- `Ctrl` + `c` &rarr; Kill the currently running command
- `Ctrl` + `d` &rarr; Exit the shell
- `Ctrl` + `l` &rarr; Clear the screen (Same as the `clear` command)

## History

- `Alt` + `p` &rarr; Search backward through the history starting at the current line
- `Alt` + `n` &rarr; Search forward through the history starting at the current line
- `Ctrl` + `r` &rarr; Open the history search

## Tips

### Install Bash-completion

Bash-completion helps you type commands faster and easiler.

```
# Ubuntu
sudo apt install bash-completion

# Rocky
sudo dnf install bash-completion
```

Press [TAB] when you type commands, for example:

``` shell
sudo git [TAB]
sudo systemctl [TAB]
```

### History search with arrow keys

You can enable arrow keys -- [Up] for backward and [Down] for forward -- 
for history search by these commands (You can put them in your `.bashrc`.)

```
bind '"\e[A": history-search-backward'
bind '"\e[B": history-search-forward'
```

### Write a file in a script

Create a new file / Overwrite an existing file

```
## tee
tee /tmp/test.txt <<EOF
This is the 1st line
This is the 2nd line
EOF
```

```
# cat
cat <<EOF> /tmp/test.txt
This is the 1st line
This is the 2nd line
EOF
```

Append new lines

```
# tee
tee -a /tmp/test.txt <<EOF
This is the 3rd line
This is the 4th line
EOF
```

```
# cat
cat <<EOF>> /tmp/test.txt
This is the 3rd line
This is the 4th line
EOF
```

I prefer using `tee` because `tee` also prints these lines to stdout.

### Array in Bash script

``` bash title="test_array.sh"
myArray=("cat" "dog" "mouse" "frog")

echo ${myArray[@]}
echo ${!myArray[@]}

for str in ${myArray[@]}; do
  echo $str
done

for i in ${!myArray[@]}; do
  echo "element $i is ${myArray[$i]}"
done
```

### Make your bash script safer

```
#!/bin/bash

set -euxo pipefail

```

- `-e` &rarr; Exit immediately if a command exits with a non-zero status.
- `-u` &rarr; Treat unset variables as an error when substituting.
- `-x` &rarr; Print commands and their arguments as they are executed.
- `-o pipfail` &rarr; The return value of a pipeline is the status of the last 
  command to exit with a non-zero status, or zero if no command exited 
  with a non-zero status.

### Get the directory path where a script is located

```
#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
echo "Script directory: $SCRIPT_DIR"
```