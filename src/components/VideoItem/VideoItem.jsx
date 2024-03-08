import React, { useEffect, useRef, useState } from 'react'
import s from './VideoItem.module.scss'

const VideoItem = ({ title, text, poster, link, done, addDone, deleteDone, favorite, addFavorite, deleteFavorite }) => {

  let textList = text.replace('Понадобится: ', '').split(',' || ':')
  // const favoriteRef = useRef(<div></div>)
  return (
    <div className={s.item}>
      <a className={s.link} href={link} target="_blank">
        <div className={s.poster}>
          <img src={poster} alt={title} />
        </div>
        <div className={s.infoBlock}>
          <h2 className={s.title} >{title}</h2>
          <div className={s.text} >
            {
              textList.map(txt => (
                <p className={s.textItem}>{txt}</p>
              ))
            }
          </div>
        </div>
      </a>
      <div className={s.buttonBlock}>
        <button  className={`${s.btnFavorite} ${s.button} ${favorite ? s.favorite : ''}`}
          onClick={favorite ? deleteFavorite : addFavorite}>{favorite ? 'Любимое' : `Добавить в 🤍`} </button>    
        <button
          className={`${s.btnDone} ${s.button} ${done ? s.done : ''}`}
          onClick={done ? deleteDone : addDone}>{done ? 'Cделано' : 'Не сделано'}</button>
      </div>
    </div>
  )
}

export default VideoItem