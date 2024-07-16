import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { CreateAssetsResponce } from './responce';

@Injectable()
export class WatchlistService {
    constructor(@InjectModel(Watchlist) private readonly watchlistRepository: typeof Watchlist) { }

    async createAsset(user, dto): Promise<CreateAssetsResponce> {

        try {

            const watchList = {
                user: user.id,
                name: dto.name,
                assetId: dto.assetId
            }
            await this.watchlistRepository.create(watchList)
            return watchList

        } catch (error) {
            throw (error)
        }

    }
    async deleteAsset(userId: string, assetId: string): Promise<boolean> {

        try {
            await this.watchlistRepository.destroy({ where: { id: assetId, user: userId } })

            return true
        } catch (error) {
            throw Error(error)
        }
    }
}
