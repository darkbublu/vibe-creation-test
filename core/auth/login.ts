// Type definitions for authentication
interface Credentials {
  username: string;
  password: string;
}
//MY FIRST EDIT
interface AuthResponse {
  token: string;
  user: User;
}
//good here
interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}