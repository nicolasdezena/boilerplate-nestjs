import { Injectable } from '@nestjs/common';
import { utils } from 'src/utils';
import { CreateUserInterface } from './users.interface';
import * as yup from 'yup';

const yupConfig = {
  strict: false,
  abortEarly: true,
  stripUnknown: true,
  recursive: true,
};

@Injectable()
export class UsersValidators {
  constructor() {}

  async newValidateCreateUser(data: CreateUserInterface) {
    let validator = yup.object({
      email: yup
        .string()
        .email({
          msg: 'E-mail inválido',
          statusCode: 400,
          code: 'invalid-email',
        })
        .required({
          msg: 'E-mail é obrigatório',
          statusCode: 400,
          code: 'required-email',
        }),
      name: yup
        .string()
        .required({
          msg: 'E-mail é obrigatório',
          statusCode: 400,
          code: 'name-required',
        })
        .test(async function (name: string) {
          const { path, createError } = this;

          name = name.trim();

          if (!name.split(' ')[1]) {
            return createError({
              path,
              message: {
                msg: 'Digite seu nome completo',
                statusCode: 400,
                code: 'name-invalid',
              },
            });
          }

          return true;
        }),
      password: yup.string().required({
        msg: 'Senha é obrigatória',
        statusCode: 400,
        code: 'password-required',
      }),
      passwordConfirmation: yup
        .string()
        .required({
          msg: 'Confirmação de senha é obrigatório',
          statusCode: 400,
          code: 'password-confirmation-required',
        })
        .test(async function (passwordConfirmation: string) {
          const { path, createError } = this;

          if (passwordConfirmation !== data.password) {
            return createError({
              path,
              message: {
                msg: 'Senha e confirmação são diferentes',
                statusCode: 400,
                code: 'password-confirm-password-invalid',
              },
            });
          }

          return true;
        }),
    });

    return validator.validate(data, yupConfig);
  }
}
