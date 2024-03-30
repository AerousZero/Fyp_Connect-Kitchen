import React from 'react'

import "../index.css"
import Register from '../feature/Register/Register'
import { useParams } from 'react-router-dom';


function RegisterPage() {
  const { role } = useParams();
  return (
    <div>
      <Register role={role} />
    </div>
  )
}

export default RegisterPage
