import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const style = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectBox = ({handleChange, value , values, label}) => {
  const classes = style()
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
      >
        {values && Array.isArray(values) ? values.map((item, index) => <MenuItem key={index} value={item.value}>{item.value}</MenuItem>) : ''}
      </Select>
    </FormControl>
  )
}

export default SelectBox