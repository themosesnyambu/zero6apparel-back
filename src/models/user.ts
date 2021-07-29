import { prop } from '@typegoose/typegoose';

class User {
    @prop()
    public firstName?: String;

    @prop()
    public lastName?: String;

    @prop()
    public email?: String;

    @prop()
    public password?: String;

    @prop()
    public dateOfBirth? : Date;

    @prop()
    public newsletter?: Boolean;
}

// eslint-disable-next-line import/prefer-default-export
export { User };
