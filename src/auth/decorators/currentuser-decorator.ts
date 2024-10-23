import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity => {
    const req = context.switchToHttp().getRequest();
    return req.user; // Simply return the user attached by the guard
  },
);
