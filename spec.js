// Mocha Specification Cases

// Imports
const assert =    require('assert').strict;
const { JSDOM } = require('jsdom');

// Setup
const url  = 'https://dragonsgrill.org/';
//const url  = 'https://dnajs.org/';  //Error: Uncaught [TypeError: Cannot read property 'responseStart' of undefined]
let window, $;
function loadWebPage(done) {
   function handleWebPage(dom) {
      function waitForScripts() {
         window = dom.window;
         $ = dom.window.jQuery;
         done();
         }
      dom.window.onload = waitForScripts;
      }
   const options = { resources: 'usable', runScripts: 'dangerously' };
   JSDOM.fromURL(url, options).then(handleWebPage);
   }
function closeWebPage() { window.close(); }

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {

   before(loadWebPage);
   after(closeWebPage);

   it('has the correct URL -> ' + url, () => {
      const actual =   { url: window.location.href };
      const expected = { url: url };
      assert.deepEqual(actual, expected);
      });

   it('has exactly one header, main, and footer', () => {
      const actual =   {
          header: $('body >header').length,
          main:   $('body >main').length,
          footer: $('body >footer').length
          };
      const expected = { header: 1, main: 1, footer: 1 };
      assert.deepEqual(actual, expected);
      });

   });
