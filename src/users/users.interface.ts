export interface CreateUserInterface {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  storeId?: string;
  companyId?: string;
}

export enum UserRole {
  'STORE_ADMIN' = 'STORE_ADMIN',
}
