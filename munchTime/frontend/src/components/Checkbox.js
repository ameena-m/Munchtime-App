import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

var vegetarian = false;
var vegan = false;
var pescatarian = false;
var gluten = false;
var lactose = false;
var halal = false;
var kosher = false;
var defaultOne = false;


export default function IndeterminateCheckbox() {

  const stateArray = new Array(7).fill(false)

  const handleOnChange = (position) => {
    if (!stateArray[position]) {
      stateArray[position] = true;
      console.log("clicked!");
      switch(position){
        case 0:
          vegetarian = true; break;
        case 1:
          vegan = true; break;
        case 2:
          pescatarian = true; break;
        case 3:
          gluten = true; break;
        case 4:
          lactose = true; break;
        case 5:
          kosher = true; break;
        case 6:
          halal = true; break;
        default:
          defaultOne = true; break;
      }
    } else {
      stateArray[position] = false;
      console.log("Not clicked!");
      switch(position){
        case 0:
          vegetarian = false; break;
        case 1:
          vegan = false; break;
        case 2:
          pescatarian = false; break;
        case 3:
          gluten = false; break;
        case 4:
          lactose = false; break;
        case 5:
          kosher = false; break;
        case 6:
          halal = false; break;
        default:
          defaultOne = false; break;
      }
    }
  };
    
    const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        <FormControlLabel
        label="Vegetarian"
        control={<Checkbox onChange={() => handleOnChange(0)}/>}
      />
      <FormControlLabel
        label="Vegan"
        control={<Checkbox onChange={() => handleOnChange(1)}/>}
      />
      <FormControlLabel
        label="Pescatarian"
        control={<Checkbox onChange={() => handleOnChange(2)}/>}
      />
      <FormControlLabel
        label="Gluten free"
        control={<Checkbox onChange={() => handleOnChange(3)}/>}
      />
      <FormControlLabel
        label="Lactose Intolerant"
        control={<Checkbox onChange={() => handleOnChange(4)}/>}
      />
      <FormControlLabel
        label="Halal"
        control={<Checkbox onChange={() => handleOnChange(5)}/>}
      />
      <FormControlLabel
        label="Kosher"
        control={<Checkbox onChange={() => handleOnChange(6)}/>}
      />
    </Box>
  )

  return (
    <div>
      {children}
    </div>
  )

};