export class DTOUsers {
  UserID: number;
  UserName: string;
  Password: string;
  AuthID: number;
  Email: string;
  Point: number;
  Address: string;
  Phone: string;
  CreateAt: string;

  constructor(
    userID: number,
    userName: string,
    password: string,
    authID: number,
    email: string,
    point: number,
    address: string,
    phone: string,
    createAt: string
  ) {
    this.UserID = userID;
    this.UserName = userName;
    this.Password = password;
    this.AuthID = authID;
    this.Email = email;
    this.Point = point;
    this.Address = address;
    this.Phone = phone;
    this.CreateAt = createAt;
  }
}
