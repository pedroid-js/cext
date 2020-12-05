import React from 'react'
import classNames from 'classnames';
import useTheme from '@material-ui/core/styles/useTheme';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import AddIcon from '@material-ui/icons/Add';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import { useStyles } from './styles'

const Header = ({
  handleClose,
  handleView,
  handleTheme,
  open,
  view,
  themes
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const icon = !themes ? <Brightness7Icon /> : <Brightness3Icon />
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, open && classes.appBarShift)}
        style={{ backgroundColor: `${themes ? '#3f51b5' : '#424242'}` }}
      >
        <Toolbar disableGutters={!open}>
          <Typography variant="title" color="inherit" noWrap className={classes.menuButton}>
            {view}
          </Typography>
          <div className={classes.push}/>
          <IconButton onClick={() => handleTheme()} className={classes.paddingButton}>
            {icon}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        open={open}
        classes={{
          paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => handleClose()} className={classes.paddingButton}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['List', 'New', 'Strings', 'Amp'].map((text, index) =>
            <div style={{ display: "block", width: "100%" }}>
              <IconButton key={index} onClick={() => handleView(text)} className={classes.paddingButton}>
                {text === 'List' ? <HomeIcon /> : ''}
                {text === 'New' ? <AddIcon /> : ''}
                {text === 'Strings' ? <EnhancedEncryptionIcon /> : ''}
                {text === 'Amp' ? <AmpStoriesIcon /> : ''}
              </IconButton>
            </div>
          )}
        </List>
      </Drawer>
    </>
  )
}

export default Header
