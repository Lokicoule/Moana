import { Schema as MongooseSchema } from 'mongoose';

export class UserCtx {
  public readonly _id: string;
  public readonly email: string;

  constructor(id, email) {
    this.email = email;
    this._id = id;
  }
}
