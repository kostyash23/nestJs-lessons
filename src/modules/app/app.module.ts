import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from '../../configurations';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from 'src/token/token.module';
import { WatchlistModule } from '../watchlist/watchlist.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configurations]
  }),
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configServices: ConfigService) => ({
      dialect: 'postgres',
      host: configServices.get('db_host'),
      port: configServices.get('db_port'),
      username: configServices.get('db_name'),
      password: configServices.get('db_password'),
      database: configServices.get('db_name'),
      synchronize: true,
      autoLoadModels: true,
      models: []

    })
  }),
    UserModule,
    AuthModule,
    TokenModule,
    WatchlistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
