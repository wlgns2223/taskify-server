export class User {
  constructor(
    private _email: string,
    private _nicname: string,
    private _password: string,
  ) {}

  get email() {
    return this._email;
  }

  get nickname() {
    return this._nicname;
  }

  get password() {
    return this._password;
  }
}
