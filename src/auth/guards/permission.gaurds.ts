import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';
import { RolePermissions } from '../../utils/enum/coustume.enum'; // Ensure this is the correct path
import { CurrentUser } from '../decorators/currentuser-decorator'; // Adjust the import path as needed
import { Reflector } from '@nestjs/core'; // Import Reflector

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {} // Inject Reflector

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user; // Assuming `req.user` has been set by a guard

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const requiredPermissions: string[] = this.getRequiredPermissions(context);
        const userPermissions = RolePermissions[user.roles];

    const hasPermission = requiredPermissions.every(permission => 
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      throw new ForbiddenException('permission denied');
    }

    return true; 
  }

  private getRequiredPermissions(context: ExecutionContext): string[] {
    const handler = context.getHandler();
    const requiredPermissions = this.reflector.get<string[]>('permissions', handler);
    return requiredPermissions || [];
  }
}
