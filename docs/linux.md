---
id: linux
title: Linux
sidebar_label: Linux
---

Linux is a Unix-based operating system. It's free and open source, and the most widely-used operating system.
Linux inherits the Unix philosophy(minimalist, modular software development) - "do one thing do it well."

---
Find files owned by user `foo:gfoo` and change the owner to `bar:gbar`

```
find /path/to/dir -user foo -exec chown -h bar:gbar {} \;
```

---
List only directories

```
find $HOME -maxdepth 1 -type d |tail -n +2 |cut -d '/' -f 3-4
```

* `find $HOME -maxdepth 1 -type d`: Find directories in $HOME. 
  Avoid recursive search, which is the default action of the find command.
* `tail -n +2`: List from the 2nd line. The first line is the current directory, which is the $HOME itself
* `cut -d '/' -f 3-4`: Cut the line by '\', and print from 3rd to 4th

---
Replace `foo` with `bar` in a text file

```
sed -i.bak 's/foo/bar/g' file.txt

# Ensure the partial words are not matched
sed -i.bak 's/foo\b/bar/g' file.txt
```

* `-i[SUFFIX]`: Edit file in place (make backup if SUFFIX supplied
* `\b`: word boundary. This ensures the partial words are not matched.

---
Test `sed` before edit a file to ensure the outcome

```
echo foo bar foobar |sed 's/foo/bar/g'
> bar bar barbar
echo foo bar foobar |sed 's/foo\b/bar/g'
> bar bar foobar
```

