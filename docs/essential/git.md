---
id: git
title: Git - distributed version control system
sidebar_label: Git
---

Git allows a group of software developers to manage changes of sourse code over time. 
It's the most popular version control system, and when you're involved in a software 
development, you will most-likely use Git with other people. 

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

**NOTE:** The `--global` option means that the values will be shared among your local git repositories,
and it is stored in your `~/.gitconfig` file.


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

Set the editor for Git

``` sh
git config --global core.editor "vim"
```

### Repository setup

Initialize your current directory as a Git repository

``` sh
git init
```

Initialize a shared Git repository. Conventionally, repositories with the `--bare` flag
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

# Patch mode
git -p add [file/directory]

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

### Branch and merge

List branches. The current branch shows with a *

``` sh
git branch
```

Create a new branch at the current commit

``` sh
git branch [branch-name]
```

Swtich to another branch and check it out into your working directory

``` sh
git checkout [branch]
```

Merge the specified branch's history into the current one

``` sh
git merge [branch]
```

Show all commits in the current branch's history

``` sh
git log
```

### Inspect and compare

Show the history of the current branch

``` sh
git log
```

Show commits on branchA that are not on branchB

``` sh
git log branchB..branchA
```

Show the commits that changed file

``` sh
git log --follow [file]
```

Show the diff of what is in branchA that is not in branchB

``` sh
git diff branchB..branchA
```

Compare a particular file in two branches -- main and dev

``` sh
git diff main..dev -- path/to/file
```

### Removal and file path change

Delete the file from project and stage the removal for commit

``` sh
git rm [file]
```

Untrack the file from project and stage the removal for commit.

``` sh
git rm --cached [file]
```

**NOTE:** With that `--cached` option, the file won't be deleted, which will show
up as an unstaged file in the output of `git status`. If you want it to stay there 
untracked, add it in the `.gitignore` file.

Change an existing file path and stage that move

``` sh
git mv [existing-path] [new-path]
```

Show all commit logs with indication of any paths that moved

``` sh
git log --stat -M
```

### Ignoring files/directories

Create a `.gitignore` file in your repository, and list the files and directories
that you want to ignore. Here're examples:

``` text
logs/
*.pyc
pattern*/
```

When you want to set the list of ignored files/dirs globally, create `$HOME/.config/git/ignore`,
and list the ignored files in the file. You can find the examples of global ignores at 
[github / gitignore](https://github.com/github/gitignore).

## Optional

### git config

Create a shortcut for a git command. E.g. `git glog` as `git log --graph --oneline`

``` sh
git config alias.glog "log --graph --oneline"

# These two are the same now
git glog
git log --graph --oneline
```

Change editor (e.g. vim)

``` sh
git config --global core.editor "vim"
```

## Tips

### Tell git which ssh private key to use

```
# Set it permanently in the .git/config
git config core.sshCommand "ssh -i ~/.ssh/another_id_rsa -F /dev/null"

# Just once
git -c core.sshCommand="ssh -i ~/.ssh/another_id_rsa -F /dev/null" clone ...
```

### Simple way to track config files by a bare git repo

Using a bare git repo with the `status.showUntrackedFiles no` option allows you to safely track the files you want to keep tracking.

``` sh
git init --bare $HOME/.myfiles
alias myfiles='/usr/bin/git --git-dir=$HOME/.myfiles/ --work-tree=$HOME'
myfiles config --local status.showUntrackedFiles no
```

And have the following in your `~.bashrc` or `~/.zshrc`:

``` sh
alias myfiles='/usr/bin/git --git-dir=$HOME/.myfiles/ --work-tree=$HOME'
```

Now, you're all set.

``` sh
myfiles add .zshrc
myfiles commit -m "Add zshrc file"
myfiles push --set-upstream origin master
```

*Reference: [The best way to store your dotfiles: A bare Git repository](https://www.atlassian.com/git/tutorials/dotfiles)*

### Create an empty branch

``` sh
git checkout --orphan [empty-branch]
git rm -rf .
git commit --allow-empty -m "empty commit"
git push origin [empty-branch]
```

### The seven rules of a great Git commit message

1. Separate subject from body with a blank line
2. Limit the subject line to 50 characters
3. Capitalize the subject line
4. Do not end the subject line with a period
5. Use the imperative mood in the subject line
6. Wrap the body at 72 characters
7. Use the body to explain what and why vs. how

*Reference: [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)*
