import "../theme/index.css"
import "../theme/capitalist.css"
import "../theme/practika.css"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  themes: [
    { name: 'Practika', class: 'theme-practika', color: '#2281FF', default: true },
    { name: 'Capitalist', class: 'theme-capitalist', color: '#7eba1c' }
  ]
}
