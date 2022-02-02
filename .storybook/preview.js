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
              --box-shadow-1: 0 26px 30px #edf1f3;
              --box-shadow-2: 0 12px 30px rgba(26,30,42,.14);
              --box-shadow-3: 0 6px 12px rgba(26, 30, 42, 0.08);
          }
        </style>`;
      } else {
        document.querySelector('head').innerHTML += `<style>
          body {
          /*  DARK */
            /*--base-hue: 214;*/
            /*--base-saturation: 100%;*/
            /*--base-lightness: 57%;*/
            
            /*--text-color: #fff;*/
            /*--second-text-color: #95ABD6;*/
            /*--third-text-color: #687CA5;*/
            /*--cprn-bg-color: #28344A;*/
            /*--cprn-bg-color-2: #3A4C6F;*/
            /*--cprn-bg-color-3: #2F3E5B;*/
            /*--box-shadow-1: none;*/
            /*--box-shadow-2: none;*/
            
            
            /*  LIGHT */
              --base-hue: 214;
              --base-saturation: 100%;
              --base-lightness: 57%;
          
              --text-color: #1D2534;
              --second-text-color: #7E8289;
              --third-text-color: #B8BDC4;
              --cprn-bg-color: #fff;
              --cprn-bg-color-2: #f7f9fa;
              --cprn-bg-color-3: #f2f4f5;
              --box-shadow-1: 0 26px 30px #edf1f3;
              --box-shadow-2: 0 12px 30px rgba(26,30,42,.14);
              --box-shadow-3: 0 6px 12px rgba(26, 30, 42, 0.08);
              --cprn-border-color-1: #d9dde4;
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

