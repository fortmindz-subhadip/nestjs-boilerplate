import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class ParamIdMatchesUserGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        const userIdFromParams = request.params.id;

        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header not found');
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        const secret = this.configService.getOrThrow('auth.secret', {
            infer: true,
        });
        const decodedToken = await this.jwtService.verifyAsync(token, {
            secret: secret,
        });

        const userIdFromToken = decodedToken.id;

        if (userIdFromParams !== userIdFromToken) {
            throw new UnauthorizedException(
                'You do not have permission to access this resource',
            );
        }

        return true;

    }
}
