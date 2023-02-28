export class UserModel {
  constructor(
    public id: string,
    public email: string,
    private _token: string,
    private _tokenExpiryDate: Date
  ) {}

  get token() {
    if (!this._tokenExpiryDate || new Date() > this._tokenExpiryDate) {
      return null;
    }
    return this._token;
  }
}
