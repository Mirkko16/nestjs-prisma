import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../middlewares/auth.guard'; 
import { CreateRoleDto } from './dto/create.role.dto';
import { UserService } from '../user/user.service';


describe('RoleController', () => {
    let roleController: RoleController;
    let roleService: RoleService;
    let authService: AuthService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RoleController],
            providers: [
                {
                    provide: RoleService,
                    useValue: {
                        getAllRoles: jest.fn(),
                        createRole: jest.fn(),
                        getRoleById: jest.fn(),
                        deleteRoleById: jest.fn(),
                        updateRole: jest.fn(),
                    },
                },
                {
                    provide: UserService,
                    useValue: {
                        findUserById: jest.fn(),
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
        roleController = module.get<RoleController>(RoleController);
        roleService = module.get<RoleService>(RoleService);
        authService = module.get<AuthService>(AuthService);
    });
    describe('getAllRoles', () => {
        it('should return an array of roles', async () => {
            const result = [
                { id: 1, name: "BOSS" },
                { id: 2, name: "CEO" },
                { id: 3, name: "SALESMAN" },
            ];

            jest.spyOn(roleService, 'getAllRoles').mockResolvedValue(result);

            expect(await roleController.getAllRoles()).toEqual(result);
            expect(roleService.getAllRoles).toHaveBeenCalled();
        });
    });

    describe('createRole', () => {
        it('should create a Role', async () => {
            const createRoleDto: CreateRoleDto = { name: 'Viewer'};
            const result = { id: 3, ...createRoleDto };
            jest.spyOn(roleService, 'createRole').mockImplementation(async () => result);
            expect(await roleController.createRole(CreateRoleDto)).toBe(result);
        });
    });
    describe('getRoleById', () => {
        it('should return a Role by Id', async () => {
            const roleId = 1;
            const mockRole = { id: roleId, name: 'CEO'};

            jest.spyOn(roleService, 'getRoleById').mockResolvedValue(mockRole);

            const result = await roleController.getRoleById(roleId);

            expect(result).toEqual({ id: roleId, name: 'CEO'});
        });
    });

    describe('deleteRoleById', () => {
        it('should delete a role', async () => {
            const roleId = 1;

            jest.spyOn(roleService, 'deleteRoleById').mockResolvedValue(undefined);

            await roleController.deleteRoleById(roleId);

            expect(roleService.deleteRoleById).toHaveBeenCalledWith(roleId);
        });
    });
});
