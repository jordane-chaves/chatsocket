import { User } from '@application/users/entities/user';
import { randomUUID } from 'node:crypto';

export interface RoomProps {
  usersIds: string[];
  users?: User[];
}

export class Room {
  private _id: string;
  private props: RoomProps;

  constructor(props: RoomProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get usersIds() {
    return this.props.usersIds;
  }

  public set usersIds(usersIds: string[]) {
    this.props.usersIds = usersIds;
  }

  public get users() {
    return this.props.users;
  }
}
