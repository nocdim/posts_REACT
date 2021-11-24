import React from "react"
import MyButton from "./UI/button/MyButton"
import MyInput from "./UI/input/MyInput"
import { useState } from "react"

const PostForm = ({create}) => {
    const [post, setPost] = useState({ title: '', body: '' }) // способ сделать инпут управляемым для передачи значений инпутов

    const addNewPost = (event) => {
        event.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: ''}) // очищаем поля при создании нового поста
      }

    return (
        <form>
            {/* Управляемый компонент */}
            <MyInput
                value={post.title}
                onChange={event => setPost({ ...post, title: event.target.value })}
                type="text"
                placeholder="Название поста"
            />

            <MyInput
                value={post.body}
                onChange={event => setPost({ ...post, body: event.target.value })}
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
    )
}

export default PostForm