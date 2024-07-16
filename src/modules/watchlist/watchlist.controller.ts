import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CreateAssetsResponce } from './responce';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('watchlist')
export class WatchlistController {
    constructor(private readonly watchlistService: WatchlistService) { }

    @ApiTags('API')
    @ApiResponse({ status: 201, type: CreateAssetsResponce })
    @UseGuards(JwtAuthGuard)
    @Post('create')
    createAssets(@Body() assets: WatchlistDTO, @Req() request): Promise<CreateAssetsResponce> {
        const user = request.user

        return this.watchlistService.createAsset(user, assets)
    }

    @Get('get-all')
    getAllAssets() {
        return
    }

    @Patch('updates')
    updateAsset() {
        return
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteAsset(@Query('id') assetId: string, @Req() request): Promise<boolean> {

        const { id } = request.user
        return this.watchlistService.deleteAsset(id, assetId)
    }



}
