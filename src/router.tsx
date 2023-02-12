import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '@pages/auth/login'
import Register from '@pages/auth/register'
import Reset from '@pages/auth/reset'
import { Home } from '@pages/homepage/home'
import { RouteType } from './intefaces/router'
import { Profile } from '@pages/user/profile'
import { Dashbaord } from '@pages/user/dashboard'
import { GoalsPage as Goals } from '@pages/goals'
import Plan from './pages/plans'

const routes: RouteType[] = [
  {
    path: '/login',
    element: <Login />,
    authRequired: false,
  },
  {
    path: '/register',
    element: <Register />,
    authRequired: false,
  },
  {
    path: '/reset',
    element: <Reset />,
    authRequired: false,
  },
  {
    path: '/home',
    element: <Home />,
    authRequired: false,
  },
  {
    path: '/',
    element: <Home />,
    authRequired: false,
  },
  {
    path: '/profile',
    element: <Profile />,
    authRequired: true,
  },
  {
    path: '/dashboard',
    element: <Dashbaord />,
    authRequired: true,
  },
  {
    path: '/goals',
    element: <Goals />,
    authRequired: true,
  },
  {
    path: '/plans',
    element: <Plan />,
    authRequired: true,
  },
]

export const Router = () => {
  return (
    <Routes>
      {routes.map((r, key) => (
        <Route element={r.element} path={r.path} key={key} />
      ))}
    </Routes>
  )
}
