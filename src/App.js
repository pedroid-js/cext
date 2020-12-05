import React from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { dark, light } from './assets/theme'
import { saveJSON, readJSON } from './controllers/storage'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  }
}));

const App = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)
  const [view, setView] = React.useState('List') 
  const [themes, setThemes] = React.useState(true)

  const appliedTheme = createMuiTheme(themes ? light : dark)

  const handleTheme = () => setThemes(!themes)

  const handleDrawerOpen = () => setOpen(true)

  const handleDrawerClose = () => setOpen(false)

  const handleView = (view) => setView(view)

  React.useEffect(() => {
    const TH = readJSON('THEME')
    TH.forEach(item => {
      setThemes(item.theme)
    })
  }, [])

  React.useEffect(() => {
    saveJSON('THEME', [{ theme: themes }])
  }, [themes])
  
  return (
    <ThemeProvider theme={appliedTheme}>
      <div className={classes.root}>
        <Header 
          handleOpen={handleDrawerOpen}
          handleClose={handleDrawerClose}
          handleView={handleView}
          open={open}
          view={view}
          handleTheme={handleTheme}
          themes={themes}
        />
        <Body 
          handleView={handleView}
          open={open}
          view={view}
        />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App