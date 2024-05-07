---
id: vim
title: Vim - text editor
sidebar_label: Vim
---

## Navigation

### Basic navigation

- `h` -- Move left
- `j` -- Move down
- `k` -- Move up
- `l` -- Move right
- `Ctrl` + `d` -- Scroll down
- `Ctrl` + `u` -- Scrole up
- `H` -- Move to the top line on screen
- `M` -- Move to the middle line on screen
- `L` -- Move to Bottom line on screen
- `gg` -- Move to the first line of the file
- `G` -- Move to the last line of the file
- `:20`,`20G`, or `20gg` -- Move to the line 20 of the file
- `0` or `^` -- Move to the beginning of current line, then remain normal mode 
- `$` -- Move to the end of current line, then remain normal mode
- `I` -- Move to the beginning of current line, then enter insert mode
- `A` -- Move to the end of current line, then enter insert mode

### Optional navigation

- `10h` -- Move left 10 characters
- `10j` -- Move down 10 lines

## Editing

**Basic editing**

- `a` -- Append after cursor - [ Normal Mode => Insert Mode ]
- `i` -- Insert before cursor - [ N => I ]
- `o` -- Open new line below - [ N => I ]
- `O` -- Open new line above - [ N => I ]
- `u` -- Undo - [ N ]
- `Ctrl` + `r` -- Redo - [ N ]
- `D` or `d$` -- Delete from cursor to the end - [ N ]
- `d0` or `d^` -- Delete from cursor to the beginning - [ N ]
- `dw` -- Delete one word from top of the word - [ N ]
- `db` -- Delete one word from bottom of the word - [ N ]
- `:%s/old/new/g` -- Replace all old with new throughout file - [ N ]
- `:%s/old/new/gc` -- Replace all old with new throughout file with interactive confirmations - [ N ]


**Optional editing**

- `Ctrl`+`u` -- Delete from cursor to the beginning - [ Insert Mode ]
- `:r file` -- Insert `file` after current line - [ Command Mode ]

## Opening, closing and saving files

### Basics

- `:w` -- Save the current file
- `:wq` -- Save the current file and close it
- `:w` newname -- Save the current file as 'newname' but continue editing the original file
- `:sav newname` -- Save the current file as 'newname' and start editing the 'newname' file
- `:q!` -- Close a file without saving
- `:e filename` Opens a file in the current buffer

### Optional

- `ZZ` -- Same as `:wq`
- `:x` -- Write any changes to the file and close the file

## Mode switching

- `i` -- Enter insert mode
- `:` -- Enter command mode
- `R` -- Enter replace mode
- `v` -- Enter visual mode (highlighting)
- `V` -- Enter visual line mode (highlighting lines)
- `Esc` -- Return to normal mode from insert or replace mode
- `Esc`+`Esc` -- Return to normal mode from command or visual mode

## Search

- `/word` -- Find the next occurence of 'word'
- `/word/c` -- Find the next occurence of 'word', ignoring case
- `:noh` or `:nohlsearch` -- Un-highlight words

## Vim Plugin

### Vim-plug

Install vim-plug:

```
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

### NERDTree and NERDTree Tabs -- a file system explorer and tabs

Add these two plugins in the vim-plug:

```
Plug 'scrooloose/nerdtree'
Plug 'jistr/vim-nerdtree-tabs'
```

My basic config for them:

```
" Toggle NERDTree by Ctrl + \
map <C-\> <plug>NERDTreeTabsToggle<CR>

" Open NERDTree at starting vim
let g:nerdtree_tabs_open_on_console_startup=1

" Show hidden files
let NERDTreeShowHidden=1
```

## Tips

### Install Vim from source

```
$ apt update
$ apt install -y git build-essential libncurses-dev
$ git clone https://github.com/vim/vim.git
$ cd vim
$ ./configure --prefix=/usr/local
$ make
$ make install
```