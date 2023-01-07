import { Timestamp } from 'firebase/firestore'
export interface Activity {
  id: string
  title: string
  type: ActivityType
  time: Timestamp
}

export enum ActivityType {
  AddGoal = 'Added  a Goal',
  UpdateGoal = 'Updtaed a Goal',
  DeleteGoal = 'Deleted a Goal',
}

export interface RecentActivity {
  uid: string
  activities: Array<Activity>
}
