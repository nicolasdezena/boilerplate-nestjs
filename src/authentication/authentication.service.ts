import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/users/users.repository';
import { utils } from '../utils';
import { compareSync } from 'bcryptjs';
import { UserDocument } from 'src/users/users.entity';

interface Login {
  email?: string;
  password?: string;
  cellphone?: string;
}

interface FacebookLogin {
  email: string;
  facebookId: string;
  name: string;
}

interface GoogleLogin {
  email: string;
  googleId: string;
  name: string;
}

@Injectable()
export class AuthenticationService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(body: Login) {
    if (
      (!body.email || body.email === '') &&
      (!body.cellphone || body.cellphone === '')
    ) {
      return utils.makeException({
        msg: 'Digite um telefone ou um e-mail para fazer login',
        statusCode: 400,
        code: 'email-required',
      });
    }

    let user: false | UserDocument = false;

    if (body.email) {
      user = await this.userRepository.findUserByEmail(body.email);
    }
    if (body.cellphone) {
      user = await this.userRepository.findUserByCellphone(body.cellphone);
    }

    if (!user) {
      return utils.makeException({
        msg: 'E-mail ou senha inválidos',
        statusCode: 400,
        code: 'email-pass-invalid',
      });
    }

    if (!user.email || !user.password) {
      return utils.makeException({
        msg: 'Crie um email e uma senha',
        statusCode: 400,
        code: 'create-email-pass',
      });
    }

    const validPass = compareSync(body.password, user.password);
    if (!validPass) {
      return utils.makeException({
        msg: 'E-mail/Celular ou senha inválidos',
        statusCode: 400,
        code: 'email-pass-invalid',
      });
    }

    return {
      accessToken: `Bearer ${this.jwtService.sign(
        {
          _id: user._id,
          name: user.name,
        },
        {
          expiresIn: '360d',
        },
      )}`,
    };
  }
}
