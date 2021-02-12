import "../theme/index.css"

const callback = function(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'attributes') {
      if (mutation.target.classList.contains('theme-capitalist')) {
        document.querySelector('head').innerHTML += `<style>
          body {
              --base-hue: 83;
              --base-saturation: 74%;
              --base-lightness: 42%;
          }
        </style>`;
      } else {
        document.querySelector('head').innerHTML += `<style>
          body {
            --base-hue: 214;
            --base-saturation: 100%;
            --base-lightness: 57%;
          }
        </style>`;
      }
    }
  }
};

const observer = new MutationObserver(callback);

observer.observe(document.body, { attributes: true })

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  themes: [
    { name: 'Practika', class: 'theme-practika', color: '#2281FF', default: true },
    { name: 'Capitalist', class: 'theme-capitalist', color: '#7eba1c' }
  ]
}

