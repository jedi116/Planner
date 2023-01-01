import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoals } from '../../../../customhooks/goals'

export const GoalsTab: React.FC<unknown> = () => {
  const navigate = useNavigate()
  const onGoalsButtonClick = (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    navigate('/goals')
  }
  const { goals, getGoals } = useGoals()
  return (
    <div>
      <div className='goals-tab-header'>
        <span className='goals-tab-header-title'>Goals</span>
        <div className='goals-tab-header-buttons-container'>
          <button className='goals-tab-button' onClick={onGoalsButtonClick}>
            {' '}
            Add More Goals
          </button>{' '}
          /
          <button className='goals-tab-button' onClick={onGoalsButtonClick}>
            {' '}
            ... View More Goals
          </button>
        </div>
      </div>
      <div>
        {goals?.map((goal, index) => {
          return (
            <span className='goals-tab-list' key={index}>
              {goal.title}
            </span>
          )
        })}
        {!goals?.length && <h5 style={{ alignSelf: 'center' }}>No data</h5>}
      </div>
    </div>
  )
}
