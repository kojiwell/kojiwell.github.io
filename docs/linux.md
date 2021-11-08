---
id: linux
title: Linux
sidebar_label: Linux
---

Linux is a Unix-based operating system. It's free and open source, and the most widely-used operating system.
Linux inherits the Unix philosophy(minimalist, modular software development) - "do one thing do it well."

## Tips

Find files owned by user `foo` and change the owner to `bar:group1`

```bash
find /path/to/dir -user foo -exec chown -h bar:group1 {} \;
```

---
List only directories

```bash
find $HOME -maxdepth 1 -type d |tail -n +2 |cut -d '/' -f 3-4
```

* `find $HOME -maxdepth 1 -type d`: Find directories in $HOME. 
  Avoid recursive search, which is the default action of the find command.
* `tail -n +2`: List from the 2nd line. The first line is the current directory, which is the $HOME itself
* `cut -d '/' -f 3-4`: Cut the line by '\', and print from 3rd to 4th

---
Replace `foo` with `bar` in a text file

```bash
sed -i.bak 's/foo/bar/g' file.txt

# Ensure the partial words are not matched
sed -i.bak 's/\bfoo\b/bar/g' file.txt
```

* `-i[SUFFIX]`: Edit file in place (make backup if SUFFIX supplied)
* `\b`: word boundary. This ensures the partial words are not matched.

---
Test `sed` before edit a file to ensure the outcome

```bash
echo foo bar foobar barfoo |sed 's/foo/bar/g'                                 
> bar bar barbar barbar

echo foo bar foobar barfoo |sed 's/\bfoo\b/bar/g'
> bar bar foobar barfoo
```
---
Add `prefix_` and/or `_suffix` to every word  in a text

```
# Prefix
echo foo bar | sed 's/\</prefix_/g'
> prefix_foo prefix_bar

# Suffix
echo foo bar | sed 's/\>/_suffix/g'
> foo_suffix bar_suffix

# Prefix and suffix
echo foo bar | sed -e 's/\</prefix_/g' -e 's/\>/_suffix/g'
> prefix_foo_suffix prefix_bar_suffix
```
