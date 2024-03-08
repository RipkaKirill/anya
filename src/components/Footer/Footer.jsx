import React, { useEffect, useState } from 'react'
import axios from 'axios'

import s from './Footer.module.scss'

import euroIcon from '../../assets/icons/euro.svg'
import dollarIcon from '../../assets/icons/dollar.svg'
import rubleIcon from '../../assets/icons/ruble.svg'
import separation from '../../assets/icons/process_chart.svg'

const Footer = () => {
  const apiNbrb = 'https://api.nbrb.by/exrates/rates/'

  const [isLoading, setIsLoading] = useState(true)
  const [currency, setCurrency] = useState(null)

  useEffect(() => {
    axios.all([
      axios.get(apiNbrb + 451),
      axios.get(apiNbrb + 431),
      axios.get(apiNbrb + 456)
    ]).then(axios.spread((euroResponse, dollarResponse, rusRubleResponse) => {
      setCurrency([
        {
          id: 1,
          title: 'Euro',
          icon: euroIcon,
          value: euroResponse.data.Cur_OfficialRate
        },
        {
          id: 2,
          title: 'Dollar',
          icon: dollarIcon,
          value: dollarResponse.data.Cur_OfficialRate,
        },
        {
          id: 3,
          title: 'RusRuble',
          icon: rubleIcon,
          value: rusRubleResponse.data.Cur_OfficialRate,
          isForHundred: true
        }]
      )
      setIsLoading(false)
    }))
      .catch(error => console.log(error))
  }, [])
  return (
    <>
      <svg style={{ width: "100%" }} preserveAspectRatio="none" width="1440" height="70" viewBox="0 0 1440 69" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1440 69L0 69V44.3355C0 44.3355 213.177 -10.7292 551.5 1.87516C801.515 11.1895 1085.5 43.3989 1205 44.3355C1324.5 45.2721 1440 9.99258 1440 9.99258V69Z" fill="#BE5683" />
      </svg>

      <footer className={s.footer}>
        <div className={s.container + " container"}>
          <div className={s.currency}>
            <span className={s.title}>Курсы валют:</span>
            {isLoading ? <span>Загрузка курса валют...</span> :
              (<div className={s.currencyBlock}>
                {
                  currency.map(curr => (

                    <div key={curr.id} className={s.currencyValue}>
                      <i className={curr.isForHundred && s.hundred} >
                        <img src={curr.icon}></img>
                      </i>
                      <span>{curr.value}</span>
                    </div>

                  ))
                }
              </div>)}
          </div>
        </div>
      </footer >
    </>
  )
}

export default Footer