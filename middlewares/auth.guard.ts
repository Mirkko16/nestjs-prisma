import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from 'src/auth/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            throw new UnauthorizedException('No tienes acceso');
        }

        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException('Token no válido');
        }

        try {
            // Verifica el token usando AuthService
            const decoded: JwtPayload = await this.authService.verifyToken(token);
            request.user = decoded; // Asigna el usuario decodificado a la solicitud

            // Verifica si el usuario existe en la base de datos
            const dbUser = await this.userService.getUserById(decoded.id);
            if (!dbUser) {
                throw new ForbiddenException('No se encontró el usuario');
            }

            // Obtén el usuario con los roles
            const userWithRoles = await this.userService.getUserWithRoles(decoded.id);

            // Verifica si el usuario tiene el rol de administrador
            const isAdmin = userWithRoles.roles.some(role => role.id === 1);
            return isAdmin;

        } catch (error) {
            throw new UnauthorizedException('Token no válido o expirado');
        }
    }
}
