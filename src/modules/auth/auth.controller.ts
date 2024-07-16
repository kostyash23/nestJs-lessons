import { Body, Controller, Post } from '@nestjs/common';
import { CrateUserDTO } from '../user/dto';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto';
import { AuthResponce, AuthUserResponce } from './responce';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @ApiTags('API')
    @ApiResponse({ status: 201, type: CrateUserDTO })
    @Post('register')
    registerUser(@Body() dto: CrateUserDTO): Promise<CrateUserDTO> {
        return this.authService.registerUser(dto)
    }

    @ApiTags('API')
    @ApiResponse({ status: 200, type: AuthResponce })
    @Post('login')
    loginUser(@Body() dto: LoginUserDTO): Promise<AuthUserResponce> {

        return this.authService.loginUser(dto)
    }

}