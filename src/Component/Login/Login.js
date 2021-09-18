import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import { ProductContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css';

firebase.initializeApp(firebaseConfig);




const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    })
    const [loggedInUser, setLoggedInUser] = useContext(ProductContext);

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(result => {
                const { displayName, photoURL, email } = result.user;
                const signInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signInUser);
                setLoggedInUser(signInUser);
                history.replace(from);
                console.log(displayName, photoURL, email)
            })
            .catch(error => {
                console.log(error);
                console.log(error.massage);
            })
    };

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(result => {
                const signInOut = {
                    isSignIn: false,
                    name: '',
                    email: '',
                    photo: ''
                }
                setUser(signInOut);
                setLoggedInUser(signInOut);
            })
            .catch((error) => {

            });
    };

    const handleBlur = (event) => {
        let isFieldValid = true;

        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        };

        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        };

        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo)
        };
    };

    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(result => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch(error => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        if (!newUser && user.email && user.password) {

            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(result => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch(error => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        event.preventDefault();
    };

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(() => {
          console.log(' name update successfully');
        }).catch((error) => {
            
        });
    }



    return (
        <div>
            <Header></Header>
            <div className='loginPage'>
            {
                user.isSignIn ? <button onClick={handleSignOut}>Sign Out </button> :
                    <button onClick={handleSignIn}>Sign In </button>
            }

            <h1>Our won Authentication</h1>
            <form onSubmit={handleSubmit}>
                {
                    newUser && <input type="text" onBlur={handleBlur} name="name" placeholder='Your Name' />
                }
                <br />
                <input type='text' onBlur={handleBlur} name='email' placeholder='Your Email address' required />
                <br />
                <input type='password' onBlur={handleBlur} name='password' placeholder='Your Password' required />
                <br />
                <input type='submit' value={newUser ? 'Sign Up' : 'Sign In'} />

            </form>
            <p style={{ color: " red" }}>{user.error}</p>
            {
                user.success && <p style={{ color: "green" }}> User {newUser ? 'created' : 'Logged In'} successfully</p>
            }
            {
                !newUser ? <small>Don't have an account ? <strong style={{ fontSize: '1rem', cursor: 'pointer' }} onClick={() => setNewUser(!newUser)}>Create an account</strong> </small> : <small>Already has an account ? <strong style={{ fontSize: '1rem', cursor: 'pointer' }} onClick={() => setNewUser(!newUser)}>Login</strong> </small>
            }
            </div>
        </div>
    );
};

export default Login;