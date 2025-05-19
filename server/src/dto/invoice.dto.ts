import { IsEmail, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Invoice } from '@prisma/client';

export class InvoiceDto {
    id: number;
    vendor_name: string;
    amount: number;
    due_date: Date;
    description?: string;
    user_id: number;
    paid: boolean;

    constructor(partial: Partial<InvoiceDto>) {
        Object.assign(this, partial);
    }

    static fromEntity(invoice: Invoice): InvoiceDto {

        // Truncate bigger descriptions to 30 chars
        const description = invoice.description
            ? invoice.description.substring(0, 30)
            : '';

        return new InvoiceDto({
            id: invoice.id,
            vendor_name: invoice.vendor_name,
            amount: invoice.amount,
            due_date: invoice.due_date,
            description: description,
            user_id: invoice.user_id,
            paid: invoice.paid
        });
    }
}