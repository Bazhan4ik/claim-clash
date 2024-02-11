import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Claim, ClaimSchema, Fact, FactSchema, Topic, TopicSchema } from './models';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Topic.name, schema: TopicSchema }, { name: Claim.name, schema: ClaimSchema }, { name: Fact.name, schema: FactSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}