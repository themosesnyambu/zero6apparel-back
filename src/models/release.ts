import { prop } from '@typegoose/typegoose';
// import mongoose from 'mongoose';

class Release {
  @prop()
  public name?: String;

  @prop()
  public price?: Number;

  @prop()
  public description?: String;

  @prop()
  public collectionStyle?: String;

  @prop()
  public color?: String;

  @prop()
  public photos?: string[];

  // @prop({ required: true, default: [] })
  // public photos?: mongoose.Types.Array<string>;

  @prop()
  public reviews?: string[];

  @prop()
  public tags?: string[];
}

// eslint-disable-next-line import/prefer-default-export
export { Release };
