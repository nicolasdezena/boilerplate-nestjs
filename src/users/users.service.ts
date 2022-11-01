import { Injectable } from '@nestjs/common';
import { utils } from 'src/utils';
import { CreateUserInterface, UserRole } from './users.interface';
import { UserRepository } from './users.repository';
import { UsersValidators } from './users.validators';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private userValidator: UsersValidators,
  ) {}

  async newStoreUser(data: CreateUserInterface) {
    try {
      await this.userValidator.newValidateCreateUser(data);
    } catch (e) {
      return utils.makeException(e.errors[0]);
    }

    let alreadyExistsUser = await this.userRepository.findUserByEmail(
      data.email,
    );

    if (alreadyExistsUser) {
      return utils.makeException({
        msg: 'E-mail já cadastrado',
        statusCode: 400,
        code: 'email-already-exist',
      });
    }

    let pass = hashSync(data.password, 8);

    return this.userRepository.createStoreAdminUser(
      data.name,
      data.email,
      pass,
      UserRole.STORE_ADMIN,
      data.companyId,
      data.storeId,
    );
  }
  async sendEmailRessetPass(email: string) {
    if (!email || email.trim() === '') {
      return utils.makeException({
        msg: 'E-mail não enviado',
        code: 'email-not-sended',
        statusCode: 400,
      });
    }

    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      return utils.makeException({
        msg: 'E-mail não enviado',
        code: 'user-not-register',
        statusCode: 400,
      });
    }

    let code = utils.generateAleatoryCharaters(4, true, false);

    await this.userRepository.setRessetEmailCode(user._id.toString(), code);

    return {
      msg: 'E-mail enviado com sucesso, verifique sua caixa de entrada ou a caixa de spam',
    };
  }

  async setNewPass(
    email: string,
    code: string,
    password: string,
    passwordConfirmation: string,
  ) {
    if (!email || email.trim() === '') {
      return utils.makeException({
        msg: 'E-mail não enviado',
        code: 'email-not-sended',
        statusCode: 400,
      });
    }

    if (!code || code.trim() === '') {
      return utils.makeException({
        msg: 'Código não enviado',
        code: 'code-not-sended',
        statusCode: 400,
      });
    }

    if (!password || password.trim() === '') {
      return utils.makeException({
        msg: 'Senha não enviada',
        code: 'email-not-sended',
        statusCode: 400,
      });
    }

    if (!passwordConfirmation || passwordConfirmation.trim() === '') {
      return utils.makeException({
        msg: 'Confirmação de senha não enviada',
        code: 'password-confirmation-not-sended',
        statusCode: 400,
      });
    }

    if (passwordConfirmation !== password) {
      return utils.makeException({
        msg: 'Senha e confirmação de senha diferentes',
        code: 'password-diff-password-confirmation',
        statusCode: 400,
      });
    }

    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      return utils.makeException({
        msg: 'E-mail não enviado',
        code: 'user-not-register',
        statusCode: 400,
      });
    }

    if (user.ressetEmailCode !== code) {
      return utils.makeException({
        msg: 'Código inválido',
        code: 'invalid-code',
        statusCode: 400,
      });
    }

    await this.userRepository.setPass(
      user._id.toString(),
      hashSync(password, 8),
    );

    return { msg: 'Senha alterada com sucesso' };
  }

  async findOne(userId: string) {
    return this.userRepository.findUserById(userId);
  }

  async deleteOne(userId: string) {
    await this.userRepository.deleteOne(userId);
    return { msg: 'Deletado com sucesso' };
  }

  async setOnesignalId(userId: string, oneSignalId: string) {
    await this.userRepository.setOnesignalId(userId, oneSignalId);
    return { msg: 'Salvo com sucesso' };
  }
}
