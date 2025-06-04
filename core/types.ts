export interface User {
  id: string;
  username: string;
  email: string;
  roles: UserRole[];
  profile?: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}
//test for edits 5 pms
// 505 pm test
//505
export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  location?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export type UserRole = 'admin' | 'user' | 'moderator';