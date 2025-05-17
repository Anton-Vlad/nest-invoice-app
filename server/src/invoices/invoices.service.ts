import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Invoice, Prisma } from '@prisma/client';

@Injectable()
export class InvoicesService {
    constructor(private prisma: PrismaService) { }

    async findOne(
        id: string,
    ): Promise<Invoice | null> {
        const numberId = parseInt(id, 10);

        if (isNaN(numberId)) {
            throw new Error('Invalid invoice ID format');
        }

        return this.prisma.invoice.findUnique({
            where: { id: numberId },
        });
    }

    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.InvoiceWhereUniqueInput;
        where?: Prisma.InvoiceWhereInput;
        orderBy?: Prisma.InvoiceOrderByWithRelationInput;
    }): Promise<Invoice[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.invoice.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async countInvoices(where?: Prisma.InvoiceWhereInput): Promise<number> {
        return this.prisma.invoice.count({ where });
    }

    async createInvoice(data: Prisma.InvoiceCreateInput): Promise<Invoice> {
        return this.prisma.invoice.create({
            data,
        });
    }

    async updateInvoice(params: {
        where: Prisma.InvoiceWhereUniqueInput;
        data: Prisma.InvoiceUpdateInput;
    }): Promise<Invoice> {
        const { data, where } = params;
        return this.prisma.invoice.update({
            data,
            where,
        });
    }

    async deleteInvoice(where: Prisma.InvoiceWhereUniqueInput): Promise<Invoice> {
        return this.prisma.invoice.delete({
            where,
        });
    }
}