// Mocha Specification Cases

const assert =    require('assert');
const { JSDOM } = require('jsdom');

const url  = 'http://dnajs.org/';
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

   it('has the correct URL', () => {
      assert.equal(window.location.href, url);
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
