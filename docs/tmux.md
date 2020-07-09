---
id: tmux
title: Tmux - Terminal Multiplexer
sidebar_label: Tmux
---

## Basics

Start a new Tmux session

``` text
$ tmux new -s [session-name]
```

Detach from a Tmux session

`Ctrl`+`b`, `d`


List Tmux sessions

``` text
$ tmux ls
```

Attach a Tmux session

``` text
tmux a -t [session-name]

# Detach any other clients and attach the session
tmux a -dt [session-name]
```

Create a new window

`Ctrl`+`b`, `c`

Split a window or a pane into two panes

* vertically: `Ctrl`+`b`, `%`
* horizontally: `Ctrl`+`b`, `"`

Show the list of windows, and then pick one

`Ctrl+b`, `w` and then `[arrow key]` or `[number]`

Rename a window

`Ctrl`+`b`, `,`

Switch from the current window to

* the next window: `Ctrl`+`b`, `n`
* the previous window: `Ctrl`+`b`, `p`

Switch from the current pane to the left, right, upper, or lower

`Ctrl`+`b`, `[arrow key]`

Move the active pane in the current window

* clockwise: `Ctrl`+`b`, `}`
* counter-clockwise: `Ctrl`+`b`, `{`

## Configuration

Tmux is easy to customize. Here're things that I add to my Tmux configuration file `~/.tmux.conf`.

Enable vi mode

``` text
set-window-option -g mode-keys vi
```

Use clipboard to copy and paste

``` text
bind-key -T copy-mode-vi v send-keys -X begin-selection
bind-key -T copy-mode-vi y send-keys -X copy-pipe-and-cancel 'xclip -in -selection clipboard'
```

Disable auto renaming window

``` text
set-option -g allow-rename off
```

Set default shell (e.g. zsh)

``` text
set -g default-shell /usr/bin/zsh
```

Setup foreground and background colors of status line

``` text
set-option -g status-fg "colour136"
set-option -g status-bg "colour235"
```

## Optional

### Tmux-powerline

``` text
set-option -g status on
set-option -g status-interval 2
set-option -g status-justify "centre"
set-option -g status-left-length 60
set-option -g status-right-length 90
set-option -g status-left "#(~/.config/tmux-powerline/powerline.sh left)"
set-option -g status-right "#(~/.config/tmux-powerline/powerline.sh right)"
```

### Misc

Avold the this problem - [delay when switching insert mode to normal mode (vim-airline/issues/124)](https://github.com/vim-airline/vim-airline/issues/124)

``` text
set -sg escape-time 0
```

## References

- [Tmux Cheat Sheet & Quick Reference](https://tmuxcheatsheet.com/)
- [Linuxize -- Getting started with Tmux](https://linuxize.com/post/getting-started-with-tmux/)
