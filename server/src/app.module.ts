import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { InvoicesService } from './invoices/invoices.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService, PrismaService, UsersService, InvoicesService],
})
export class AppModule {}
