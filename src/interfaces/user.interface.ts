import { IPermissionsReq } from "./permission.interface";

export interface IUser {
    id: number;
    username: string;
    name: string;
    email: string;
    firstAccess: Date;
    permissions: IPermissionsReq[];
    updatedAt: Date;
    createdAt: Date;
}

