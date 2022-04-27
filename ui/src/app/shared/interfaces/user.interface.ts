// TODO:: Check difference of User and UserResponse
export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}
