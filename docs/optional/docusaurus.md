---
id: docusaurus
title: Docusaurus
sidebar_label: Docusaurus
---

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

## General operations

### Scaffold your website

```
npx create-docusaurus@latest website classic
```

### Run the dev server

```
cd website
npm run start
```

### Publish your website to Github

Publish the site as user/organization page `https://username.github.io`.

``` sh
cd website
GIT_USER=<username> CURRENT_BRANCH=<branch> USE_SSH=true DEPLOYMENT_BRANCH=<branch> yarn run deploy

# e.g. My site
GIT_USER=kojiwell CURRENT_BRANCH=docusaurus_v3 USE_SSH=true DEPLOYMENT_BRANCH=master yarn run deploy
```

## Configuration

### Files and directories

* `website/siteConfig.js` -- Configuration
* `website/sidebars.json` -- Sidebar Configuration
* `docs/` -- Document folder


## Writing blogs/pages

You should read [Markdown Features](https://docusaurus.io/docs/markdown-features) to learn about Docusaurus's markdown features.

### Markdown Headers

Here's an example of documentation page.

``` markdown title="docs/docusaurus.md"
---
id: docusaurus
title: Docusaurus
sidebar_label: Docusaurus
---
```

Here's an example of blog page.

``` markdown title="blog/2023-05-13-bits-and-pieces.md"
---
slug: 2023-05-13-bits-and-pieces
title: 2023-05-13 Bits and pieces here and there
authors: kojiwell
tags: [misc]
---
```

### Tabs

Here's a code example for tabs.

```
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    This is an apple 🍎
  </TabItem>
  <TabItem value="orange" label="Orange">
    This is an orange 🍊
  </TabItem>
  <TabItem value="banana" label="Banana">
    This is a banana 🍌
  </TabItem>
</Tabs>
```

Here's the outcome of the example code.

:::note[Example]

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    This is an apple 🍎
  </TabItem>
  <TabItem value="orange" label="Orange">
    This is an orange 🍊
  </TabItem>
  <TabItem value="banana" label="Banana">
    This is a banana 🍌
  </TabItem>
</Tabs>

:::

### Inline table of contents

```
import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />
```
