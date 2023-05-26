import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {changeTime} from '../../reducers/game'

const CountDown = () => {
    const gameState = useSelector((state) => state.game);
    const dispatch = useDispatch();


    // const [countdown, setCoundown] = useState(70);
    const timerId = useRef()

    useEffect(() => {
        timerId.current = setInterval(() => {
         
            // setCoundown(prev => prev - 1)
            dispatch(changeTime(gameState.time - 1))
        }, 1000)
        return () => clearInterval(timerId.current);
    }, [gameState.time, dispatch])


    useEffect(() => {
        if(gameState.time <= 0) {
            clearInterval(timerId.current)
        }
    }, [gameState.time])

    return (
        <h2>CountDown : {gameState.time}</h2>
    )
}

export default React.memo(CountDown);