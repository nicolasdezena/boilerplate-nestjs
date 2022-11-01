import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Types } from 'mongoose';
import { use } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { utils } from 'src/utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    let user = await this.usersService.findOne(payload._id);
    if (!user) {
      return utils.makeException({ msg: 'Unauthorized', statusCode: 401 });
    }

    const storeId = req.headers['x-store-id'];
    if (!user.storeIds.map((s) => s.toString()).includes(storeId)) {
      return utils.makeException({ msg: 'Unauthorized', statusCode: 401 });
    }

    return { ...payload, storeId: storeId };
  }
}
