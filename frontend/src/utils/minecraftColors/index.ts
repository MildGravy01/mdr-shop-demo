/* eslint-disable no-extend-native */
/* eslint-disable max-len */

import { TRequestStyleMap, TStyleMap } from "./types";

let obfuscators: any[] = [];
const styleMap = {
  '&4': 'font-weight:normal;text-decoration:none;color:#be0000',
  '&c': 'font-weight:normal;text-decoration:none;color:#fe3f3f',
  '&6': 'font-weight:normal;text-decoration:none;color:#ffbf00',
  '&e': 'font-weight:normal;text-decoration:none;color:#fefe3f',
  '&2': 'font-weight:normal;text-decoration:none;color:#00be00',
  '&a': 'font-weight:normal;text-decoration:none;color:#3ffe3f',
  '&b': 'font-weight:normal;text-decoration:none;color:#3ffefe',
  '&3': 'font-weight:normal;text-decoration:none;color:#00bebe',
  '&1': 'font-weight:normal;text-decoration:none;color:#0000be',
  '&9': 'font-weight:normal;text-decoration:none;color:#3f3ffe',
  '&d': 'font-weight:normal;text-decoration:none;color:#fe3ffe',
  '&5': 'font-weight:normal;text-decoration:none;color:#be00be',
  '&f': 'font-weight:normal;text-decoration:none;color:#ffffff',
  '&7': 'font-weight:normal;text-decoration:none;color:#bebebe',
  '&8': 'font-weight:normal;text-decoration:none;color:#3f3f3f',
  '&0': 'font-weight:normal;text-decoration:none;color:#000000',
  '&g': 'background-image:linear-gradient(to bottom right, #fff, grey);-webkit-background-clip:text;-webkit-background-clip:text;-webkit-background-clip:text;-webkit-background-clip:text; -webkit-text-fill-color: transparent',
  '&l': 'font-weight:bold',
  '&n': 'text-decoration:underline;text-decoration-skip:spaces',
  '&o': 'font-style:italic',
  '&m': 'text-decoration:line-through;text-decoration-skip:spaces',
} as TStyleMap;
function obfuscate(string: string, elem: HTMLElement) {
  let magicSpan;
  let currNode;
  const len = elem.childNodes.length;
  if (string.indexOf('<br>') > -1) {
    elem.innerHTML = string;
    for (let j = 0; j < len; j++) {
      currNode = elem.childNodes[j];
      if (currNode.nodeType === 3) {
        if(currNode.nodeValue){
          magicSpan = document.createElement('span');
          magicSpan.innerHTML = currNode.nodeValue;
          elem.replaceChild(magicSpan, currNode);
          init(magicSpan, '');
        }
      }
    }
  } else {
    init(elem, string);
  }
  function init(el: HTMLElement, str:string) {
    let i = 0;
    let obsStr = str || el.innerHTML;
    const len = obsStr.length;
    obfuscators.push( window.setInterval(function() {
      if (i >= len) i = 0;
      obsStr = replaceRand(obsStr, i);
      el.innerHTML = obsStr;
      i++;
    }, 0) );
  }
  function randInt(min: number, max: number) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
  }
  function replaceRand(string: string, i: number) {
    const randChar = String.fromCharCode( randInt(64, 90) ); /* Numbers: 48-57 Al:64-90*/
    return string.substr(0, i) + randChar + string.substr(i + 1, string.length);
  }
}
function applyCode(string: string, codes: string[]) {
  const len = codes.length;
  const elem = document.createElement('span');
  let obfuscated = false;
  for (let i = 0; i < len; i++) {
    elem.style.cssText += styleMap[codes[i] as TRequestStyleMap]  + ';';
    if (codes[i] === '&k') {
      obfuscate(string, elem);
      obfuscated = true;
    }
  }
  if (!obfuscated) elem.innerHTML = string;
  return elem;
}
export function colorize(string: string): string | DocumentFragment {
  if (!string) {
    return string;
  }
  string = string.replaceAll('%mdrchat_custom_platinum_p%', '&7&lПлатины&r');
  string = string.replaceAll('\'', '');
  const codes = string.match(/&.{1}/g) || [];
  const indexes = [];
  let apply: any[] = [];
  let tmpStr;
  let indexDelta;
  const final = document.createDocumentFragment();
  const len = codes.length;

  for (let i = 0; i < len; i++) {
    indexes.push( string.indexOf(codes[i]) );
    string = string.replace(codes[i], '\x00\x00');
  }
  if (indexes[0] !== 0) {
    final.appendChild( applyCode( string.substring(0, indexes[0]), [] ) );
  }
  for (let i = 0; i < len; i++) {
    indexDelta = indexes[i + 1] - indexes[i];
    if (indexDelta === 2) {
      while (indexDelta === 2) {
        apply.push( codes[i] );
        i++;
        indexDelta = indexes[i + 1] - indexes[i];
      }
      apply.push( codes[i] );
    } else {
      apply.push( codes[i] );
    }
    if ( apply.lastIndexOf('&r') > -1) {
      apply = apply.slice( apply.lastIndexOf('&r') + 1 );
    }
    tmpStr = string.substring( indexes[i], indexes[i + 1] );
    final.appendChild( applyCode(tmpStr, apply) );
  }
  return final;
}
function clearObfuscators() {
  let i = obfuscators.length;
  for (;i--;) {
    clearInterval(obfuscators[i]);
  }
  obfuscators = [];
}
declare global {
  interface String {
    replaceColorCodes() : string | DocumentFragment;
  }
}
String.prototype.replaceColorCodes = function() {
  clearObfuscators();
  const outputString = colorize(String(this));
  return outputString;
};
