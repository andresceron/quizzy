
// Is the interface needed?
export interface User {
  id: number,
  uuid: string,
  name: string,
  email: string,
  password: string
}

export class UserModel {
  id: number;
  uuid: string;
  name: string;
  email: string;
  password: string;

  constructor(user: UserModel) {
    this.id = user.id;
    this.uuid =  user.uuid;
    this.name =  user.name;
    this.email =  user.email;
    this.password =  user.password;
  }
}