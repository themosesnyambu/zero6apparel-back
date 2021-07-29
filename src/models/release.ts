import { prop } from '@typegoose/typegoose';

class Release {
  @prop()
  public name?: String;

  @prop()
  public price?: Number;

  @prop()
  public description?: String;

  @prop()
  public style?: String;

  @prop()
  public color?: String;

  @prop({ type: () => [String] })
  public photos?: string[];

  @prop({ type: () => [String] })
  public reviews?: string[];
}

// eslint-disable-next-line import/prefer-default-export
export { Release };
