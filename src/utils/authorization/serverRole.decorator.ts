import { SetMetadata } from '@nestjs/common';
import { SERVER_ROLE } from '@prisma/client';

export const ServerRole = (role: SERVER_ROLE) => SetMetadata('role', role);

export const User = () => SetMetadata('role', undefined);

export const Admin = () => ServerRole(SERVER_ROLE.ADMIN);

export const HR = () => ServerRole(SERVER_ROLE.HR);

export const PO = () => ServerRole(SERVER_ROLE.PO);
