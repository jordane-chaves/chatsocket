import { randomUUID } from 'node:crypto';

import { Replace } from '@core/Replace';
import { User } from '@application/users/entities/user';

export interface MessageProps {
  from: string;
  text: string;
  roomId: string;
  createdAt: Date;
  user?: User | null;
}

export class Message {
  private _id: string;
  private props: MessageProps;

  constructor(
    props: Replace<MessageProps, { createdAt?: Date }>,
    id?: string
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date()
    };
  }

  public get id() {
    return this._id;
  }

  public get from() {
    return this.props.from;
  }

  public set from(from: string) {
    this.props.from = from;
  }

  public get text() {
    return this.props.text;
  }

  public set text(text: string) {
    this.props.text = text;
  }

  public get roomId() {
    return this.props.roomId;
  }

  public set roomId(roomId: string) {
    this.props.roomId = roomId;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get user() {
    return this.props.user;
  }
}
