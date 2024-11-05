import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../middlewares/auth.guard'; 
import { CreateUserDto } from './dto/create.user.dto'; 
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
                        validateUser: jest.fn(),
                    },
                },
                {
                    provide: AuthGuard,
                    useValue: {
                        canActivate: jest.fn().mockReturnValue(true), 
                    },
                },
            ],
        }).compile();
        userController = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
        authService = module.get<AuthService>(AuthService);
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
