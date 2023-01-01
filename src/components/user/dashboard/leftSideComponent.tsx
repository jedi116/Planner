import React from 'react'
import * as dayjs from 'dayjs'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

interface DailyTasks {
  checked: boolean
  name: string
}

interface MonthlyTasks {
  checked: boolean
  name: string
  progress: number
}

const sample: Array<DailyTasks> = [
  {
    checked: false,
    name: 'Comming Soon',
  },
]
const sample2: Array<MonthlyTasks> = [
  {
    checked: false,
    name: 'Comming Soon',
    progress: 0,
  },
]

export const LeftSide: React.FC<unknown> = () => {
  return (
    <div className='dashboard-left-side-bar'>
      <div className='dashboard-left-side-bar-date-wrapper'>
        <h3 className='dashboard-left-side-bar-text'>Today</h3>
        <span className='dashboard-left-side-bar-date'>{dayjs().format('MMMM D, YYYY')}</span>
      </div>
      <div className='dashboard-left-side-bar-text'>
        <h4>Top 4 Plans For today</h4>
        <div className='dashboard-left-side-bar-task-list'>
          <FormGroup>
            {sample.map((task, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={<Checkbox defaultChecked={task.checked} disabled={task.checked} />}
                  label={task.name}
                  className={
                    task.checked
                      ? 'dashboard-left-list-element-checked'
                      : 'dashboard-left-list-element'
                  }
                />
              )
            })}
          </FormGroup>
          {!(sample.length > 0) && <span>No plans to show for today</span>}
        </div>
      </div>
      <h4 className='dashboard-left-side-bar-text'>Top 3 Plans this month</h4>
      <div className='dashboard-left-side-bar-task-list'>
        <FormGroup style={{ padding: '20px' }}>
          {sample2.map((task, index) => {
            return (
              <FormControlLabel
                key={index}
                control={<Checkbox defaultChecked={task.checked} disabled={task.checked} />}
                label={task.name}
                //  + ` - ${task.progress}%`
                className={
                  task.checked
                    ? 'dashboard-left-list-element-checked'
                    : 'dashboard-left-list-element'
                }
              />
            )
          })}
        </FormGroup>
        {!(sample2.length > 0) && <span>No plans to show for this month</span>}
      </div>
    </div>
  )
}
