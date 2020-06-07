---
id: tmux
title: tmux
sidebar_label: tmux
---

## Navigation

### Basic navigation

- `h` -- Move left
- `j` -- Move down
- `k` -- Move up
- `l` -- Move right
- `H` -- Move to the top line on screen
- `M` -- Move to the middle line on screen
- `L` -- Move to Bottom line on screen
- `gg` -- Move to the first line of the file
- `G` -- Move to the last line of the file
- `:20`,`20G`, or `20gg` -- Move to the line 20 of the file

- `^` -- Move to the beginning of current line, then remain normal mode 
- `I` -- Move to the beginning of current line, then enter insert mode
- `Ctrl` + `$` -- Move to the end of current line, then remain normal mode
- `A` -- Move to the end of current line, then enter insert mode

### Optional navigation

- `10h` -- Move left 10 characters
- `10j` -- Move down 10 lines

## Editing

**Basic editing**

- `a` -- Append after cursor
- `i` -- Insert before cursor
- `o` -- Open new line below
- `O` -- Open new line above
- `u` -- Undo
- `Ctrl` + `r` -- Redo

**Optional editing**

- `:r file` -- Insert `file` after current line


## Install Vim from source

```
$ apt update
$ apt install -y git build-essential libncurses-dev
$ git clone https://github.com/vim/vim.git
$ cd vim
$ ./configure --prefix=/usr/local
$ make
$ make install
```
