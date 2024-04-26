---
id: docusaurus
title: Docusaurus
sidebar_label: Docusaurus
---

## Scaffold your website

```
npx create-docusaurus@latest website classic
```

## Run the dev server

```
cd website
npm run start
```

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

## Publish your website to Github

Publish the site as user/organization page `https://username.github.io`.

``` sh
cd website
GIT_USER=<username> CURRENT_BRANCH=<branch> USE_SSH=true DEPLOYMENT_BRANCH=<branch> yarn run deploy

# e.g. My site
GIT_USER=kojiwell CURRENT_BRANCH=docusaurus_v3 USE_SSH=true DEPLOYMENT_BRANCH=master yarn run deploy
```
