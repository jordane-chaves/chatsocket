import { randomUUID } from 'node:crypto';

export interface UserProps {
  name: string;
  email: string;
  avatar: string;
  socketId: string;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: UserProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get email() {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get avatar() {
    return this.props.avatar;
  }

  public set avatar(avatar: string) {
    this.props.avatar = avatar;
  }

  public get socketId() {
    return this.props.socketId;
  }

  public set socketId(socketId: string) {
    this.props.socketId = this.socketId;
  }
}
