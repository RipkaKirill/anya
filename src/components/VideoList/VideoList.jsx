import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'

import VideoItem from '../VideoItem/VideoItem'
import { db } from '../../db'
import { useGetDoneQuery, useAddDoneMutation, useDeleteDoneMutation, useAddFavoriteMutation, useDeleteFavoriteMutation, useGetFavoriteQuery } from '../../redux'

import s from './VideoList.module.scss'
import up from '../../assets/icons/up.png'

const sortData = [
  {
    id: 1,
    title: 'Все',
    path: 'all'
  },
  {
    id: 2,
    title: 'Сделанные',
    path: 'done'
  },
  {
    id: 3,
    title: 'Не сделанные',
    path: 'notdone'
  }
]

const VideoList = () => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams();

  const [isVisibleUpButton, setIsVisibleUpButton] = useState(false)
  const [count, setCount] = useState(10)

  const { data = [], isLoading } = useGetDoneQuery()
  const [addDone] = useAddDoneMutation();
  const [deleteDone] = useDeleteDoneMutation();

  const { data: favoriteData = [], isLoading: isLoadingFavorite } = useGetFavoriteQuery()
  const [addFavorite] = useAddFavoriteMutation()
  const [deleteFavorite] = useDeleteFavoriteMutation()

  let path = location.pathname.slice(1)

  let videos = path !== 'all' ? db.filter(curr => curr.categories.includes(path)) : db
  if (searchParams.get('sort') === `done`) {
    videos = videos.filter(video => {
      let f = false
      data.forEach(data => {
        if (data.link === video.link) {
          f = true
          return
        }
      });
      if (f) return video
    })
  }
  if (searchParams.get('sort') === `notdone`) {
    videos = videos.filter(video => {
      let f = true
      data.forEach(data => {
        if (data.link === video.link) {
          f = false
        }
      });
      if (f) return video
    })
  }
  if (searchParams.get('search')) {
    videos = videos.filter(({ title }) => title.toLowerCase().includes(searchParams.get('search').toLowerCase()))
  }

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

  const handleAddDone = async (video) => {
    await addDone(video).unwrap()
  }

  const handleDeleteDone = async (id) => {
    await deleteDone(id).unwrap()
  }

  const handleAddFavorite = async (video) => {
    await addFavorite(video).unwrap()
  }

  const handleDeleteFavorite = async (id) => {
    await deleteFavorite(id).unwrap()
  }

  const clickHandler = (path) => {
    searchParams.set("sort", path)
    setSearchParams(searchParams)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.sortBlock}>
        {
          sortData.map(sort => {
            let active
            if (!Boolean(searchParams.get('sort')) && sort.path === 'all') {
              active = s.active
            } else {
              active = searchParams.get('sort') === sort.path && s.active
            }
            return <span className={s.sortLink + ' ' + active} onClick={() => clickHandler(sort.path)}  >{sort.title}</span>
          })
        }
      </div>
      <div className={s.list}>
        {
          videos.length > 0 ? videos.slice(0, count).map(video => {
            let done = false
            let favorite = false
            let id
            let idFavorite
            data.forEach(data => {
              if (data.link === video.link) {
                done = true
                id = data.id
                return
              }
            });
            favoriteData.forEach(data => {
              if (data.link === video.link) {
                favorite = true
                idFavorite = data.id
                return
              }
            });

            return <VideoItem {...video}
              done={done}
              favorite={favorite}
              addDone={() => handleAddDone(video)}
              deleteDone={() => handleDeleteDone(id)}
              addFavorite={() =>  handleAddFavorite(video)}
              deleteFavorite={() =>  handleDeleteFavorite(idFavorite)} />
          }) : searchParams.get('search') ? <div className={s.notVideos}>К сожалению мы ничего не нашли</div> : <div>Пока что пусто &#129402;</div>
        }
      </div>
      {
        isVisibleUpButton && <div onClick={() => window.scrollTo(0, 0)} className={s.btnOnTop}>
          <img src={up} alt="" />
        </div>
      }

    </div>
  )
}


export default VideoList