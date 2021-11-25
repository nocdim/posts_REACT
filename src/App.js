import React, { useMemo, useState } from "react";
import PostFilter from "./components/Postfilter";
import PostForm from "./components/Postform";
import Postlist from "./components/Postlist";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/modal/MyModal";


//import ClassCounter from "./components/ClassCounter";
//import Counter from "./components/Counter";
import './styles/App.css'

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: 'yuh', body: 'xx' },
    { id: 2, title: 'bruh', body: 'qq' },
    { id: 3, title: 'naniu', body: 'jj' }
  ])

  //реализуем двустороннее связывание / делаем компонент упарвляемым
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)

  // хук useMemo

  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])


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
