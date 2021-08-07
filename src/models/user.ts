import { prop } from '@typegoose/typegoose';
import { USER_ROLES } from './role';

class User {
    @prop()
    public firstName?: String;

    @prop()
    public lastName?: String;

    @prop({ unique: true })
    public email?: String;

    @prop()
    public password?: string;

    @prop()
    public dateOfBirth? : Date;

    @prop()
    public newsletter?: Boolean;

    @prop({ type: String, enum: USER_ROLES, default: USER_ROLES.SUBSCRIBER })
    role?: USER_ROLES;
}

// eslint-disable-next-line import/prefer-default-export
export { User };
