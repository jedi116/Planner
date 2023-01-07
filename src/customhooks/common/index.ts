import React from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import ActivityService from '../../service/activity'
import { Activity } from '../../intefaces/dashboard'
import * as  dayjs from 'dayjs'
export const useMounted = () => {
  const [mounted, setMounted] = React.useState<boolean>(false)
  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return mounted
}

export const useLoginRedirect = () => {
  const mounted = useMounted()
  const navigate = useNavigate()
  const [user, loading, error] = useAuthState(auth)
  React.useEffect(() => {
    if (!user && mounted && !loading) {
      toast.warning('Needs Login to access this page')
      navigate('/login')
    }
  }, [user, mounted, loading])
}


export const useRecentActivity = () => {
  const mounted = useMounted()
  const [user, loading, error] = useAuthState(auth)
  const [recentActivity, setRecentActivity] = React.useState<Activity[]>()
  React.useEffect(() => {
    getRecentActivity()
  },[user, mounted])
  const getRecentActivity = async () => {
    try {
      if (user && user.uid && mounted) {
        const activities = await ActivityService.getRecentActivity(user.uid)
        activities?.sort((a, b) => {
          if (dayjs(new Date(a.time.toDate())).isAfter(b.time.toDate())) {
            return -1;
          }
          if (dayjs(a.time.toDate()).isBefore(b.time.toDate())) {
            return 1;
          }
          // a must be equal to b
          return 0;
        })
        setRecentActivity(activities)
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  return {recentActivity, getRecentActivity}
}
