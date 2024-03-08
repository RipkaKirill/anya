import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import Drops from '../Drops/Drops'

const Layout = () => {
  return (
    <>
      <Header />
      <Drops />
      <div className='page'>
        <div className="main container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Layout