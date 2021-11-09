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
              
              --text-color: #fff;
              --second-text-color: #95ABD6;
              --third-text-color: #687CA5;
              --cprn-bg-color: #28344A;
              --cprn-bg-color-2: #3A4C6F;
              --cprn-bg-color-3: #2F3E5B;
              --box-shadow-1: none;
              --box-shadow-2: none;
          }
        </style>`;
      } else {
        document.querySelector('head').innerHTML += `<style>
          body {
            --base-hue: 214;
            --base-saturation: 100%;
            --base-lightness: 57%;
            
            --text-color: #fff;
            --second-text-color: #95ABD6;
            --third-text-color: #687CA5;
            --cprn-bg-color: #28344A;
            --cprn-bg-color-2: #3A4C6F;
            --cprn-bg-color-3: #2F3E5B;
            --box-shadow-1: none;
            --box-shadow-2: none;
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

