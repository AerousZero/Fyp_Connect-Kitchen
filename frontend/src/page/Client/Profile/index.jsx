import React from 'react'
import Profile from '../../../components/common/Profile/Profile'
import ClientLayout from '../../../feature/Client/Layout'
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../store/userSlice";

function ClientProfile() {
    const userDetails = useSelector(selectUserDetails);
  return (
    <div>
       <ClientLayout>
        <Profile user={userDetails} />
       </ClientLayout>
        
      
    </div>
  )
}

export default ClientProfile
