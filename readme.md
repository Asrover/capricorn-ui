# Card, Marketplace and Marketplace Deposit

### Первая установка зависимостей

`lerna bootstrap --hoist` вместо `yarn install`

### Установка новой зависимости:

`lerna add workspace_name --scope=package_name`

### Глобальные задачи

- `cards`: Оптимизировать `shared/certverification.ts` - для сертификата загружать зависимости по требованию, кушает больше 100кб в GZIP 
 
### Скрипты

- `yarn sb` start Storybook Server on `http://localhost:6006/`
- `yarn build-storybook` build Storybook server (upload folder `storybook-static` to `capricorn.cometa.biz`)
- `yarn build:all` build library for users
- `yarn publish` publish to npm

### Использование в проектах

- `yarn add capricorn-ui`

### Добавление модального окна

1. Add name to **modals.ts**
2. Add record to **ModalContainer.tsx**
3. Create modal in **components/modals**
4. `const showModal = useStoreActions(actions => actions.modal.showModal)`
5. `() => showModal(EModalName.ModalName)`
