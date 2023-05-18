import React, {useEffect} from 'react';
import {Title} from '@mantine/core'
import jwt_decode from 'jwt-decode'

const Home = () => {

    const handleCallbackResponse = (response) => {

        const userObject =  jwt_decode(response.credential)
                console.log("Encoded JWT", userObject)
    }

    useEffect(() => {
        // 
        // localStorage.setItem('items', JSON.stringify(items));
        window.google.accounts.id.initialize({
            client_id: "286833238810-a9nn4u2imlfb011oisnoitb64b9otvm3.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        window.google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {
                theme: "outline", size: "large"
            }
        )
    }, [])

    return <div>
        <Title>Home</Title>
        <div id="signInDiv">

        </div>
    </div>
}

export default Home;