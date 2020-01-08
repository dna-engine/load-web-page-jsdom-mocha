// Mocha Specification Cases

// Imports
const assert =          require('assert').strict;
const serverListening = require('server-listening');
const { JSDOM } =       require('jsdom');

// Setup
const url = 'https://pretty-print-json.js.org/';
const jsdomOptions = { resources: 'usable', runScripts: 'dangerously' };
let dom;
before(() => JSDOM.fromURL(url, jsdomOptions)
   .then(serverListening.jsdomOnLoad)
   .then((jsdom) => dom = jsdom)
   );
after(() => dom.window.close());

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {

   it('has the correct URL -> ' + url, () => {
      const actual =   { url: dom.window.location.href };
      const expected = { url: url };
      assert.deepEqual(actual, expected);
      });

   it('has exactly one header, main, and footer', () => {
      const actual =   {
         header: dom.window.$('body >header').length,
         main:   dom.window.$('body >main').length,
         footer: dom.window.$('body >footer').length
         };
      const expected = { header: 1, main: 1, footer: 1 };
      assert.deepEqual(actual, expected);
      });

   it('has a 🚀 flying to 🪐!', () => {
      const html = dom.window.document.documentElement.outerHTML;
      const actual =   { '🚀': !!html.match(/🚀/g), '🪐': !!html.match(/🪐/g) };
      const expected = { '🚀': true,                '🪐': true };
      assert.deepEqual(actual, expected);
      });

   });
