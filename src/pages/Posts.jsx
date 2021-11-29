import React, { useEffect, useRef, useState } from "react";
import PostService from "../API/PostService.js";
import PostFilter from "../components/Postfilter";
import PostForm from "../components/Postform";
import Postlist from "../components/Postlist";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/Loader/Loader";
import MyModal from "../components/UI/modal/MyModal";
import { usePosts } from "../hooks/usePosts.js";
import { useFetching } from "../hooks/useFetching.js";
import { getPageCount } from "../utils/pages.js";
import '../styles/App.css'
import Pagination from "../components/UI/pagination/Pagination.jsx";
import { useObserver } from "../hooks/useObserver.js";
import MySelect from "../components/UI/select/MySelect.jsx";

function Posts() {

  const [posts, setPosts] = useState([])

  //реализуем двустороннее связывание / делаем компонент упарвляемым
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const lastElement = useRef()

  const [fetchPosts, arePostsLoading, postError] = useFetching( async (limit, page) => {
    const response = await PostService.getAll(limit, page)
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit)) // пагинация
  })

  useObserver(lastElement, page < totalPages, arePostsLoading, () => {
    setPage(page + 1)
  })


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

  //пагинация

  

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const changePage = (page) => {
    setPage(page)
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
      <MySelect 
      value={limit} 
      onChange={value => setLimit(value)} 
      defaultvalue="Кол-во элементов на странице" 
      options={[
        {value: 5, name: '5'},
        {value: 10, name: '10'},
        {value: 25, name: '25'},
        {value: -1, name: 'Показать всё'}
      ]} />
      {/* Условная отрисовка */}
      {postError &&
        <h1 style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>Произошла ошибка - {postError}</h1>
      }
      <Postlist remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
      <div ref={lastElement} style={{height: 20}} />

      
      {arePostsLoading &&
         <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader /></div>
      }
      <Pagination 
      page={page} 
      changePage={changePage} 
      totalPages={totalPages}
      />
    </div>
  );
}

export default Posts;
