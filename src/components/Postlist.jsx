import React from "react";
import Postitem from "./Postitem";

const Postlist = ({posts, title}) => { // компонент-функция, которая возвращает JSX
    return (
       <div> 
      <h1 style={{textAlign: "center"}}>{title}</h1>
      {posts.map((post, index) =>
        <Postitem number={index + 1} post={post} key={post.id} />
        )}
    </div>
    )
}

export default Postlist