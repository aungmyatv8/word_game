import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {Loader} from '@mantine/core'



const Protected = (props) => {
    
    const navigate = useNavigate()
    const userState = useSelector((state) => state.user);
    const [loading, setLoading ] = useState(true)
    // console.log("userState", userState);
    
  
    useEffect(() => {
        const route = () => {
            if(!userState.token) {
                navigate("/") 
                
                return;
            }
            return setLoading(false)
          
        }
        return route()
    }, [userState, navigate, props.children])


  

    // return userState.accessToken ? <React.Fragment>{props.children}</React.Fragment> : <Loader />
    return loading ? <Loader /> : <React.Fragment>{props.children}</React.Fragment>
}


export default Protected;