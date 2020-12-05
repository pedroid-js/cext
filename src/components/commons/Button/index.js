import React from 'react'
import Button from "@material-ui/core/Button";

const ButtonInput = ({ 
  handleClick,
  color = "primary", 
  children, 
  icon, 
  className 
}) => 
  <Button
    variant="contained"
    color={color}
    onClick={handleClick}
    startIcon={icon ? icon : ''}
    className={className}
  >
    {children}
  </Button>

export default ButtonInput