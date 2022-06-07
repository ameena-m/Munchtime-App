import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

 const style = {
   width: '100%',
   maxWidth: 360,
   bgcolor: 'background.paper',
 };




export default function ListDividers(props) {
  const items = props.items

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  var lunch_array = new Array(7)
  var dinner_array = new Array(7)
  var breakfast_array = new Array(7)

  const [open, setOpen] = React.useState(new Array(lunch_array.length).fill(false));

  const handleClickOpen = (position) => {
    const updateCheckedState = open.map((item, index) =>
      index === position ? item=true : item
    );
    setOpen(updateCheckedState);
  };

  const handleClose = (position) => {
    const updateCheckedState = open.map((item, index) =>
      index === position ? item=false : item
    );
    setOpen(updateCheckedState);
  };



  console.log(breakfast_array);
  const buttonPressed = props.buttonPressed
  const justChecking = JSON.stringify(items);
  const days_array = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  
  var index = 0
  for (var i = 0; i < items.length; i++) {
    if(index<7 && items[i].mealType=="B"){
      var object = items[i];
      breakfast_array[index] = object;
      index = index + 1;
    }
  }

  index = 0
  for (var i = 0; i < items.length; i++) {
    if(index<7 && items[i].mealType=="L"){
      var object = items[i];
      lunch_array[index] = object;
      index = index + 1;
    }
  }

  index = 0
  for (var i = 0; i < items.length; i++) {
    if(index<7 && items[i].mealType=="D"){
      var object = items[i];
      dinner_array[index] = object;
      index = index + 1;
    }
  }

 

  
  // Breakfast function
  const TestBreakfast = ({listItems}) => (
    <div>
      {listItems.map((item, index) => index < 7 && (
        <div className="item" key={item.id}>
           <h3>{days_array[index]} - {item.mealType}reakfast</h3><ListItem button>
            <ListItemText primary={item.name} onClick={() => handleClickOpen(index)} />
            </ListItem>
            <Divider />
            <Dialog
        open={open[index]}
        TransitionComponent={Transition}
        onClick={() => handleClose(index)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Go to recipe for {item.name}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <a href={item.linkToInstructions}>{item.linkToInstructions}</a>
            <h4>-</h4>
            <h4>Ingredients:</h4>
            <h4>{item.ingredients.join("        -       ") + "     -    "}</h4>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClose={() => handleClose(index)}>Close</Button>
        </DialogActions>
      </Dialog>
        </div>
      ))}
    </div>
  );

  // Lunch function
  const TestLunch = ({listItems}) => (
    <div>
      {listItems.map((item, index) => index < 7 && (
        <div className="item" key={item.id}>
           <h3>{days_array[index]} - {item.mealType}unch</h3><ListItem button>
            <ListItemText primary={item.name} onClick={() => handleClickOpen(index)}/>
            </ListItem>
            <Divider />
            <Dialog
        open={open[index]}
        TransitionComponent={Transition}
        onClose={() => handleClose(index)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Go to recipe for {item.name}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <a href={item.linkToInstructions}>{item.linkToInstructions}</a>
            <h4>-</h4>
            <h4>Ingredients:</h4>
            <h4>{item.ingredients.join("        -       ") + "     -    "}</h4>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(index)}>Close</Button>
        </DialogActions>
      </Dialog>
        </div>
      ))}
    </div>
  );


  // Dinner function
  const TestDinner = ({listItems}) => (
    <div>
      {listItems.map((item, index) => index < 7 && (
        <div className="item" key={item.id}>
           <h3>{days_array[index]} - {item.mealType}inner</h3><ListItem button>
            <ListItemText primary={item.name} onClick={() => handleClickOpen(index)} />
            </ListItem>
            <Divider />
            <Dialog
        open={open[index]}
        TransitionComponent={Transition}
        onClose={() => handleClose(index)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Go to recipe for {item.name}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <a href={item.linkToInstructions}>{item.linkToInstructions}</a>
            <h4>-</h4>
            <h4>Ingredients:</h4>
            <h4>{item.ingredients.join("        -       ") + "     -    "}</h4>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(index)}>Close</Button>
        </DialogActions>
      </Dialog>
        </div>
      ))}
    </div>
  );
  
  let toReturn;
  if (buttonPressed=="B"){
    toReturn = <TestBreakfast listItems={breakfast_array} />
  }
  else if (buttonPressed=="L"){
    toReturn = <TestLunch listItems={lunch_array}/>
  
  }
  else if (buttonPressed=="D"){
    toReturn = <TestDinner listItems={dinner_array}/>
  }



  return (
    <List sx={style} component="nav" aria-label="mailbox folders" align = "left">
      {toReturn}
    </List>
    
  )


}
