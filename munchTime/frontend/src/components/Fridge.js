import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";

export default function Users() {
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [county, setCounty] = useState('');
  const handleClickOpen = (item) => {
    // setCurrentItem(item)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [tableData, setTableData] = useState([{itemsInFridge: {id: 1, name: 'beef'}}]);

  const getTableData = () => {
    const requestCalendarFill = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('/api/get-fridge', requestCalendarFill)
      .then((response) => response.json())
      .then((json) => {
        console.log("aaa = ", JSON.stringify(json))
        setTableData(json);
      })
    // axios.get("/app/getUserList").then((res) => {
    //   if (res.data.code == -1) {
    //     alert(res.data.msg)
    //   } else {
    //     console.log("user res = ", res)
    //     setTableData(res.data.data)
    //   }
    // }).catch(() => {
    //   alert("server is error")
    // })
  }

  useEffect(() => {
    getTableData();
  }, [])



  return (
    <div style={{
      padding: 30
    }}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Food</DialogTitle>
        <DialogContent>
          <TextField
            style={{
              width: '400px'
            }}
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            label="name"
          />
          <TextField
            style={{
              width: '400px'
            }}
            fullWidth
            variant="standard"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value)
            }}
            label="quantity"
          />
          {/* <TextField
            style={{
              width: '400px'
            }}
            fullWidth
            variant="standard"
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value)
            }}
            label="unit"
          /> */}
          <div>
            <FormControl style={{
              width: '400px'
            }} fullWidth variant="standard">
              <InputLabel id="demo-simple-select-standard-label">Unit</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value)
                }}
                label="Unit"
              >
                <MenuItem value="g">g</MenuItem>
                <MenuItem value="tbsp">tbsp</MenuItem>
                <MenuItem value="tsp">tsp</MenuItem>
                <MenuItem value="ml">ml</MenuItem>
                <MenuItem value="">null</MenuItem>
              </Select>
            </FormControl>
          </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {
            const requestfridgeFill = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                quantity,
                unit,
                itemsInFridge: name
              })
            };
            fetch('/api/create-fridge', requestfridgeFill)
              .then((response) => response.json())
              .then((json) => {
                console.log("aaa22 = ", JSON.stringify(json))
                getTableData()
                // this.setState({
                //   items: json,
                //   DataisLoaded: true
                // });
                
              })
            // edit
            // axios.post("/app/updateUser", {
            //   id: currentItem.id,
            //   name, emailaddr, age, county
            // }).then((res) => {
            //   if (res.data.code == -1) {
            //     alert(res.data.msg)
            //   } else {
            //     getTableData();
            //     setOpen(false);
            //   }
            // }).catch(() => {
            //   alert("server is error")
            // })

          }}>Enter</Button>
        </DialogActions>
      </Dialog>
      <Grid item xs ={12} align = "center">
                    <Button color = "success" variant="contained" to="/" component = {Link}>
                        Back
                    </Button>
            </Grid>
      <div>
        <Button onClick={() => {
          setOpen(true);
        }} variant="contained">Add Food</Button>
 
      </div>
      <TableContainer component={Paper}>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Ingredient</TableCell>
              <TableCell align="center">Quantity</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {tableData.map((row) => (
              <TableRow
                key={row.itemsInFridge.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.itemsInFridge.name}
                </TableCell>
                {/* <TableCell align="center">{row.ingredient}</TableCell> */}
                <TableCell align="center">{row.quantity} {row.unit}</TableCell>
                {/* <TableCell align="center">
                  <Button onClick={() => {
                    handleClickOpen(row)
                  }} style={{
                    marginRight: 20
                  }}>EDIT</Button>
                  <Button onClick={() => {
                    delete
                    axios.post("/app/deleteUser", {
                      id: row.id,

                    }).then((res) => {
                      if (res.data.code == -1) {
                        alert(res.data.msg)
                      } else {
                        getTableData();
                      }
                    }).catch(() => {
                      alert("server is error")
                    })
                  }} color="error" style={{
                    marginRight: 20
                  }}>DELETE</Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!tableData.length && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '50px 0',
          color: '#666',
          width: '100%',
          background: '#fff'
        }}>
          no data
        </div>
      )}


    </div>
  );

}