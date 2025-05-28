import React from 'react'
import { AuthProvider } from '@/context/AuthContext'
const layout = ({children} : {children: React.ReactNode}) => {
  return (
    <div>
        <AuthProvider>
            {children}
        </AuthProvider>
    </div>
  )
}

export default layout