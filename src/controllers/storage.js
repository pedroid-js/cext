export function saveJSON(KEY, DATA, TYPE = "f") {
  switch(TYPE) {
    case "f":
      localStorage.setItem(KEY, JSON.stringify(DATA, (k, v) => typeof v === 'string' ? "/Function(" + v.toString() + ")/" : v))
      break;
    case "s":
      localStorage.setItem(KEY, JSON.stringify(DATA, (k, v) =>  v))
      break;
    default: return ''
  }
  
}

export function findOneJSON(API, k, callback) {
  API.map(item => {
    if (item.key === k) {
      callback(item)
    }
  })
  callback(null)
}

export function readJSON(KEY, TYPE = "f") {
  switch(TYPE) {
    case "f":
      return localStorage.getItem(KEY) ? JSON.parse(localStorage.getItem(KEY), (k, v) => {
        if (typeof v === 'string' && v.startsWith("/Function(") && v.endsWith(")/")) {
          return ("" + v.substring(10, v.length - 2) + "")
        }
        return v
      }) : []
      break;
    case "s":
      return localStorage.getItem(KEY) ? JSON.parse(localStorage.getItem(KEY), (k, v) => v) : []
      break;
    default: return []
  }
}

export function removeJSON(KEY, k, callback, TYPE = "f") {
  switch(TYPE) {
    case "f": 
      const API = readJSON(KEY)
      let AUX = []
      API.map(item => {
        if (item.key !== k) AUX.push(item)
      })
      saveJSON(KEY, AUX)
      callback(readJSON(KEY))
      break;
    default: return 0
  }
}

export function editJSON(oJSON, callback, TYPE = "f") {
  switch(TYPE) {
    case "f": 
      const API = readJSON('API')
      let AUX = []
      API.map(item => {
        if (item.key === oJSON.key) {
          AUX.push(oJSON)
        } else AUX.push(item)
      })
      saveJSON('API', AUX)
      callback(readJSON('API'))
      break;
    default: return 0
  }
}
