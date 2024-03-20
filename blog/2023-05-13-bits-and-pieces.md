---
slug: 2023-05-13-bits-and-pieces
title: 2023-05-13 Bits and pieces here and there
authors: kojiwell
tags: [misc]
---


## Sorites Paradox

The word "supercomputer" is vague, like a heap of sand in Sorites Paradox. 

A couple of hardware failure is not a big deal. A supercomputer is still a supercomputer. 
And, even if one-third of compute nodes were shut down because of the escalating energy cost, 
it would still be a supercomputer. What about losing half of the capacity?
Where is the borderline between a supercomputer and a non-supercomputer?

Wikipedia: [Sorites Paradox](https://en.wikipedia.org/wiki/Sorites_paradox)

## Kanizsa triangle

Sometimes, what we see or perceive in life is not actually what is there.

The Kanizsa trianble is a classic optical illusion that consists of three 
pac-man-like shapes arranged in a triangle. Even though there isn't a triangle, 
our brain thinks there is.

Wikipedia: [Illusory contours](https://en.wikipedia.org/wiki/Illusory_contours)

## Nelson Molina

Finding joy in day-to-day tasks would be more important than the technical skills on the resume.
I found an interesting story about Nelson Molina, who worked as a sanitation worker for over
30 years in New York City.

*"[Nelson Molina spent 34 years as a garbage man in New York City](https://money.cnn.com/2017/07/06/news/economy/new-york-city-trash-museum-nelson-molina/index.html). 
He salvaged over 50,000 items from the garbage and put them 
on display in what he calls a "secret museum" in Manhattan. 
He hopes the city will turn it into a real museum soon." -- CNN*

Also, this YouTube video "[Treasures in the Trash](https://youtu.be/NO4ZQbsZFK8)"
from the [60 Second Docs](https://www.60secdocs.com/) is wonderful.

## Capoeira

A few days ago, on a weekend, I was hanging out with my two kids around 
the village office, and there was a small group of people practicing Capoeira 
on the stage in the courtyard. They were playing unique instruments, singing, 
and dancing, but at the same time, simulating fights, which was eye-grabbing.

There was no audience except us(my kids and me), and we enjoyed watching it.
I thought that the two elements(dance and martial art) are very different and 
combining these two have lead to a unique and innovative creation that naturally
gets people together.

## FRC

The term "FRC" in freediving stands for "functional residual capacity," which 
refers to the volume of air that remains in the lungs after a normal exhalation.

## python

Python's `enumerate()` object is returned in a key-value pair format. The key is 
the corresponding index of each item and the value is the items.

``` python
>>> my_array = [ 'dog', 'cat', 'fox']
>>> print(list(enumerate(my_array)))
[(0, 'dog'), (1, 'cat'), (2, 'fox')]
>>> for n, item in enumerate(my_array):
...     print(f'{str(n)} : {item}')
...
0 : dog
1 : cat
2 : fox
```

A binary number starts with `0b` and a hex number starts with `0x`.

``` python
>>> bin(28) # decimal to binary
'0b11100'
>>> hex(28) # decimal to hex(hexadecimal)
'0x1c'
>>> int('0b11100', 2) # binary to decimal
28
>>> int('0x1c', 16) # hex to decimal
28
```

## tar

Extract a specific file from a tar.gz file

``` bash
# Print the list of the files in the tar.gz and find the path of the file
tar ztf data_a.tar.gz

# Extract the file
tar zxvf data_a.tar.gz data_a/datetime/data-1/data-1-a-b.tif

# Extract the directory
tar zxvf data_a.tar.gz data_a/datetime/data-1

# -x: instructs tar to extract files.
# -f: specifies filename / tarball name.
# -v: Verbose (show progress while extracting files).
# -z: filter archive through gzip, use to decompress .gz files.
# -t: List the contents of an archive
```

## awk

Print a matched line with a specific delimiter (e.g. `,`)

``` bash
# Check out the matched line
grep comp01-mg /etc/hosts
192.168.1.101    comp01-mg.mydomain.com    comp01-mg

# Print the line as "ip,hostname,hostname.domain"
awk '/comp01-mg/ {print $1,$3,$2}' OFS="," /etc/hosts
192.168.1.101,comp01-mg,comp01-mg.mydomain.com
```

## iDRAC

*"Access Error: 400 -- Bad Request."*

Sometimes, iDRAC webui beomes inaccessible with FQDN, showing this error message, 
"Access Error: 400 -- Bad Request." It seems like a bug in a particular iDRAC version. 
Here's the workaround, which lets you manually set its FQDN. 

```
racadm set idrac.webserver.ManualDNSentry \
  192.168.20.30,hostname-mg,hostname-mg.mydomain.com

# using the awk tip
racadm set idrac.webserver.ManualDNSentry \
  $(awk '/comp01-mg/ {print $1,$3,$2}' OFS="," /etc/hosts)
```

