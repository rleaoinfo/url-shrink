import { Injectable, HttpException } from '@nestjs/common';
import { USERS } from '../mocks/user.mock';

@Injectable()
export class UsersService {
  users = USERS;

  getUsers(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.users);
    });
  }
  getUser(emailString): Promise<any> {
    let email = String(emailString);
    return new Promise((resolve) => {
      const user = this.users.find((user) => user.email === email);
      if (!user) {
        throw new HttpException('User does not exist!', 404);
      }
      resolve({acess_token : user.acess_token});
    });
  }
  addUser(user): Promise<any> {
    return new Promise((resolve) => {
      this.users.push(user);
      resolve(this.users);
    });
  }
  deleteUser(userID): Promise<any> {
    let id = Number(userID);
    return new Promise(resolve => {
        let index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new HttpException('User does not exist!', 404);
        }
        this.users.splice(1, index);
        resolve(this.users);
    });
}

}
