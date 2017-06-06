// Jasmine Specification Cases

var url  = 'http://dnajs.org/';

var assert = require('assert');
const { JSDOM } = require('jsdom');

var window, $;
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
      var actual =   {
          header: $('body >header').length,
          main:   $('body >main').length,
          footer: $('body >footer').length
          };
      var expected = { header: 1, main: 1, footer: 1 };
      assert.deepEqual(actual, expected);
      });

   });
