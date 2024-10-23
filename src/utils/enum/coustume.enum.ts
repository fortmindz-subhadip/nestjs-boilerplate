// roles-permissions.ts
export enum RoleEnum {
    USER = 'user',
    ADMIN = 'admin',
    COACH = 'coach',
  }
  
  export enum UserRole {

     USER = 'user',
    ADMIN = 'admin',
    COACH = 'coach',
  }


  export const RolePermissions = {
    [RoleEnum.USER]: ['readOwnProfile'],  
    [RoleEnum.ADMIN]: ['readAnyProfile', 'manageUsers'],  
    [RoleEnum.COACH]: ['viewSessions', 'manageSessions'],  
  };
  