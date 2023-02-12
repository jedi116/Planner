import React from 'react'
import { userConstext } from '../userProfileContextWrapper'
import { DashboardTabs } from './dashboard-tabs'
import { useRecentActivity } from '../../../customhooks/common'
export const RightSide: React.FC<unknown> = () => {
  const userProfileContext = React.useContext(userConstext)
  const { recentActivity, getRecentActivity } = useRecentActivity()

  return (
    <div className='dashboard-right-side'>
      <div className='dashboard-right-header'>
        <span className='dashboard-right-greeting'>
          Welcome, {userProfileContext.userData.name}
        </span>
      </div>
      <div className='dashboard-right-recent'>
        <span className='dashboard-right-recent-headerText'>Recent Activity</span>
        {recentActivity?.map((data) => {
          return (
            <div key={data?.id} className='dashboard-right-recent-list'>
              <span className='dashboard-right-recent-list-title'>{data?.title}</span>
              <span className='dashboard-right-recent-list-time'>
                {data?.time.toDate().toDateString()}
              </span>
            </div>
          )
        })}
        {!recentActivity?.length && <>No data</>}
      </div>
      <div>
        <DashboardTabs />
      </div>
    </div>
  )
}
