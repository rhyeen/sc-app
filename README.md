# Sharded Cards Web App
Is a web browser-based trading card game that is built mobile-first and ready to play on modern browsers (except IE; he's not invited to the party).

## Open-wc Starter App

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

Sharded Cards is proudly built with [lit-element](https://github.com/PolymerLabs/lit-element) and [lit-html](https://github.com/PolymerLabs/lit-html) for componetization and [Redux](https://redux.js.org/) for state management.

## License; use, modification, sharing, and distribution

This repo does **not** have an Open Source license and its copyright is only extended to the specified authors.
* You are not permitted to share the software.
* You are not permitted to distribute the software.
* You are not permitted to modify the software.
* You are not permitted to use the software, except at https://sharded.cards/.

* You are, however, permitted to view and fork this repo.

You can read more about our permissions at https://choosealicense.com/no-permission/

## Development

### Contributing

If you want to get started on contributing, head over the [Sharded Cards Wiki](https://github.com/rhyeen/shardedcards) and either check out the [Issues](https://github.com/rhyeen/shardedcards/issues) or [Projects](https://github.com/rhyeen/shardedcards/projects).  Not sure where to start?  You can [post your interest here](https://github.com/rhyeen/shardedcards/issues/2) and I'll get you started.

We keep a separate repo for Issues/Projects because the project spans more than one repo (front-end, back-end, etc).  If there is an issue specific to only this project, you can just [post an issue here](https://github.com/rhyeen/sc-app/issues).

### Setup

```
git clone https://github.com/rhyeen/sc-app
cd sc-app
npm install
npm start
```

### Testing

To run the tests, you can run `npm run test`.

### Build

To build the app, run `npm run build`. This will create a `build` folder that has all the minified 
bundles and assets you need to deploy. If you want to test that the build output works, you can run

```
npm run start:build
```

## Notes

### Deployment

For deployment, I use [Netlify](https://www.netlify.com/). Since **Sharded Cards** does not have an Open Source license, you are not permitted to deploy the code to a public URL.

### Supported browsers
This app uses the `es6-bundled` bundle -- this means that it will not work on IE11. It could be deployed with the `es5-bundled` bundle, but nobody likes IE11 anyway.