import React, { useMemo, useState } from "react";
import PostFilter from "./components/Postfilter";
import PostForm from "./components/Postform";
import Postlist from "./components/Postlist";


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
  const [filter, setFilter] = useState({sort:'' , query: ''})

  // хук useMemo

  const sortedPosts = useMemo(() => {
    if(filter.sort){
      return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]))
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
  }
  // получаем  post из дочернего элемента (удаление)
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      {/* Сортировка */}
      <hr style={{margin: '15px 0'}} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {/* Условная отрисовка */}
       <Postlist remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
         
    </div>

  );
}

export default App;
