import React, { useEffect } from 'react'
import clsx from 'clsx';
import EncryptText from './components/EncryptText'
import ListScripts from './components/ListScripts'
import Editor from './components/Editor'
import AmpValidator from './components/Amp'
import { readJSON } from '../../controllers/storage'
import { useStyles } from './styles'

const Body = ({handleView, open, view}) => {
  const classes = useStyles()
  const [ scripts, setScripts ] = React.useState([])
  const [ key, setKey ] = React.useState('')

  const handleScripts = (value) => setScripts(value)

  const handleKey = (key) => setKey(key)

  useEffect(() => handleScripts(readJSON('API')), [])

  useEffect(() => {
    if (view === 'List') handleScripts(readJSON('API'))
  }, [view])

  return (
    <>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
        style={{ overflowY: `${view === 'List' ? 'scroll' : 'hidden'}` }}
      >
        <div className={classes.drawerHeader} />
        {view === 'Home' ? '' : ''}
        {view === 'Strings' ? <EncryptText /> : ''}
        {view === 'New' ? <Editor handleView={handleView} /> : ''}
        {view === 'Edit' ? <Editor skey={key} handleView={handleView} /> : ''}
        {view === 'List' ? <ListScripts scripts={scripts} handleScripts={handleScripts} view={view} handleView={handleView} handleKey={handleKey}  /> : ''}
        {view === 'Amp' ? <AmpValidator /> : ''}
      </main>
    </>
  )
}

export default Body