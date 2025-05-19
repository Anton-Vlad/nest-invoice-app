import { Body, Controller, Query, Get, Param, UseGuards, HttpException, HttpStatus, Req, Request } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { PaginationQueryDto } from 'src/dto/pagination-quesy.dto';
import { InvoiceDto } from 'src/dto/invoice.dto';
import { Invoice, Prisma } from '@prisma/client';

@Controller('invoices')
export class InvoiceController {
    constructor(
        private readonly invoiceService: InvoicesService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getInvoices(@Request() req, @Query() query: PaginationQueryDto) {
        try {
            const page = query.page ? Number(query.page) : 1;
            const limit = query.limit ? Number(query.limit) : 10;
            const skip = (page - 1) * limit;

            const total = await this.invoiceService.countInvoices({ user_id: req.user.id });
            const invoices = await this.invoiceService.findAll({
                skip,
                take: limit,
                where: {
                    user_id: req.user.id
                }
            });

            const formattedInvoices = invoices.map((invoice: Invoice) => InvoiceDto.fromEntity(invoice));

            return {
                data: formattedInvoices,
                pagination: {
                    total,
                    page,
                    limit,
                    pageCount: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Request() req, @Param('id') id: string) {
        try {
            if (!id.match(/^\d+$/)) {
                throw new HttpException('Invalid invoice ID format', HttpStatus.BAD_REQUEST);
            }

            const invoice = await this.invoiceService.findOne(id, { user_id: req.user.id });

            if (!invoice) {
                throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
            }

            const formattedInvoice = InvoiceDto.fromEntity(invoice);

            return { data: formattedInvoice };
        } catch (error) {
            throw new HttpException(
                error.message || 'Error retrieving invoice',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}