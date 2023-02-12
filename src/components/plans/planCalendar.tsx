import React, { FC } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import './index.scss'

const PlanCalendar = () => {
  const localizer = momentLocalizer(moment)
  const myEventsList = undefined
  return (
    <div className='plan-container'>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor='start'
        endAccessor='end'
        style={{ height: '80vh' }}
      />
    </div>
  )
}

export default PlanCalendar
