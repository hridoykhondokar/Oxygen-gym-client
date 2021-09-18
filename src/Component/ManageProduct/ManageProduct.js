import React, { useEffect, useState } from 'react';
import AdminMenu from '../Admin/AdminMenu';
import './ManageProduct.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        fetch('https://damp-ocean-11265.herokuapp.com/getProduct')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[]);

      const deleteProduct = (id) => {
        fetch(`https://damp-ocean-11265.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                console.log('delete successfully');
            })
    };

    const classes = useStyles();
    return (
        <div className="admin-dash">
            <AdminMenu></AdminMenu>
            <div className="manageProduct">
                <h1>Manage Product</h1>
                
                <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">delete</TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((products) => (
            <TableRow key={products.name}>
              <TableCell component="th" scope="row">
                {products.name}
              </TableCell>
              <TableCell align="right">{products.price}</TableCell>
              <TableCell align="right"><button type="" onClick={() => deleteProduct(products._id)} >delete</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


            </div>
        </div>
    );
};

export default ManageProduct;