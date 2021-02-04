# Components library for Capitalist and Practika

### Global Tasks

- lazy load for countryPhoneCodes
 
### Scripts

- `sb` start Storybook Server on `http://localhost:6006/` (use topbar button to switch theme)
- `build:sb` build Storybook server
- `build:all` build library for users
- `publish` publish to npm
- `build` build UMD to dist folder
- `build:es` compile to ES6 modules (97.29% support for browsers) - bundling tools can smartly tree–shake away code that isn’t used, and so a browser that supports ES modules can simply import the files.
- `build:lib` compile to ES5 (99.15% support for browsers)

### Usage in projects

1. `yarn add capricorn-ui`
2. Add styles to root file:
    - `import 'capricorn-ui/theme/index.css'`
    - `import 'capricorn-ui/theme/(practika/capitalist).css'` for theme.
