import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt'
import { CrateUserDTO, UpdateUserDTO } from './dto';
import { Watchlist } from '../watchlist/models/watchlist.model';


@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userReposytory: typeof User) { }

    async hashPass(password: string): Promise<string> {
        try {
            return bcrypt.hash(password, 10)
        } catch (error) {
            throw new Error(error)
        }

    }

    async findUserByEmail(email: string): Promise<User> {
        try {
            return await this.userReposytory.findOne({
                where: { email }, include: {
                    model: Watchlist, required: false
                }
            })
        } catch (error) {
            throw new Error(error)
        }

    }

    async createUser(dto: CrateUserDTO): Promise<CrateUserDTO> {
        dto.password = await this.hashPass(dto.password);
        await this.userReposytory.create({
            firstName: dto.firstName,
            userName: dto.userName,
            email: dto.email,
            password: dto.password
        })
        return dto
    }

    async publicUser(email: string): Promise<User> {
        try {
            return this.userReposytory.findOne({
                where: { email },
                include: {
                    model: Watchlist,
                    required: false
                },
                attributes: { exclude: ['password'] }
            })

        } catch (error) {
            throw new Error(error)
        }

    }

    async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
        try {
            await this.userReposytory.update(dto, { where: { email } })

            return dto

        } catch (error) {
            throw new Error(error)
        }


    }

    async deleteUser(email: string): Promise<boolean> {
        try {
            this.userReposytory.destroy({ where: { email } })
            return true

        } catch (error) {
            throw new Error(error)
        }
    }
}
