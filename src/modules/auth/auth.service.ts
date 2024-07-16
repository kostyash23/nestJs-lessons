import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CrateUserDTO } from '../user/dto';
import { AppErrors } from 'src/common/constants/errors';
import { LoginUserDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { AuthUserResponce } from './responce';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) { }

    async registerUser(dto: CrateUserDTO): Promise<CrateUserDTO> {

        try {
            const existUser = await this.userService.findUserByEmail(dto.email)
            if (existUser) throw new BadRequestException(AppErrors.USER_EXIST)
            return this.userService.createUser(dto)

        } catch (error) {
            throw new Error(error)
        }

    }

    async loginUser(dto: LoginUserDTO): Promise<AuthUserResponce> {

        try {
            const existUser = await this.userService.findUserByEmail(dto.email);
            if (!existUser) throw new BadRequestException(AppErrors.USER_NOT_EXIST);

            const validatePassword = await bcrypt.compare(dto.password, existUser.password)
            if (!validatePassword) throw new BadRequestException(AppErrors.WRONG_DATA)


            const user = await this.userService.publicUser(dto.email)
            const token = await this.tokenService.generateJwtToken(user);


            return { user, token }

        } catch (error) {
            throw new Error(error)
        }

    }
}


