import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeedService implements OnModuleInit {
    constructor(private prisma: PrismaService) {}

    async onModuleInit() {
        await this.seedAdminUser();
        await this.seedAdminRole();
        await this.seedUserRole();
    }

    async seedAdminUser() {
        const adminUser = await this.prisma.user.findUnique({
            where: { name: 'Admin' },
        });

        if (!adminUser) {
            await this.prisma.user.create({
                data: {
                    name: 'Admin',
                    email: 'admin@example.com', 
                    password: 'Admin@123',
                },
            });
            console.log('User Admin created.');
        } else {
            console.log('User Admin already exists.');
        }
    }

    async seedAdminRole() {
        const adminRole = await this.prisma.role.findUnique({
            where: { id: 1 },
        });

        if (!adminRole) {
            await this.prisma.role.create({
                data: {
                    id: 1,
                    name: 'Admin',
                },
            });
            console.log('Role Admin created.');
        } else {
            console.log('Role Admin already exists.');
        }
    }

    async seedUserRole() {
        const userRole = await this.prisma.userRole.findUnique({
            where: {
                userId_roleId: { userId: 1, roleId: 1 },
            },
        });

        if (!userRole) {
            await this.prisma.userRole.create({
                data: {
                    userId: 1,
                    roleId: 1,
                },
            });
            console.log('UserRole for Admin created.');
        } else {
            console.log('UserRole for Admin already exists.');
        }
    }
}
