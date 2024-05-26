import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { SignInDto } from '../dto/signIn.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY, //'Hard_To_Get'
    });
  }

  async validate(signInDto: SignInDto): Promise<any> {
    const user = await this.authService.signIn(signInDto);
    if (!user) {
      throw new UnauthorizedException('Login First');
    }

    return user;
  }
  async validateAdmin(signInDto: SignInDto): Promise<any> {
    const user = await this.authService.signInAdmin(signInDto);
    if (!user) {
      throw new UnauthorizedException('Login First');
    }

    return user;
  }
}
