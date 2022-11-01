import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserRole } from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authenticationService: AuthenticationService,
  ) {}

  @Post('/login')
  login(@Req() req): any {
    return this.authenticationService.login(req.body);
  }

  @Post('/patient/send-email-resset')
  sendEmailRessetPass(@Req() req): any {
    return this.userService.sendEmailRessetPass(req.body.email);
  }

  @Put('/patient/resset-pass')
  ressetPass(@Req() req): any {
    return this.userService.setNewPass(
      req.body.email,
      req.body.code,
      req.body.password,
      req.body.passwordConfirmation,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/patient')
  removeUser(@Req() req): any {
    return this.userService.deleteOne(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/patient')
  getPatient(@Req() req): any {
    return this.userService.findOne(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/set-onesignalid/:oneSignalId')
  setOnesignalId(@Req() req): any {
    return this.userService.setOnesignalId(
      req.user._id,
      req.params.oneSignalId,
    );
  }
}
