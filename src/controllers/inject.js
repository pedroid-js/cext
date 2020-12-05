import { readJSON } from './storage'

/*global chrome*/
function injectExt(CODE, callback) {
  chrome.tabs.executeScript({code: CODE}, callback);
}

export function inject(KEY, k, callback = () => {}) {
  const API = readJSON(KEY)
  API.map(item => {
    if (item.key === k) {
      injectExt('(function(){' + item.code + '})();', callback)
      console.info(`Triggered script ${item.key}`, '\n', '(function(){\n' + item.code + '\n})();')
    }
  })
}

export function UNSAFEinject(code, callback = () => {}, async = false) {
  if (code) {
    let c = async ? '(async function(){' + code + '})();' : '(function(){' + code + '})();'
    injectExt(c, callback)
    console.info(`Triggered code`, '\n', c)
  }
}

