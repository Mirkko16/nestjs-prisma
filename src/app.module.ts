import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { RolePermissionModule } from './rolePermissions/role.permission.module';
import { UserRoleModule } from './userRole/user.role.module';
import { UserPermissionModule } from './userPermissions/user.permission.module';

@Module({
  imports: [UserModule, RoleModule, PermissionModule, RolePermissionModule, UserRoleModule, UserPermissionModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
