# Components library for Capitalist and Practika

### Global Tasks

- `cards`: Оптимизировать `shared/certverification.ts` - для сертификата загружать зависимости по требованию, кушает больше 100кб в GZIP 
 
### Scripts

- `yarn sb` start Storybook Server on `http://localhost:6006/` (use topbar button to switch theme)
- `yarn build-storybook` build Storybook server (upload folder `storybook-static` to `capricorn.cometa.biz`)
- `yarn build:all` build library for users
- `yarn publish` publish to npm

### Usage in projects

- `yarn add capricorn-ui`
- add css-class `theme-practika` or `theme-capitalist` to your body component.
