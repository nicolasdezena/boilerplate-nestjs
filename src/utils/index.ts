import { HttpException } from '@nestjs/common';

export const utils = {
  removeChactersString(text: string, charactes: Array<string>) {
    charactes.forEach((c) => {
      text = text.split(c).join('');
    });

    return text;
  },

  makeException({
    msg,
    statusCode,
    code,
    data,
  }: {
    msg: string;
    statusCode: number;
    code?: string;
    data?: any;
  }) {
    let errorObject = {
      error: {
        msg,
        code,
      },
      data,
    };
    throw new HttpException(errorObject, statusCode);
  },
  calcSeconds(fullDateEnd: Date, fullDateFirst: Date): number {
    const hour = fullDateEnd.getHours() - fullDateFirst.getHours();
    const minutes = fullDateEnd.getMinutes() - fullDateFirst.getMinutes();
    const seconds = fullDateEnd.getSeconds() - fullDateFirst.getSeconds();
    return (hour * 60 + minutes) * 60 + seconds;
  },
  leftPad(value: number, totalWidth?: number, paddingChar?: string): string {
    var length = (totalWidth || 12) - value.toString().length + 1;
    return Array(length).join(paddingChar || '0') + value;
  },
  makeid(length: number) {
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  },
  validateCnpj(cnpj: string) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == '00000000000000' ||
      cnpj == '11111111111111' ||
      cnpj == '22222222222222' ||
      cnpj == '33333333333333' ||
      cnpj == '44444444444444' ||
      cnpj == '55555555555555' ||
      cnpj == '66666666666666' ||
      cnpj == '77777777777777' ||
      cnpj == '88888888888888' ||
      cnpj == '99999999999999'
    )
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros: any = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado: any = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  },
  validateCpf(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    )
      return false;
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
    return true;
  },
  validateTelephone(telephone: string) {
    return /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test(
      telephone,
    );
  },
  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  generateAleatoryCharaters(length: number, numbers: boolean, words: boolean) {
    let result = '';
    let characters = '';

    if (numbers) {
      characters += '1234567890';
    }

    if (words) {
      characters += 'abcdefghijklmnopqrstuvxyz';
    }

    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  },
  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  toSeoText(text: string) {
    let encodedUrl = text;
    encodedUrl = encodedUrl.split('&').join('e');
    encodedUrl = encodedUrl.replace(/[á|ã|â|à]/g, 'a');
    encodedUrl = encodedUrl.replace(/[é|ê|è]/g, 'e');
    encodedUrl = encodedUrl.replace(/[í|ì|î]/g, 'i');
    encodedUrl = encodedUrl.replace(/[õ|ò|ó|ô]/g, 'o');
    encodedUrl = encodedUrl.replace(/[ú|ù|û]/g, 'u');
    encodedUrl = encodedUrl.replace(/[ç]/g, 'c');
    encodedUrl = encodedUrl.replace(/[ñ]/g, 'n');

    encodedUrl = encodedUrl.replace(/[Á|Ã|À|Â|Ä|Å|Æ|ª]/g, 'A');
    encodedUrl = encodedUrl.replace(/[É|Ê|È|Ę|Ė|Ē|Ë]/g, 'E');
    encodedUrl = encodedUrl.replace(/[Í|Î|Ì|Ï|Į|Ī]/g, 'I');
    encodedUrl = encodedUrl.replace(/[Ó|Õ|Ô|Ò|º|Ö|Œ|Ø|Ō]/g, 'O');
    encodedUrl = encodedUrl.replace(/[Ú|Ü|Ù|Û|Ū]/g, 'U');
    encodedUrl = encodedUrl.replace(/[Ç]/g, 'C');
    encodedUrl = encodedUrl.replace(/[Ñ]/g, 'N');

    return encodedUrl;
  },
};
