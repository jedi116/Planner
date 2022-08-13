import React from "react";
import { auth } from "../../../firebase/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from "react-toastify";
import './profile.css'


export const Profile: React.FC<{}> = () => {
    const [user, loading, error] = useAuthState(auth);
    React.useEffect(()=> {
        if(!user) 
        {
            toast.warning('Needs Login to access this page')
        }
    },[user, loading]);
    return (
    <div className='profile__container'>
        {user ? 
        (
        <div className ='profile__contents' >Profile</div>
        ) : (<div>no access</div>)}
    </div>
    )
}