import React from 'react'
import { Button } from "@material-ui/core";
import './login.css'
import {auth,provider} from './firebase';
import {actionTypes} from "./reducer";
import {useStateValue} from "./StateProvider";
function Login() {
    const [{},dispatch]=useStateValue();
    const signIn=()=>{
            auth.signInWithPopup(provider)
            .then((result)=> {
                dispatch(
                    {
                        type: actionTypes.SET_USER,
                        user:result.user,
                    }
                )
            })
           .catch((error)=>alert(error.message));
    };
    return (
        <div className="login">
            <div className="login_div">
                <img src="./Img/—Pngtree—whatsapp icon design vector_4949781.png"/>
                <h1>Login Page</h1>
                <div className="login_text">
                </div>
                <div className="btn"> 
                    <Button onClick={signIn}>
                    sign in with google
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default Login
