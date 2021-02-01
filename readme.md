# Components library for Capitalist and Practika

### Global Tasks

- lazy load for countryPhoneCodes
 
### Scripts

- `sb` start Storybook Server on `http://localhost:6006/` (use topbar button to switch theme)
- `build-storybook` build Storybook server (upload folder `storybook-static` to `capricorn.cometa.biz`)
- `build:all` build library for users
- `publish` publish to npm
- `build` build UMD
- `build:es` compile to ES6 modules (97.29% support for browsers) - bundling tools can smartly tree–shake away code that isn’t used, and so a browser that supports ES modules can simply import the files.
- `build:lib` compile to ES5 (99.15% support for browsers)

### Usage in projects

- `yarn add capricorn-ui`
- add css-class `theme-practika` or `theme-capitalist` to your body component.
