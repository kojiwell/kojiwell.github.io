---
id: git
title: Git - A Distributed Version Control System
sidebar_label: Git
---

Git allows a group of software developers to manage changes of sourse code over time. 
It's the most popular version control system, so when you're involved in a software 
development, you will likely use Git to work with other people.

## Basics

### General setup

Set a name that is identified for credit when review version history

``` sh
git config --global user.name "[Firstname Lastname]"
```

Set an email address that will be associated with each history maker

``` sh
git config --global user.email "[valid email]"
```

You can also locally set a different email(e.g. work email) in a particular repo like this:

``` sh
# Change directory to the repo
cd /path/to/repo

# Set an email address locally
git config --local user.email "[work email]"
# Or, you don't actually need "--local" since the default is local
git config user.email "[work email]"

# Check the config
cat .git/config
```

By the way, the global setting is stored in your `~/.gitconfig` file.

### Repository setup

Initialize your current directory as a Git repository

``` sh
git init
```

Initialize a shared git repository. Conventionally, repositories with the `--bare` flag
end in `.git`.

``` sh
git init --bare [directory]

# e.g.
git init --bare my_project.git
```

Retrieve an entire repository from a hosted location.

``` sh
# via URL
git clone [url]

# via SSH
git clone [user]@[server]:[path to a bare repository]

# a bare repo on a local computer
git clone [path to a bare repository]
```

### Stage and snapsot

Show modified files - both staged and unstaged

``` sh
git status
```

Stage a file or directory for your next commit

``` sh
git add [file/directory]
```

Unstage a file or directory while retaining the changes

``` sh
git reset [file/directory]
```

Show differences of what have been changed but not staged

``` sh
git diff
```

Show differences of what have been staged but not commited

``` sh
git diff --staged
```

Commit your staged content as a new commit snapshot

``` sh
git commit -m "[descriptive message]"
```

## Optional

### git config

Create a shortcut for a git command. E.g. `git glog` as `git log --graph --oneline`.

```
> git config alias.glog "log --graph --oneline"

# These two are the same now
> git glog
> git log --graph --oneline
```

### git commit

The seven rules of a great Git commit message:

1. Separate subject from body with a blank line
2. Limit the subject line to 50 characters
3. Capitalize the subject line
4. Do not end the subject line with a period
5. Use the imperative mood in the subject line
6. Wrap the body at 72 characters
7. Use the body to explain what and why vs. how

Reference: [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)

## Tips

### Simple way to track config files by a bare git repo

Using a bare git repo with the `status.showUntrackedFiles no` option allows you to safely track the files you want to keep tracking.

```
> git init --bare $HOME/.myfiles
> alias myfiles='/usr/bin/git --git-dir=$HOME/.myfiles/ --work-tree=$HOME'
> myfiles config --local status.showUntrackedFiles no
```

And have the following in your `~.bashrc` or `~/.zshrc`:

```
alias myfiles='/usr/bin/git --git-dir=$HOME/.myfiles/ --work-tree=$HOME'
```

Now, you're all set.

``` sh
> myfiles add .zshrc
> myfiles commit -m "Add zshrc file"
> myfiles push --set-upstream origin master
```

* Reference: [The best way to store your dotfiles: A bare Git repository](https://www.atlassian.com/git/tutorials/dotfiles)
