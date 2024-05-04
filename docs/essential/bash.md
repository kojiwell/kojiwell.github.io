---
id: bash
title: Bash - Bourne again shell
sidebar_label: Bash
---

Bash is the default shell of most Linux distros. 

## Navigation

- `Ctrl` + `a` -- Go to the beginning of the line
- `Ctrl` + `e` -- Go to the end of the line
- `Alt` + `f` -- Move cursor to the next word
- `Alt` + `b` -- Move cursor to the previous word
- `Ctrl` + `x`, `x` -- Move cursor between the current position and the begining of the line

## Editing

- `Ctrl` + `k` -- Cut line after cursor and copy it to the clipboard
- `Ctrl` + `u` -- Cut line before cursor and copy it to the clipboard
- `Ctrl` + `y` -- Paste what you have on the clipbaord
- `Ctrl` + `_` -- Undo your last key press

## Processing

- `Ctrl` + `c` -- Kill the currently running command
- `Ctrl` + `d` -- Exit the shell
- `Ctrl` + `l` -- Clear the screen (Same as the `clear` command)

## History

- `Alt` + `p` -- Search backward through the history starting at the current line
- `Alt` + `n` -- Search forward through the history starting at the current line
- `Ctrl` + `r` -- Open the history search

## Tips

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
tee /tmp/test.txt <<EOF
This is the 1st line
This is the 2nd line
EOF
```

Append new lines

```
tee -a /tmp/test.txt <<EOF
This is the 3rd line
This is the 4th line
EOF
```
