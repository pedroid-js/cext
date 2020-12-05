export default class Scripts {
  constructor(attr) {
    this.attr = attr
    this.script = null
  }

  log() {
    console.log(this.script)
  }

  _fetch() {
    return new Promise((resolve) => {
      this.attr.forEach(a => {
        const { key, value } = a
        if (
          value && key
          && typeof value === 'string'
          && value.length > 0
          && key === 'src'
        ) {
          fetch(value, {}).then(res => {
            resolve(res)
          })
        }
      })
    })
  }

  build() {
    const id = `nsc${Math.floor(Math.random() * (9999 - 0)) + 0}b`
    this.script = `let ${id} = document.createElement('script'); `
    this.attr.forEach(a => a.key !== 'crossorigin' ? this.script += `${id}['${a.key}'] = '${a.value}'; ` : this.script += `${id}.setAttribute('${a.key}', '${a.value}');`)
    this.script += `  document.getElementsByTagName('HEAD')[0].appendChild(${id}); `
  }

  get() {
    return this.script
  }

}

const defaultParams =  {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  body: JSON.stringify({}) // body data type must match "Content-Type" header
}