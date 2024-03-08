import React, { useState, useEffect } from 'react'

import s from './Favorite.module.scss'
import FavoriteItem from '../../components/FavoriteItem/FavoriteItem'

import { db } from '../../db'
import up from '../../assets/icons/up.png'
import { useAddFavoriteMutation, useDeleteFavoriteMutation, useGetDoneQuery, useGetFavoriteQuery } from '../../redux'
import Loader from '../../components/Loader/Loader'

const Favorite = () => {
  const [count, setCount] = useState(10)
  const [isVisibleUpButton, setIsVisibleUpButton] = useState(false)

  const { data: favoriteData = [], isLoading: isLoadingFavorite } = useGetFavoriteQuery()
  const [deleteFavorite] = useDeleteFavoriteMutation()

  const { data = [], isLoading: isLoadingDone } = useGetDoneQuery()

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    window.scrollTo(0, 0)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = (e) => {
    let scrollHeight = e.target.documentElement.scrollHeight
    let scrollTop = e.target.documentElement.scrollTop
    let windowHeight = window.innerHeight
    if (scrollHeight - (scrollTop + windowHeight) < 100) {
      setCount(prev => prev + 10)
    }
    scrollTop > 500 ? setIsVisibleUpButton(true) : setIsVisibleUpButton(false)
  }

  const handleDeleteFvorite = async (id) => {
    await deleteFavorite(id).unwrap()
  }

  return (
    <>
      {
        (!isLoadingFavorite && !isLoadingDone) ? <div className={s.favorite}>
          <div className={s.list}>
            {
              favoriteData.slice(0, count).map(video => {
                let done = false
                let id
                data.forEach(data => {
                  if (data.link === video.link) {
                    done = true
                    return
                  }
                });
                favoriteData.forEach(data => {
                  if (data.link === video.link) {
                    id = data.id
                    return
                  }
                })
                
                return <FavoriteItem {...video}
                  done ={done}
                  deleteFavorite={() => deleteFavorite(id)}
                />
              })
            }

          </div>
          {
        isVisibleUpButton && <div onClick={() => window.scrollTo(0, 0)} className={s.btnOnTop}>
          <img src={up} alt="" />
        </div>
      }
        </div > : <div className={s.loading}>
          <div className={s.text}>Загружаем любимые видео...</div>
          <Loader />
        </div>
      }
    </>
  )
}

export default Favorite