import React, { useState } from "react";
import Postlist from "./components/Postlist";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
//import ClassCounter from "./components/ClassCounter";
//import Counter from "./components/Counter";
import './styles/App.css'

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: 'Javascript', body: 'Description' },
    { id: 2, title: 'Javascript 2', body: 'Description' },
    { id: 3, title: 'Javascript 3', body: 'Description' }
  ])

  const [post, setPost] = useState({title: '', body: ''}) // способ сделать инпут управляемым для передачи значений инпутов

  // const bodyInputRef = useRef() // способ получить данные из неуправляемого инпута

  const addNewPost = (event) => {
    event.preventDefault()
    setPosts([...posts, { ...post, id: Date.now() }])
    setPost({title: '', body: ''}) // очищаем поля при создании нового поста
  }

  return (
    <div className="App">
      <form>
        {/* Управляемый компонент */}
        <MyInput
          value={post.title}
          onChange={event => setPost({...post, title: event.target.value})}
          type="text"
          placeholder="Название поста"
        />

        <MyInput
          value={post.body}
          onChange={event => setPost({...post, body: event.target.value})}
          type="text"
          placeholder="Описание поста"
        />

        {/* Неуправляемый/неконтролируемый компонент */}
        {/* <MyInput
          ref={bodyInputRef}
          type="text"
          placeholder="Описание поста"
        /> */}
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <Postlist posts={posts} title="Посты про JS" />
    </div>

  );
}

export default App;
