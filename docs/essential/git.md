---
id: git
title: Git - distributed version control system
sidebar_label: Git
---

Git enables developers to collaboratively manage and track changes to source code. As the most widely used version control system, Git is essential in most software projects.

## Basics

### General setup

Set the name used in your commits

``` sh
git config --global user.name "[Firstname Lastname]"
```

Set the email address associated with your commits

``` sh
git config --global user.email "[valid email]"
```

Change the default branch name from "master" to "main"

``` sh
git config --global init.defaultBranch main
```

**NOTE:** The `--global` option applies to all local Git repositories and is stored in your `~/.gitconfig` file.


You can also set a different email locally (e.g., a work email) for a particular repository:

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

Set your preferred editor for Git

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

### Stage and snapshot

Show modified files - both staged and unstaged

``` sh
git status
```

Stage a file or directory for your next commit

``` shell
git add [file/directory]

# Patch mode
git -p add [file/directory]
```

Unstage a file or directory while retaining the changes

``` sh
git reset [file/directory]
```

Show changes that are not staged

``` sh
git diff
```

Show changes that are staged but not committed

``` sh
git diff --staged
```

Commit your staged content as a new commit snapshot

``` sh
git commit -m "[descriptive message]"
```

### Branch and merge

List branches. The current branch is marked with a *

``` sh
git branch
```

Create a new branch at the current commit

``` sh
git branch [branch-name]
```

Switch to another branch and check it out into your working directory

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

Show commits that changed a file

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

### Removal and file path changes

Delete the file from project and stage the removal for commit

``` sh
git rm [file]
```

Untrack the file from project and stage the removal for commit.

``` sh
git rm --cached [file]
```

**NOTE:** With the `--cached` option, the file isn't deleted; it will show up as an unstaged file in the output of `git status`. To keep it untracked, add it to the `.gitignore` file.

Change an existing file path and stage that move

``` sh
git mv [existing-path] [new-path]
```

Show all commit logs with indication of any paths that moved

``` sh
git log --stat -M
```

### Ignoring files/directories

Create a `.gitignore` file in your repository and list the files and directories
that you want to ignore. Here are examples:

``` text
logs/
*.pyc
pattern*/
```

To configure global ignores, create `$HOME/.config/git/ignore` and list ignored files there. See
[github / gitignore](https://github.com/github/gitignore) for examples.

## Optional

### git config

Create a shortcut for a Git command. For example, `git glog` as `git log --graph --oneline`:

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

### Compare two branches (e.g. main and dev)

``` sh
git diff main...dev
```

### Tell git which ssh private key to use

``` shell
# Set it permanently in the .git/config
git config core.sshCommand "ssh -i ~/.ssh/another_key"

# Just once
git -c core.sshCommand="ssh -i ~/.ssh/another_key" clone ...

# Environment variable
export GIT_SSH_COMMAND="ssh -i ~/.ssh/another_key"
```

### Create a new empty branch

``` shell
git switch --orphan <new branch>

# Create, commit, and push
git switch --orphan <new branch>
git commit --allow-empty -m "Initial commit on orphan branch"
git push -u origin <new branch>
```

### Create a new branch in another worktree

``` shell
git worktree add <path> <branch>
```

Create a throwaway worktree. You can make some experimental changes or do testing without 
disturbing existing development.

```
git worktree add -d <path>
```

### Simple way to track config files by a bare git repo

Using a bare git repo with the `status.showUntrackedFiles no` option allows you to safely track the files you want to keep tracking.

``` sh
git init --bare $HOME/.myfiles
alias myfiles='/usr/bin/git --git-dir=$HOME/.myfiles/ --work-tree=$HOME'
myfiles config --local status.showUntrackedFiles no
```

Add the following to your `~/.bashrc` or `~/.zshrc`:

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

### Delete and recreate a tag

```
# delete the tag locally
git tag -d v0.2.28

# delete the tag on the remote
git push --delete origin v0.2.28

# recreate the tag
git tag v0.2.28

# push the new tag
git push origin v0.2.28
```

```
git tag -f v0.2.28
git push origin -f v0.2.28
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
