import React, { useState } from "react";

const Counter = () => { // компонент-функция, которая возвращает JSX
    const [count, setCount] = useState(0)  //деструктизация useState (1 параметр - переменная, 2 - функция)

    function increment(){
        setCount(count + 1)
    }

    function decrement(){
        setCount(count - 1)
    }

    return (
        <div>
            <h1>{count}</h1> {/* Передаем переменную count, которая = 0 по умолчанию */}
            <button onClick={increment}>Increase</button>
            <button onClick={decrement}>Decrease</button>
        </div>
    )
}

export default Counter