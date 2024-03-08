import React from 'react'
import s from './Videos.module.scss'


import VideoList from '../../components/VideoList/VideoList';
import { useSearchParams } from 'react-router-dom';

const Videos = ({ category }) => {
  const [searchParams] = useSearchParams()
  return (
    <div className={s.videos}>
      <h2 className={s.title}>
        {
          searchParams.get('search') ? (
            `Всё что мы нашли для  "${searchParams.get('search')}"`
          ) : category
        }
      </h2>
      <VideoList />
    </div>
  )
}

export default Videos