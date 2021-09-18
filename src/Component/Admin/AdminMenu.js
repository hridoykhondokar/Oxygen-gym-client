import React from 'react';
import { Link } from "react-router-dom";
import Icon from '@material-ui/core/Icon';

const AdminMenu = () => {
    return (
        <div className="admin-menu">
            <nav >
                <h1>Oxygen Gym</h1>
            <div className='dash-items'>
            <li><Link to="/manageProduct"><Icon fontSize="small">add_circle</Icon> Manage Product</Link></li>
            <li><Link to="/addProduct"><Icon fontSize="small">add_circle</Icon> Add Product</Link></li>
            <li><Link to="/"><Icon fontSize="small">add_circle</Icon> Home</Link></li>
            </div>
            
            </nav>
        </div>
    );
};

export default AdminMenu;