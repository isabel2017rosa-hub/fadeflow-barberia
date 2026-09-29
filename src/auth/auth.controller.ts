import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard, AuthenticatedRequest } from './guards/jwt-auth.guard';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') register(@Body() dto: RegisterDto) { return this.authService.register(dto); }
  @Post('login') login(@Body() dto: LoginDto) { return this.authService.login(dto); }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me') me(@Req() req: AuthenticatedRequest) { return this.authService.me(req.user.sub); }
}
