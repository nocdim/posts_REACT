import React from "react";

class ClassCounter extends React.Component { // компонент-класс

    // состояния создается по-другому в отличие от компонента-функции

    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
    }

    increment(){
        this.setState({
            count: this.state.count + 1
        })
    }

    decrement(){
        this.setState({
            count: this.state.count - 1
        })
    }

    render() {
        return (
        <div>
            <h1>{this.state.count}</h1> {/* Передаем переменную count, которая = 0 по умолчанию */}
            <button onClick={this.increment}>Increase</button>
            <button onClick={this.decrement}>Decrease</button>
        </div>
        )
    }
}

export default ClassCounter