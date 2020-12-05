import React from 'react'
import Menu from '@material-ui/core/Menu'
import PopupState, { bindTrigger, bindMenu, anchorRef } from 'material-ui-popup-state';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

const MenuPopUp = ({ children }) => {
  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <IconButton 
              variant="contained"
              color="primary"
              {...bindTrigger(popupState)}
            >
            <MoreVertIcon />
            </IconButton>
            <Menu {...bindMenu(popupState)} onClick={popupState.close}>
              {children}
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </>
  )
}

export default MenuPopUp