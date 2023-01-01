import React from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
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
