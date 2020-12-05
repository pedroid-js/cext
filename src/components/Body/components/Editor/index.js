import React, { useEffect } from 'react'
import CodeEditor from './components/CodeEditor'
import makeStyles from "@material-ui/core/styles/makeStyles";
import SaveIcon from '@material-ui/icons/Save';
import BackspaceIcon from '@material-ui/icons/Backspace';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { UNSAFEinject } from '../../../../controllers/inject'
import Select from '../../../commons/Select'
import TextBox from '../../../commons/TextBox'
import Button from '../../../commons/Button'
import { readJSON, saveJSON, removeJSON, findOneJSON } from '../../../../controllers/storage'
import mock from './mock.json'
import Scripts from '../../../../assets/js/scripts'

const CONFIG = mock.config

const style = makeStyles({
  editor: {
    display: "flex",
    margin: "8px",
  },
  mg: {
    marginTop: "15px",
    marginBottom: "15px",
  },
  box: {
    margin: "8px",
    display: "flex",
    flex: 1
  },
  ml4: {
    marginRight: "5px",
  },
  fg: {
    flexGrow: 1,
  },
  button: {
    marginRight: "5px",
  },
  pushRight: {
    flexGrow: 1,
  },
  top: {
    display: "flex",
    height: "45px",
  },
});

const Editor = ({ skey, handleView }) => {
  const classes = style();
  const [code, setCode] = React.useState('')
  const [k, setK] = React.useState('')
  const [theme, setTheme] = React.useState('github')
  const [mode, setMode] = React.useState('javascript')
  const [values, setValue] = React.useState({
    cdnTag: '',
    cdnValue: '',
    tags: [],
    cdns: []
  })

  const handleChange = (value) => {
    setCode(value)
  }

  const handleTheme = (t) => {
    setTheme(t.target.value)
  }

  const handleMode = (m) => {
    setMode(m.target.value)
  }

  function handleKeyChange(e) {
    setK(e.target.value)
  }

  function handleCdnTagChange(e) {
    setValue({ ...values, cdnTag: e.target.value })
  }

  function handleCdnValueChange(e) {
    setValue({ ...values, cdnValue: e.target.value })
  }

  const saveScript = () => {
    if (code === '' && k === '' || skey === '') return false
    let API = readJSON('API')
    if (typeof skey !== 'undefined') { //edit
      findOneJSON(API, skey, (item) => {
        // Item encontrado proceder a modificar
        removeJSON('API', item.key, (DATA) => {
          DATA.push({ 
            key: item.key,
            code: code, 
            date: item.date, 
            dateModify: new Date().toString(), 
            mode: mode, 
            theme: theme,
            cdns: values.cdns ? values.cdns : null
          })
          saveJSON('API', DATA)
          handleView('List')
        })
      })
    } else { // save
      findOneJSON(API, k, (item) => {
        if (item !== null) { // Encontrada Key No guardar
          // TODO trigger error
        } else if (k !== '') { // No encontrado guardar
          API.push({ 
            key: k, 
            code: code, 
            date: new Date().toString(), 
            dateModify: undefined, 
            mode: mode, 
            theme: theme,
            cdns: values.cdns ? values.cdns : null
          })
          saveJSON('API', API)
          handleView('List')
        }
      })
    }
  }

  const handleTag = () => {
    setValue({
      ...values, tags: [
        ...values.tags, 
        { 
          key: values.cdnTag, 
          value: values.cdnValue
        }
      ]
    })
  }

  const handleCdn = () => {
    let aux = []
    values.tags.forEach(tag => aux.push(tag))
    setValue({
      ...values, tags: [], cdns: [
        ...values.cdns,
        {
          cdn: aux
        }
      ]
    })
  }

  React.useEffect(() => {
    console.log("CDNS@@@@ \n", values.cdns)
    console.log("TAGS@@@@ \n", values.tags)
  }, [values.cdns, values.tags])

  const Run = () => {
    let c = ''
    if (values.cdns) {
      values.cdns.forEach(it => {
        let s = new Scripts(it.cdn)
        s.build()
        s._fetch().then(res => {
          console.log('HERE IS THE RES NOT PENDING', res)
          console.log('RES BODY@@@@@@@@@@@@@', res.body)
        })
        c += `${ s.get() }`
        s.log()
      })
    }
    let o = `${c} ${code}`
    console.log(o)
    UNSAFEinject(o)
  }

  const goBack = () => handleView('List')

  const loadFields = (data) => {
    setCode(data.code)
    setMode(data.mode)
    setTheme(data.theme)
    if (data.cdns) setValue({...values, cdns: data.cdns})
  }

  useEffect(() => {
    if (skey !== '') {
      let API = readJSON('API')
      API.forEach(item => {
        if (item.key === skey) {
          loadFields(item)
        }
      })
    }
  }, [])

  const renderButtonPanel = () =>
    <div className={classes.box}>
      <div className={classes.pushRight} />
      {[{ color: 'primary', handleClick: goBack, icon: <BackspaceIcon />, text: 'BACK' },
      { color: 'danger', handleClick: Run, icon: <PlayArrowIcon />, text: 'RUN' },
      { color: 'warning', handleClick: saveScript, icon: <SaveIcon />, text: 'SAVE' }
      ].map(item => {
        return (
          <Button
            className={classes.button}
            color={item.color}
            handleClick={item.handleClick}
            icon={item.icon}
          >
            { item.text}
          </Button>
        )
      })}
    </div>

  const renderCndPanel = () => {
    return (
      <div className={classes.top}>
        <TextBox
          id="cdnTag"
          label="cdnTag"
          value={values.cdnTag}
          handleChange={handleCdnTagChange}
        />
        <TextBox
          id="cdnValue"
          label="cdnValue"
          value={values.cdnValue}
          handleChange={handleCdnValueChange}
        />
        <Button
          className={classes.button}
          color="primary"
          handleClick={handleTag}
        >
          TAG+
        </Button>
        <Button
          className={classes.button}
          color="primary"
          handleClick={handleCdn}
        >
          CDN+
        </Button>
      </div>
    )
  }

  const renderToolPanel = () =>
    <>
      <TextBox
        id="key"
        label="key"
        handleChange={handleKeyChange}
        value={skey}
        disabled={typeof skey !== 'undefined' ? true : false}
      />
      <Select
        handleChange={handleMode}
        label="Mode"
        values={CONFIG.editor.modes}
        value={mode}
      />
      <Select
        handleChange={handleTheme}
        label="Theme"
        values={CONFIG.editor.themes}
        value={theme}
      />
    </>


  return (
    <>
      { renderCndPanel()}
      { renderToolPanel()}
      <div className={classes.editor}>
        <CodeEditor
          handleChange={handleChange}
          def={code}
          theme={theme}
          mode={mode}
        />
      </div>
      { renderButtonPanel()}
    </>
  )
}

export default Editor