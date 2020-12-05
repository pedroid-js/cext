const ampAttributes = [
  {
    id: 'data-amp-on',
    replacement: 'on'
  }, {
    id: 'data-amp-text',
    replacement: '[text]'
  }, {
    id: 'data-amp-slide',
    replacement: '[slide]'
  }, {
    id: 'disable-session-states="true"',
    replacement: 'disable-session-states'
  }, {
    id: 'data-amp-controls="true"',
    replacement: 'controls'
  }, {
    id: 'data-amp-loop="true"',
    replacement: 'data-amp-loop'
  }
]

const toAmpAttributes = (html_string) => {
  ampAttributes.map(({ id, replacement }) => {
    html_string = html_string.replace(new RegExp(id, 'g'), replacement)
  })

  html_string = html_string.replace(new RegExp(/style=\".*\"/, 'gi'), '')
  html_string = html_string.replace(new RegExp(/\<script[.\s\S]*\/script>/, 'gi'), '')
  html_string = html_string.replace(new RegExp(/\<mdstwitter[.\s\S]*\/mdstwitter>/, 'gi'), '')

  return html_string
}

export default toAmpAttributes