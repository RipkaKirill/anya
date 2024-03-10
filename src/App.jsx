import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import Home from './pages/Home/Home';
import Videos from './pages/Videos/Videos';
import Statistics from './pages/Statistics/Statistics';
import Favorite from './pages/Favorite/Favorite';

import { links } from './links.js'


function App() {

  return (
    <>
      <Routes >
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/statistics' element={<Statistics />} />
          <Route path='/favorite' element={<Favorite />} />
          {
            links.map(route => (
              <Route key={route.id} path={`${route.path}`} element={<Videos category={route.title} />} />
            ))
          }
        </Route>
      </Routes>
    </>
  )
}

export default App;
