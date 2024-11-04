import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../../middlewares/auth.guard'; // Si necesitas el AuthGuard en tus pruebas, también asegúrate de mockearlo.
import { CreateUserDto } from './dto/create.user.dto'; // Asegúrate de importar CreateUserDto
describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;
    let authService: AuthService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        getAllUsers: jest.fn(),
                        createUser: jest.fn(),
                        getUserById: jest.fn(),
                        deleteUserById: jest.fn(),
                        updateUser: jest.fn(),
                    },
                },
                {
                    provide: AuthService,
                    useValue: {
                        // Aquí puedes mockear métodos de AuthService si los necesitas
                        validateUser: jest.fn(),
                        // Agrega otros métodos necesarios según tu implementación
                    },
                },
                {
                    provide: AuthGuard,
                    useValue: {
                        // Mockea el comportamiento de AuthGuard si es necesario
                        canActivate: jest.fn().mockReturnValue(true), // Ejemplo de mock
                    },
                },
            ],
        }).compile();
        userController = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
        authService = module.get<AuthService>(AuthService); // Si es necesario
    });
    describe('getAllUsers', () => {
        it('should return an array of users without passwords', async () => {
            const result = [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
            ];
            jest.spyOn(userService, 'getAllUsers').mockImplementation(async () => result);
            expect(await userController.getAllUsers()).toEqual(result);
        });
    });
    describe('createUser', () => {
        it('should create a user', async () => {
            const createUserDto: CreateUserDto = { name: 'Jane Doe', email: 'jane@example.com', password: 'password' };
            const result = { id: 2, ...createUserDto };
            jest.spyOn(userService, 'createUser').mockImplementation(async () => result);
            expect(await userController.createUser(createUserDto)).toBe(result);
        });
    });
    describe('getUserById', () => {
        it('should return a user without password', async () => {
            const userId = 1;
            const mockUser = { id: userId, name: 'John Doe', email: 'john@example.com' };

            jest.spyOn(userService, 'getUserById').mockResolvedValue(mockUser);

            const result = await userController.getUserById(userId);

            expect(result).toEqual({ id: userId, name: 'John Doe', email: 'john@example.com' });
        });
    });

    describe('deleteUserById', () => {
        it('should delete a user', async () => {
            const userId = 1;

            jest.spyOn(userService, 'deleteUserById').mockResolvedValue(undefined);

            await userController.deleteUserById(userId);

            expect(userService.deleteUserById).toHaveBeenCalledWith(userId);
        });
    });
});
