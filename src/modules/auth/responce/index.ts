import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthResponce {
    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    userName: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    password: string

    @ApiProperty()
    @IsString()
    token: string
}

export class UserResponce {
    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    userName: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    password: string

}
export class AuthUserResponce {
    @ApiProperty()
    user: UserResponce

    @ApiProperty()
    @IsString()
    token: string
}