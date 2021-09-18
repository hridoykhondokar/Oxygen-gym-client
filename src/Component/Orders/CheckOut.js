import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { ProductContext } from '../../App';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const CheckOut = () => {
    const { id } = useParams();
    const [selectProduct, setSelectProduct]=useState([]);
    const classes = useStyles();
    const [loggedInUser, setLoggedInUser] = useContext(ProductContext)
    useEffect(() => {
        fetch('https://damp-ocean-11265.herokuapp.com/singleProduct/' + id, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => setSelectProduct(data))
    }, [id]);

    const history = useHistory()

    const handleCheckOut = () => {
        const productData = {...loggedInUser, ProductName: selectProduct.name, price: selectProduct.price, orderTime: new Date() }
        fetch('https://damp-ocean-11265.herokuapp.com/productDetails',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(productData)
            
        })
        .then(res => {
            res.json()
            if(res.status === 200){
                history.push('/orders')
            }
            else{
                alert('data not found')
            }
        });

    };

    return (
        <div>
            <Header></Header>
            <h3 className='text-center mb-3'>Check out</h3>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: '700' }}>product Name</TableCell>
                            <TableCell style={{ fontWeight: '700' }}>Price (Tk)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            <TableCell>{selectProduct.name}</TableCell>
                            <TableCell>{selectProduct.price}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <div className='d-flex justify-content-center align-items-center'>
                <Button onClick={handleCheckOut} size='small' variant='contained' color='secondary'>save</Button>
        </div>
        </div>
    );
};

export default CheckOut;