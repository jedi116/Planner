import React from 'react';
import { userConstext } from '../userProfileContextWrapper';
import {DashboardTabs} from './dashboard-tabs'
interface RecentActivity {
    title: string;
    type: string;
    time: Date;
}

const sample : Array<RecentActivity> = [
    {
        title: 'added new plan for date 04/04/2034',
        type: 'NEW PLAN',
        time: new Date()
    },
    {
        title: 'modified plan for date 04/05/2021',
        type: 'CHANGE PLAN',
        time: new Date()
    },
    {
        title: 'added new plan for date 04/04/2024',
        type: 'NEW PLAN',
        time: new Date()
    }
]


export const RightSide: React.FC<unknown> = () => {
   
  const userProfileContext = React.useContext(userConstext) 
  
  return (
    <div className='dashboard-right-side'>
        <div className='dashboard-right-header'>
            <span className='dashboard-right-greeting'>Welcome, {userProfileContext.userData.name}</span>
        </div>
        <div className='dashboard-right-recent'>
            <span className='dashboard-right-recent-headerText'>Recent Activity</span>
            {
                sample.map((data, index) => {
                    return (
                        <div key={index} className='dashboard-right-recent-list'>
                            <span className='dashboard-right-recent-list-title'>{data.title}</span>
                            <span className='dashboard-right-recent-list-time'>{data.time.toDateString()}</span>
                        </div>
                    )
                })
            }
        </div>
        <div>
          <DashboardTabs/>
        </div>
    </div>
    )
}