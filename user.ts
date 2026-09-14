export interface UserRole {
  id: string
  name: string
  description: string
}

export interface Users {
  id: string
  email: string
  first_name: string
  last_name: string
  full_name: string
  phone: string
  is_active: boolean
  is_tenant_admin: boolean
  profile_picture: string | null
  date_joined: string
  last_login: string | null
  roles: UserRole[]
}
