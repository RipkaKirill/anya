import React from 'react'
import { useGetDoneQuery } from '../../redux'

import s from './Statistics.module.scss'

import { db } from '../../db'
import { links } from '../../links'
import StatisticItem from '../../components/StatisticItem/StatisticItem'
import Loader from '../../components/Loader/Loader'

const Statistics = () => {
  const { data = [], isLoading } = useGetDoneQuery()
  const arrayOfCounts = links.map(link => {
    let count = link.path === 'all' ? data.length : data.filter(el => el.categories.includes(link.path)).length
    return count
  })


  return (
    <>
      {
        !isLoading ? <div div className={s.statistics} >
          <div className={s.list}>
            {
              links.map((item, i) => (
                <StatisticItem item={item} count={arrayOfCounts[i]} common={db.length} />
              ))
            }
          </div>
        </div > : <div className={s.loading}>
          <div className={s.text}>Загружаем статистику...</div>
          <Loader />
        </div>
      }
    </>
  )
}

export default Statistics