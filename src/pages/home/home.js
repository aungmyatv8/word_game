import React, { useEffect, useState } from "react";
import { Title, Center, Loader } from "@mantine/core";
// import jwt_decode from "jwt-decode";
import { useStyles } from "./home-style";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {setData} from '../../reducers/user'
import axios from "axios";

const Home = () => {
  // const [loading, setLoading] = useState(true);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [googleLoader, changeGoogleLoader] = useState(false)

 const SERVER_UL =  "http://localhost:4000"



  useEffect(() => {
    const handleCallbackResponse = async (response) => {
      // const userObject = jwt_decode(response.credential);
      // console.log("rspon", response.credential)
      navigate("/find") 
     
  
      const result = await axios.post(`${SERVER_UL}/create_login`, {}, {
        headers: {
          Authorization: response.credential
        },
        
      }, {
        withCredentials: true
      })
  
      dispatch(setData({token: response.credential, user: {...result.data}}))
  
      // console.log("Encoded JWT", userObject);
    };
    //

    const accounts = window.google ? window.google : null;

    if(accounts) {
      changeGoogleLoader(true)
      window.google.accounts.id.initialize({
        client_id:
          "286833238810-a9nn4u2imlfb011oisnoitb64b9otvm3.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
    
      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {
          size: "large",
        }
      );
     
    }
   
  }, [googleLoader, dispatch, navigate]);

  return googleLoader ? <div className={classes.background}>
  <Center>
    <div className={classes.form}>
      <Title className={classes.title}>Let's get started</Title>
      <div
        id="signInDiv"
        style={{
          width: "300px",
          textAlign: "center",
        }}
      ></div>
    </div>
  </Center>
</div> : <Loader />
};

export default Home;
