import React from 'react'
import { useGetNewsQuery } from '../../redux'

import NewsItem from '../../components/NewsItem/NewsItem'

import s from './NewsRtkQuery.module.scss'

const NewsRtkQuery = () => {
  const { data = [], isLoading, isError } = useGetNewsQuery()

  return (
    <div className={s.NewsRtkQuery}>
      {isLoading && <div>Загрузка...</div>}
      {isError && <div>Что-то пошло не так</div>}
      {!isLoading &&
        data.map((newsItem) => (
          <NewsItem key={newsItem.id} {...newsItem} />
        ))
      }
    </div>
  )
}

export default NewsRtkQuery