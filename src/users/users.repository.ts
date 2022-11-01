import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './users.entity';
import { UserRole } from './users.interface';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createStoreAdminUser(
    name: string,
    email: string,
    password: string,
    role: UserRole,
    companyId: string,
    storeId: string,
  ) {
    let user: UserDocument = {
      name,
      email,
      password,
      role,
      companyId: new Types.ObjectId(companyId),
      storeIds: [new Types.ObjectId(storeId)],
    } as UserDocument;

    return this.userModel.create(user);
  }

  async findUserByCellphone(cellphone: string) {
    return this.userModel.findOne({ cellphone: cellphone });
  }

  async setEmailAndPass(userId: string, email: string, password: string) {
    return this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      {
        $set: {
          email,
          password,
        },
      },
    );
  }

  async findUserById(id: string) {
    return this.userModel.findOne({ _id: new Types.ObjectId(id) });
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async updateCellphoneByUserId(id: string, cellphone: string) {
    return this.userModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: { cellphone } },
    );
  }

  async setCellphoneIsValid(id: string) {
    return this.userModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: { cellphoneIsValid: true } },
    );
  }

  async removeTokenPass(userId: string) {
    return this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      {
        $unset: {
          tokenPass: true,
        },
      },
    );
  }

  async setCodePass(_id: string, code: string) {
    return this.userModel.updateOne(
      { _id: new Types.ObjectId(_id) },
      {
        $set: {
          tokenPass: code,
        },
      },
    );
  }

  async deleteOne(_id: string) {
    return this.userModel.findByIdAndDelete(_id);
  }

  async setOnesignalId(userId: string, oneSignalId: string) {
    return this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      {
        $set: {
          oneSignalId: oneSignalId,
        },
      },
    );
  }

  async setRessetEmailCode(userId: string, ressetEmailCode: string) {
    return this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      {
        $set: {
          ressetEmailCode,
        },
      },
    );
  }

  async setPass(userId: string, password: string) {
    return this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      {
        $set: {
          password,
        },
        $unset: {
          ressetEmailCode: true,
        },
      },
    );
  }

  async setCompletedStep(userId: string, completedStepId: string) {
    return this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      {
        $push: {
          completedSteps: { stepId: completedStepId, date: new Date() },
        },
      },
    );
  }

  async setNoteAndObsInCompletedSte(userId: string, steps: any) {
    return this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      {
        $set: {
          completedSteps: steps,
        },
      },
    );
  }

  async saveAnamneseStep(
    userId: string,
    question: string,
    response: string[] | number[],
    anamneseId: string,
  ) {
    return this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      {
        $push: {
          anamnese: {
            anamneseId: new Types.ObjectId(anamneseId),
            question: question,
            response: response,
            date: new Date(),
          },
        },
      },
    );
  }

  removeLastAnamanseResponse(userId: string) {
    return this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      {
        $pop: { anamnese: 1 },
      },
    );
  }
}
