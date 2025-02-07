export class CreateEmailDTO {
  private _email: string;
  private _dashboardName: string;

  private constructor(email: string, dashboardName: string) {
    this._email = email;
    this._dashboardName = dashboardName;
  }

  get email() {
    return this._email;
  }

  get dashboardName() {
    return this._dashboardName;
  }

  set email(email: string) {
    this._email = email;
  }

  set dashboardName(dashboardName: string) {
    this._dashboardName = dashboardName;
  }

  static from(email: string, dashboardName: string) {
    return new CreateEmailDTO(email, dashboardName);
  }
}
