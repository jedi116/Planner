import React from 'react'
import './index.css'
import { useLoginRedirect } from '../../../customhooks/common'
import { LeftSide } from './leftSideComponent';
import { RightSide } from './rightSideComponent';

export const Dashbaord: React.FC<unknown> = () => {
  useLoginRedirect()
  return (
  <div className='dashboard-container'>
    <LeftSide/>
    <RightSide/>
  </div>
  )
}
