import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SingleProduct from './SingleProduct';
import './Home.css';



const Home = () => {
    const [products, setProducts] = useState([]);


    

    useEffect(()=>{
        fetch('https://damp-ocean-11265.herokuapp.com/getProduct')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[]);


    return (
        <div> 
            <Header></Header>
            <div className='container singleProduct'>
                <div className='row'>
                   {
                    products.map(pd =>
                         <SingleProduct pd={pd} key={pd._id} >

                         </SingleProduct>)
                   } 
                   
                </div>
            </div>
        </div>
    );
};

export default Home;