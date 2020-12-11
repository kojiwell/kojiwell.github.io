---
id: docusaurus
title: Docusaurus
sidebar_label: Docusaurus
---

## Files and directories

* `website/siteConfig.js` -- Configuration
* `website/sidebars.json` -- Sidebar Configuration
* `docs/` -- Document folder

## Markdown Headers

```
---
id: docusaurus
title: Docusaurus
sidebar_label: Docusaurus
---
```

## Publishing

Publish the site as user/organization page `https://username.github.io`.

``` sh
cd website
GIT_USER=<username> CURRENT_BRANCH=<branch> USE_SSH=true yarn run publish-gh-pages

# e.g. My site
GIT_USER=kojiwell CURRENT_BRANCH=docusaurus USE_SSH=true yarn run publish-gh-pages
```
