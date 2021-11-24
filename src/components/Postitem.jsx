import React from "react";
import MyButton from "./UI/button/MyButton";

const Postitem = (props) => { // компонент-функция, которая возвращает JSX
    return (
        <div className="post">
        <div className="post__content">
          <strong>{props.number} {props.post.title}</strong>
          <div>
          {props.post.body}
          </div>
        </div>
        <div>
          <MyButton onClick={() => props.remove(props.post)}>Удаление</MyButton>
        </div>
      </div>
    )
}

export default Postitem