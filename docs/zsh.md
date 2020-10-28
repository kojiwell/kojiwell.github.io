---
id: zsh
title: Zsh
sidebar_label: Zsh
---

## Useful options to set in your `~.zshrc`

Use vi keybindings

```
bindkey -v
```

Bind `Up` and `Down` keys to history search

```
bindkey "^[[5~" history-beginning-search-backward
bindkey "^[[6~" history-beginning-search-forward
```

Configure how history should be managed

```
# Keep 1000 history in memory
HISTSIZE=1000
# Save 100000 history
SAVEHIST=100000
# Save history as ~/.zsh_history
HISTFILE=~/.zsh_history

# Appends every command to the history file once it is executed
setopt inc_append_history
# Reloads the history whenever you use it
setopt share_history
# Ignore duplication
setopt hist_ignore_dups
# Delete old ones if duplicated
setopt hist_ignore_all_dups
# Share history among terminal sessions
setopt sharehistory
# Verify before execute
setopt hist_verify
```

Avoid the error message "no matches found"

```
setopt +o nomatch
```

## zsh-autosuggestions

### Manual installation

1. Clone the git repository somewhere (e.g. `~.zsh`)

    ```
    > mkdir ~/.zsh
    > git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
    ```

2. Add the following to your `~/.zshrc`:

    ```
    source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
    ```

### Useful options to add in `.zshrc`

```
# Color can be set by something like this
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=#ff00ff,bg=cyan,bold,underline"

# Ctrl + Space to accept the current suggestion
bindkey '^ ' autosuggest-accept
```

## Pure prompt

Pretty, minimal and fast ZSH prompt

### Manual installation

1. Clone the repository somewhere (e.g. `~/.zsh`):

    ```
    mkdir -p "$HOME/.zsh"
    git clone https://github.com/sindresorhus/pure.git "$HOME/.zsh/pure"
    ```

2. Add the following lines to your `~/.zshrc`:

    ```
    # Add the path to fpath
    fpath+=$HOME/.zsh/pure

    # Use pure prompt
    autoload -U promptinit; promptinit
    prompt pure
    ```


