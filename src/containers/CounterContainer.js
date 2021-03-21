import React, { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Counter from '../components/Counter';
import { increment, decrement } from '../modules/counter';


const CounterContainer = () => {
    const counter = useSelector(state => state.counter, []);
    // const { onIncrease, onDecrease}  = useActions({
    //     onIncrease : increment,
    //     onDecrease : decrement,
    // })
    const dispatch = useDispatch();
    const onIncrease = useCallback(() => (
        dispatch(increment())
    ), [dispatch])
    const onDecrease = useCallback(() => (
        dispatch(decrement())
    ), [dispatch])


    return <Counter number={counter} onIncrease={onIncrease} onDecrease={onDecrease}/>
}

export default CounterContainer 