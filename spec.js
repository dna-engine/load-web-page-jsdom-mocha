// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { serverListening } from 'server-listening';
import { JSDOM } from 'jsdom';

// Setup
const url =          'https://pretty-print-json.js.org/';
const jsdomOptions = { resources: 'usable', runScripts: 'dangerously' };
let dom;
const loadWebPage = () => JSDOM.fromURL(url, jsdomOptions)
   .then(serverListening.jsdomOnLoad)
   .then(jsdom => dom = jsdom);
const closeWebPage = () => serverListening.jsdomCloseWindow(dom);

////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {
   const getTags = (elems) => [...elems].map(elem => elem.nodeName.toLowerCase());
   before(loadWebPage);
   after(closeWebPage);

   it('has the correct URL -> ' + url, () => {
      const actual =   { url: dom.window.location.href };
      const expected = { url: url };
      assertDeepStrictEqual(actual, expected);
      });

   it('has a body with exactly one header, main, and footer -- body.children', () => {
      const actual =   getTags(dom.window.document.body.children);
      const expected = ['header', 'main', 'footer'];
      assertDeepStrictEqual(actual, expected);
      });

   it('has a body with exactly one header, main, and footer -- querySelectorAll()', () => {
      const actual =   getTags(dom.window.document.querySelectorAll('body >*'));
      const expected = ['header', 'main', 'footer'];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The document content', () => {
   before(loadWebPage);
   after(closeWebPage);

   it('has a 🚀 traveling to 🪐!', () => {
      const html =     dom.window.document.documentElement.outerHTML;
      const actual =   { '🚀': !!html.match(/🚀/g), '🪐': !!html.match(/🪐/g) };
      const expected = { '🚀': true,                '🪐': true };
      assertDeepStrictEqual(actual, expected);
      });

   });
