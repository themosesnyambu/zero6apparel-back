import { prop } from '@typegoose/typegoose';

class Release {
  @prop()
  public name?: String;

  @prop()
  public price?: Number;
}

// eslint-disable-next-line import/prefer-default-export
export { Release };
