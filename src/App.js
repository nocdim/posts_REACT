import axios from "axios";
import React, { useMemo, useState } from "react";
import PostFilter from "./components/Postfilter";
import PostForm from "./components/Postform";
import Postlist from "./components/Postlist";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/modal/MyModal";
import { usePosts } from "./hooks/usePosts";


//import ClassCounter from "./components/ClassCounter";
//import Counter from "./components/Counter";
import './styles/App.css'

function App() {

  const [posts, setPosts] = useState([])

  //реализуем двустороннее связывание / делаем компонент упарвляемым
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  // запрос на сервер
  async function fetchPosts() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    setPosts(response.data)
  }

  // const bodyInputRef = useRef() // способ получить данные из неуправляемого инпута
  // создание поста
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }
  // получаем  post из дочернего элемента (удаление)
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      {/* Сортировка */}
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {/* Условная отрисовка */}
      <Postlist remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />

    </div>

  );
}

export default App;
