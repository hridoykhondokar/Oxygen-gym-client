import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AdminMenu from '../Admin/AdminMenu';

const AddProduct = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState(null);
  
     
    const onSubmit = data => {
        const productData = {
              name: data.name,
              price: data.price,
              imageURL: imageURL
        }
        

         fetch('https://damp-ocean-11265.herokuapp.com/addProduct',{
          method: 'POST',
          headers: {
               'content-Type': 'application/json'
          },
          body: JSON.stringify(productData)
         })
         .then(response => console.log(response));
    };

   
    const handleImageUpload = (event) => {
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', 'f20ae2939d4d481ae3c9d8168dbd84d2');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div className="admin-dash">
            <AdminMenu></AdminMenu>
            <div className="manageProduct">
                     
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Add Your Product</h1>
                    <input type='text' placeholder="Name" className='form-control'  {...register("name")} />
                    <br/><br/>
                    <input type='text' placeholder="Price" className='form-control' {...register("price")}/>
                    <br/><br/>
                    <input type='file' onChange={handleImageUpload} />
                    <br/><br/><br/>
                    <input style={{'background-color' : 'green', 'color': 'white'}} disabled={imageURL ? false : true} type="submit" />
                </form>

            </div>
        </div>
    );
};

export default AddProduct;