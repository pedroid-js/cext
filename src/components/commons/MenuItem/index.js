import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'

const MenuObject = ({handleClick, name, value}) => {
  return (
    <>
      <MenuItem aria-valuetext={value} onClick={handleClick}>{name}</MenuItem>
    </>
  )
}

export default MenuObject