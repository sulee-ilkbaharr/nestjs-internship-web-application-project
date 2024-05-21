import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { InternshipsModule } from './internship/internships.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    InternshipsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Nilhan1!.',
      database: 'internship-web-application',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    CompanyModule,
  ],
})
export class AppModule {}
