export function formatDate(date, hasHours = false) {
  let d = new Date(Date.parse(date))
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun ', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const days = ['Mon', 'Tu', 'Wed', 'Th', 'Fr', 'Sa', 'Su']
  let min = d.getMinutes().toString().length === 1 ? `0${d.getMinutes()}` : d.getMinutes()
  return `${days[d.getDay() - 1]} ${months[d.getMonth()]} ${d.getFullYear()} ${hasHours ? `${d.getHours()}:${min}:${d.getSeconds()}` : ''}`
}

export function formatDateShort(date, hasHours = false) {
  const d = new Date(Date.parse(date))
  return `${addZero(d.getDate())}/${addZero(d.getMonth() + 1)}/${d.getFullYear()} ${hasHours ? ` - ${addZero(d.getHours())}:${addZero(d.getMinutes())}:${d.getSeconds()}` : ''}`
}

const addZero = (d) => d.toString().length === 1 ? `0${d}` : d

export const copyToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}