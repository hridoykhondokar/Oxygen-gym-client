import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../App';
import Header from '../Header/Header';
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



const Orders = () => {
    
    const [loggedInUser, setLoggedInUser] = useContext(ProductContext);
    const [orders, setOrder] = useState([]);
    
    useEffect(() => {
        fetch('https://damp-ocean-11265.herokuapp.com/products?email='+loggedInUser.email,{
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => setOrder(data))
    }, [loggedInUser.email]);
    const classes = useStyles();
     
    return (
        <div>
            <Header></Header>
            <div style={{'text-align' : 'center'}}>
            <h1>Hello Mr.{loggedInUser.name}</h1>
            <p>Your have {orders.length} Order </p>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: '700' }}>Date</TableCell>
                            <TableCell style={{ fontWeight: '700' }}>Product Name</TableCell>
                            <TableCell style={{ fontWeight: '700' }}>Product Price</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orders.map(order => (
                                <TableRow>
                                    <TableCell>{new Date(order.orderTime).toDateString('dd/MM/yyyy')}</TableCell>
                                    <TableCell>{order.ProductName}</TableCell>
                                    <TableCell>{order.price}</TableCell>

                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
};

export default Orders;