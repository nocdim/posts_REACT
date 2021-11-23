import React from "react";

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
          <button>Удаление</button>
        </div>
      </div>
    )
}

export default Postitem