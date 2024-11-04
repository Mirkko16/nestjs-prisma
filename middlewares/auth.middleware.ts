import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) {}

    use(req: any, res: any, next: () => void) {
        const token = req.headers.authorization?.split(' ')[1];

        if (token) {
            const user = this.authService.verifyToken(token);
            req.user = user; // Almacena el usuario en el request
        }

        next();
    }
}