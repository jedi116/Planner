import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Reset from './components/auth/reset'
import { Home } from './components/pages/homepage/home'
import { RouteType } from './intefaces/router'
import { Profile } from './components/user/profile'
import { Dashbaord } from './components/user/dashboard'
import { GoalsPage as Goals } from './components/goals'
import Plan from './components/plans'

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
