import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pets/pet.entity';
import { OwnersModule } from './owners/owners.module';
import { Owner } from './owners/owner.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      //host: '172.17.0.1',
      host: 'localhost',
      port: 5438,
      username: 'admin',
      password: 'admin',
      database: 'pet_db',
      entities: [Pet, Owner],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
    PetsModule,
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
