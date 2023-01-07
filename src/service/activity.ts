import {
  query,
  getDocs,
  collection,
  where,
  setDoc,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore'
import { Activity } from '../intefaces/dashboard'
import { db } from '../firebase/firebase'
import * as dayjs from 'dayjs'
import { toast } from 'react-toastify'

export default new (class ActivityService {
  async addActivity(data: Activity, userId: string) {
    try {
      const q = query(collection(db, 'activity'), where('uid', '==', userId))
      const docs = await getDocs(q)
      if (docs.docs.length === 0) {
        await addDoc(collection(db, 'activity'), {
          activities: [
            {
              ...data,
            },
          ],
          uid: userId,
        })
        return
      }
      const activities = docs.docs[0].get('activities') as Array<Activity>
      const sortedActivities = activities.sort((a, b) => {
        if (dayjs(new Date(a.time.toDate())).isAfter(b.time.toDate())) {
          return -1
        }
        if (dayjs(a.time.toDate()).isBefore(b.time.toDate())) {
          return 1
        }
        // a must be equal to b
        return 0
      })
      const activitiesToBeSaved: Array<Activity> = []
      for (let i = 0; i < 2; i++) {
        sortedActivities[i] && activitiesToBeSaved.push(sortedActivities[i])
      }
      activitiesToBeSaved.push(data)
      console.log(activitiesToBeSaved)
      console.log(data)
      const docRef = doc(db, 'activity', docs.docs[0].id)
      updateDoc(docRef, {
        uid: userId,
        activities: activitiesToBeSaved,
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  async getRecentActivity(userId: string) {
    try {
      const q = query(collection(db, 'activity'), where('uid', '==', userId))
      const docs = await getDocs(q)

      // console.log(docs.docs[0].get('activities'))
      return docs.docs[0].get('activities') as Array<Activity>
    } catch (error: any) {
      toast.error('Error fetching recent activity')
      console.log(error)
    }
  }
})()
