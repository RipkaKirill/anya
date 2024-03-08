import React from 'react'
import s from './StatisticItem.module.scss'
import ProgressBar from '../ProgressBar/ProgressBar'

const StatisticItem = ({ count, common, item }) => {


  return (
    <div style={{ background: item.backgroundColor }} className={s.item}>
      <div className={s.icon}>
        <img src={item.icon} alt={item.title} />
      </div>
      <div className={s.infoblock}>
        <p style={{ color: item.color }} className={s.title}>{item.title}</p>
        <p className={s.count} >Сделано <span style={{color: item.color}} className={s.countValue} >{count}</span> из {common}</p>
      </div>
      <ProgressBar thickness={18} background='#fff' color={item.color} percent={(Math.round(count * 1000 / common) / 10).toFixed(1)} />
    </div>
  )
}

export default StatisticItem