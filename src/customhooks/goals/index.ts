import React from 'react'
import { toast } from 'react-toastify'
import { Goals } from '../../intefaces/goals'
import GoalService from '../../service/goals'
import { auth } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const defaultGoals: Array<Goals> = []

export const useGoals = () => {
  const [goals, setGoals] = React.useState<Array<Goals> | undefined>(defaultGoals)
  const [user, loading, error] = useAuthState(auth)
  React.useEffect(() => {
    getGoals()
  }, [user])
  const getGoals = async () => {
    try {
      if (user) {
        const data = await GoalService.getAllUserGoals(user.uid)
        console.log(data)
        setGoals(data)
      }
    } catch (e: Error | any) {
      console.log(e, e.message)
      toast.error('Failed getting Goals')
    }
  }

  return { goals, getGoals }
}
