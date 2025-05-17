import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoicesService } from './invoices.service';
import { PrismaService } from '../prisma.service';


@Module({
    controllers: [InvoiceController],
    providers: [InvoicesService, PrismaService],
    exports: [InvoicesService],
})
export class InvoiceModule { }