import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { UpdateUserDTO } from './dto';
import { UserService } from './user.service';
import { Body, Controller, Patch, UseGuards, Req, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @ApiTags('API')
    @ApiResponse({ status: 200, type: UpdateUserDTO })
    @Patch()
    updateUser(@Body() updateDto: UpdateUserDTO, @Req() request): Promise<UpdateUserDTO> {

        const user = request.user

        return this.userService.updateUser(user.email, updateDto);
    }
    @UseGuards(JwtAuthGuard)
    @ApiTags('API')
    @Delete()
    deleteUser(@Req() request): Promise<boolean> {

        const user = request.users
        return this.userService.deleteUser(user.email)
    }

}
