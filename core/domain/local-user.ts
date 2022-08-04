interface Props {
  accessToken: string;
  refreshToken: string;
  username: string;
  chatToken: string;
}

export class LocalUser {
  constructor(private props: Props) {}

  get accessToken() {
    return this.props.accessToken;
  }
  get refreshToken() {
    return this.props.refreshToken;
  }
  get username() {
    return this.props.username;
  }
  get chatToken() {
    return this.props.chatToken;
  }
}
