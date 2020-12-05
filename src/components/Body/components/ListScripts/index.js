import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import CodeIcon from '@material-ui/icons/Code'
import { useStyles } from './styles'
import { removeJSON } from '../../../../controllers/storage'
import { inject } from '../../../../controllers/inject'
import { formatDateShort } from '../../../../controllers/utils'
import Menu from '../../../commons/Menu'
import MenuItem from '../../../commons/MenuItem'

const ListScripts = ({ scripts, handleScripts, handleView, handleKey }) => {

  const classes = useStyles()

  const play = (key) => inject('API', key.target.getAttribute('aria-valuetext'))

  const handleDelete = (key) => removeJSON('API', key.target.getAttribute('aria-valuetext'), (API) => handleScripts(API))

  const editView = (key) => {
    handleKey(key.target.getAttribute('aria-valuetext'))
    handleView('Edit')
  }

  return (
    <div className={classes.root}>
      {scripts ? (
        <div className={classes.demo}>
          <List>
            {scripts.map((script) =>  (
              <>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <CodeIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={script.key}
                    secondary={`${formatDateShort(script.date, true)} ${typeof script.dateModify !== 'undefined' ? ' m.' + formatDateShort(script.dateModify, true) : ''}`}
                  />
                  <Menu>
                    {script.mode === 'javascript' ? <MenuItem value={script.key} handleClick={ play.bind() } name="Run" /> : null}
                    <MenuItem value={script.key} handleClick={ editView.bind() } name="Edit" />
                    <MenuItem value={script.key} handleClick={ handleDelete.bind() } name="Delete" />
                  </Menu>
                </ListItem>
              </>
            ))}
          </List>
        </div>
      ) : (
        <div className={classes.warning}>
          There's no scripts stored yet
        </div>
      )}
    </div>
  )
}

export default ListScripts