# Post mentions

This NodeBB plugin allows posters to reference (or _mention_) other categories or topics on a NodeBB by simply precluding the `&c` (for categories) and the `&t` symbol for a topic.
A link is automatically added to the post.

> You can change those synbol in Admin control panel > plugins > Post mentions.

Limitation:

- Topic filter by word. That mean, if you have a topic name `Test ABC` then you have to type at least `test`
- Category at least 2 letters.

## Installation

Install from nodebb Admin control panel > extend > Plugins > nodebb-plugin-postmentions-fixed

or

```console
npm install nodebb-plugin-postmentions-fixed
```

or

```console
yarn add nodebb-plugin-postmentions-fixed
```
