import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from 'src/auth/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user: JwtPayload = request.user;

        if (!user || !user.id) {
            throw new ForbiddenException('No tienes acceso');
        }

        const dbUser = await this.userService.getUserById(user.id);

        if (!dbUser) {
            throw new ForbiddenException('No se encontró el usuario');
        }

        // Obtén el usuario con los roles
        const userWithRoles = await this.userService.getUserWithRoles(user.id);

        // Verifica si el usuario tiene el rol de administrador
        const isAdmin = userWithRoles.roles.some(role => role.name === 'Admin');

        return isAdmin; // Devuelve true si es admin, de lo contrario false
    }
}
