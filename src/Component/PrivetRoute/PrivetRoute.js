import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ProductContext } from '../../App';

const PrivetRoute = ({children, ...rest}) => {
    const [loggedInUser, setLoggedInUser] = useContext(ProductContext)
    return (
        <Route
        {...rest}
        render={({ location }) =>
        loggedInUser.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivetRoute;