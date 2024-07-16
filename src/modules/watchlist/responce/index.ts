import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateAssetsResponce {
    @ApiProperty()
    @IsNumber()
    user: number

    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    assetId: string
}