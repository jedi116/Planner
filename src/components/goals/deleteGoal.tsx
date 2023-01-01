import React from 'react'
import { Goals } from '../../intefaces/goals'
import { Button, Slider } from '@mui/material'
import GoalService from '../../service/goals'

type DeleteGoalProps = {
  closeModal: () => void
  getGoals: () => void
  goal: Goals | undefined
}

const DeleteGoal: React.FC<DeleteGoalProps> = ({ closeModal, getGoals, goal }) => {
  const handleDelete = () => {
    GoalService.deleteGoal(goal?.id || '')
    setTimeout(() => getGoals(), 500)
    closeModal()
  }

  return (
    <div className='delete-goal-container'>
      <h3 style={{ paddingBottom: '5%' }}>Are you sure you want to delete the following goal ?</h3>
      <h5 style={{ paddingBottom: '5%' }}>
        Title: <span>{goal?.title}</span>
      </h5>
      <h5 style={{ paddingBottom: '5%' }}>
        Type: <span>{goal?.type}</span>{' '}
      </h5>
      <h6>Progress</h6>
      <Slider
        defaultValue={goal?.progress}
        aria-label='Default'
        valueLabelDisplay='auto'
        id='progress-slider'
        disabled
        marks={[
          {
            value: goal?.progress || 0,
            label: `${goal?.progress}%`,
          },
        ]}
      />
      <div className='delete-goal-buttons'>
        <Button variant='contained' color='success' onClick={handleDelete}>
          Confirm
        </Button>
        <Button variant='contained' color='error' onClick={() => closeModal()}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default DeleteGoal
