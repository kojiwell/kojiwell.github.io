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

Show the list of windows

``` text
Ctrl+b, w
```

Rename a window

`Ctrl`+`b`, `,`

## References

- [Linuxize -- Getting started with Tmux](https://linuxize.com/post/getting-started-with-tmux/)
