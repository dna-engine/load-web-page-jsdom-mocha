// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { serverListening } from 'server-listening';

// Setup
const url = 'https://pretty-print-json.js.org/';
let web;  //fields: url, dom, window, document, title, html, verbose
const loadWebPage =  () => serverListening.loadWebPage(url).then(webInst => web = webInst);
const closeWebPage = () => serverListening.closeWebPage(web);

////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {
   const getTags = (elems) => [...elems].map(elem => elem.nodeName.toLowerCase());
   before(loadWebPage);
   after(closeWebPage);

   it('has the correct URL', () => {
      const actual =   { url: web.window.location.href };
      const expected = { url: url };
      assertDeepStrictEqual(actual, expected);
      });

   it('body has exactly one header, main, and footer -- body.children', () => {
      const actual =   getTags(web.document.body.children);
      const expected = ['header', 'main', 'footer'];
      assertDeepStrictEqual(actual, expected);
      });

   it('body has exactly one header, main, and footer -- querySelectorAll()', () => {
      const actual =   getTags(web.document.querySelectorAll('body >*'));
      const expected = ['header', 'main', 'footer'];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The document content', () => {
   before(loadWebPage);
   after(closeWebPage);

   it('has a 🚀 traveling to 🪐!', () => {
      const html =     web.document.body.outerHTML;
      const actual =   { '🚀': !!html.match(/🚀/g), '🪐': !!html.match(/🪐/g) };
      const expected = { '🚀': true,                '🪐': true };
      assertDeepStrictEqual(actual, expected);
      });

   });
