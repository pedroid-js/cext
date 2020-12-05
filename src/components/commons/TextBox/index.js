import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField'
import makeStyles from "@material-ui/core/styles/makeStyles";

const style = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const TextBox = ({handleChange, id, label, value, disabled}) => {
  const classes = style()
  return (
    <FormControl className={classes.formControl}>
      <TextField 
        id={id} 
        label={label} 
        onChange={handleChange} 
        value={value}
        disabled={disabled}
      />
    </FormControl>
  )
}

export default TextBox