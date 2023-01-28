import NotFoundException from 'exceptions/NotFound.exception';
import LoginDto from 'utils/form/dto/Login.dto';
import AlreadyExistsException from 'exceptions/AlreadyExists.exception';
import CreateUserDto from 'services/user/CreateUser.dto';
import userModel from 'services/user/User.model';
import { compare, hash } from 'bcrypt';
import TokenData from 'interfaces/TokenData.interface';
import UserInterface from 'services/user/User.interface';
import DataStoredInToken from 'interfaces/DataStoredInToken.interface';
import { sign } from 'jsonwebtoken';
import WrongCredentialsException from 'exceptions/WrongCredentials.exception';
import { response } from 'express';
import HttpException from 'exceptions/HttpException.exception';
import { Document } from 'mongoose';
require('dotenv').config();

class AuthenticationService {
  public UserModel = userModel;

  public async register(userData: CreateUserDto) {
    const isUserExistsWithEmail = await this.UserModel.findOne({
      email: userData.email,
    });
    const isUserExistsWithMobile = await this.UserModel.findOne({
      mobile: userData.mobile,
    });

    console.log(isUserExistsWithEmail, isUserExistsWithMobile);

    if (isUserExistsWithEmail || isUserExistsWithMobile) {
      throw new AlreadyExistsException('User', 'Email/Mobile');
    }

    let hashedPassword: string = '';

    try {
      hashedPassword = await hash(userData.password, 10);
    } catch (error) {
      throw new HttpException(400, 'Failed to register');
    }

    let user: UserInterface;

    try {
      user = await this.UserModel.create({
        ...userData,
        password: hashedPassword,
      });
    } catch (error) {
      throw new HttpException(
        400,
        'Failed to create user. Please try again after sometime or contact our support tem'
      );
    }

    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);

    return {
      cookie,
      user,
    };
  }

  public async login(formData: LoginDto, isRememberMeEnabled: boolean = false) {
    let user: Document;
    try {
      user = await this.UserModel.findOne({
        email: formData.email,
      });
    } catch (error) {
      throw new HttpException(400, 'Something went wrong');
    }

    if (!user) {
      throw new NotFoundException('User');
    }

    let isPasswordMatching: boolean;
    try {
      isPasswordMatching = await compare(
        formData.password,
        user.get('password', null, { getters: false })
      );
    } catch (error) {
      throw new HttpException(400, 'Something went wrong. Try after sometime');
    }

    if (!isPasswordMatching) {
      throw new WrongCredentialsException();
    }

    const tokenData: TokenData = this.createToken(user, isRememberMeEnabled);
    const cookie = this.createCookie(tokenData);

    return {
      user,
      cookie,
    };
  }

  public createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}; Path=/;`;
  }

  public createToken(
    user: UserInterface | Document,
    isRememberMeEnabled: boolean = false
  ) {
    // If remember me then 15 days expiry else 1 day expiry
    const expiresIn = isRememberMeEnabled ? 15 * 60 * 60 : 60 * 60;
    const secret = process.env.JWT_SECRET;

    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };

    return {
      expiresIn,
      token: sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthenticationService;
