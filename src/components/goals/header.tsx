import React from 'react'
import Button from '@mui/material/Button'
import { Goals } from '../../intefaces/goals'

export type GoalsButtonHandlerType = (
  e: React.ChangeEvent<any>,
  goalData: Goals | undefined,
  action: 'add' | 'edit',
) => void

interface GoalHeaderPropsType {
  handleButtonClicks: GoalsButtonHandlerType
}

const GoalsHeader: React.FC<GoalHeaderPropsType> = ({ handleButtonClicks }) => {
  return (
    <div className='goals-header-container'>
      <span>Goals</span>
      <Button
        variant='contained'
        className='goals-header-container-button'
        onClick={(e) => handleButtonClicks(e, undefined, 'add')}
      >
        Add
      </Button>
    </div>
  )
}

export default GoalsHeader
