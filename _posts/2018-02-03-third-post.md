---
layout: post
title: Third Post
date: 2018-02-03 16:16:01 -0600
tag: noticias
author: Andreas Remdt
image_path: /images/pages/home/campus.jpg
---

Chances are, at some point, you’ll want to include images, downloads, or other digital assets along with your text content. While the syntax for linking to these resources differs between Markdown and Textile, the problem of working out where to store these files in your site is something everyone will face.

There are a number of ways to include digital assets in Jekyll. One common solution is to create a folder in the root of the project directory called something like assets, into which any images, files or other resources are placed. Then, from within any post, they can be linked to using the site’s root as the path for the asset to include. Again, this will depend on the way your site’s (sub)domain and path are configured, but here are some examples in Markdown of how you could do this using the absolute_url filter in a post.

Including an image asset in a post: