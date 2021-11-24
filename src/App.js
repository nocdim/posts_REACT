import React, { useState } from "react";
import PostForm from "./components/Postform";
import Postlist from "./components/Postlist";
import MyInput from "./components/UI/input/MyInput";
import MySelect from "./components/UI/select/MySelect";

//import ClassCounter from "./components/ClassCounter";
//import Counter from "./components/Counter";
import './styles/App.css'

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: 'yuh', body: 'xx' },
    { id: 2, title: 'bruh', body: 'qq' },
    { id: 3, title: 'naniu', body: 'jj' }
  ])

  const [selectedSort, setSelectedSort] = useState('') //реализуем двустороннее связывание / делаем компонент упарвляемым
  const [searchQuery, setSearchQuery] = useState('')

  function getSortedPosts() {
    console.log('bruh')
    if(selectedSort){
      return [...posts].sort((a,b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return posts
  }

  const sortedPosts = getSortedPosts()
  // const bodyInputRef = useRef() // способ получить данные из неуправляемого инпута
  // создание поста
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }
  // получаем  post из дочернего элемента (удаление)
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }
 // сортировка
  const sortPosts = (sort) => {
    setSelectedSort(sort)
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      {/* Сортировка */}
      <hr style={{margin: '15px 0'}} />
      <div>
        <MyInput 
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Поиск" 
        />
        <MySelect
            value={selectedSort}
            onChange={sortPosts}
            defaultvalue="Сортировка"
            options={[
              {value: 'title', name: 'По названию'},
              {value: 'body', name: 'По описанию'}
            ]}
        />
      </div>
      {/* Условная отрисовка */}
      {posts.length !== 0
        ? <Postlist remove={removePost} posts={sortedPosts} title="Посты про JS" /> /* тернарный оператор. если постов нет, то выдаем h1 */
        : <h1 style={{textAlign: 'center'}}>Посты не найдены!</h1>
      }
    </div>

  );
}

export default App;
