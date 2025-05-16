import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './Models/user.service';
import { InvoicesService } from './Models/invoice.service';
import { PrismaService } from './Models/prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, UsersService, InvoicesService],
})
export class AppModule {}
