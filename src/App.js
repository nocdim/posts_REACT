import React, { useEffect, useState } from "react";
import PostService from "./API/PostService";
import PostFilter from "./components/Postfilter";
import PostForm from "./components/Postform";
import Postlist from "./components/Postlist";
import MyButton from "./components/UI/button/MyButton";
import Loader from "./components/UI/Loader/Loader";
import MyModal from "./components/UI/modal/MyModal";
import { usePosts } from "./hooks/usePosts.jsx";
import { useFetching } from "./hooks/useFetching";


//import ClassCounter from "./components/ClassCounter";
//import Counter from "./components/Counter";
import './styles/App.css'

function App() {

  const [posts, setPosts] = useState([])

  //реализуем двустороннее связывание / делаем компонент упарвляемым
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [fetchPosts, arePostsLoading, postError] = useFetching( async () => {
    const posts = await PostService.getAll()
    setPosts(posts)
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  // запрос на сервер

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
      {postError &&
        <h1 style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>Произошла ошибка - {postError}</h1>
      }
      {arePostsLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader /></div>
        : <Postlist remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
      }
    </div>
  );
}

export default App;
