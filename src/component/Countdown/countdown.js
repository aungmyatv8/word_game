import React, {useEffect, useRef, useState} from 'react';

const CountDown = () => {
    const [countdown, setCoundown] = useState(6);
    const timerId = useRef()

    useEffect(() => {
        timerId.current = setInterval(() => {
         
            setCoundown(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timerId.current);
    }, [])


    useEffect(() => {
        if(countdown <= 0) {
            clearInterval(timerId.current)
        }
    }, [countdown])

    return (
        <h2>CountDown : {countdown}</h2>
    )
}

export default CountDown;