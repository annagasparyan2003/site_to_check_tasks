import React from 'react'
import RoleGate from '@/components/auth/role-gate'
import { UserRole } from '@prisma/client'

const page = () => {
  return (
    <RoleGate allowedRole={UserRole.ADMIN}>
      <div>page</div>

    </RoleGate>
  )
}

export default page