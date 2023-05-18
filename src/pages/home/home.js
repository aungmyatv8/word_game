import React, { useEffect } from "react";
import { Title, Center } from "@mantine/core";
import jwt_decode from "jwt-decode";
import { useStyles } from "./home-style";

const Home = () => {
  const { classes } = useStyles();

  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);
    console.log("Encoded JWT", userObject);
  };

  useEffect(() => {
    //
    // localStorage.setItem('items', JSON.stringify(items));
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
  }, []);

  return (
    <div className={classes.background}>
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
    </div>
  );
};

export default Home;
