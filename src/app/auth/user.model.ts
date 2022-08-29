export class User {

  public uid: string;
  public email: string;
  public emailVerified: boolean;

  constructor(uid: string, email: string, emailVerified: boolean) {
    this.uid = uid;
    this.email = email;
    this.emailVerified = emailVerified;
  }
}
