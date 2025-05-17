import { IsEmail, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class InvoiceDto {
    id: number;
    vendor_name: string;
    amount: number;
    due_date: string;
    description?: string;
    user_id: number;
    paid: boolean;

    constructor(partial: Partial<InvoiceDto>) {
        Object.assign(this, partial);
    }

    static fromEntity(invoice: any): InvoiceDto {

        // Truncate description to 30 chars
        const description = invoice.description
            ? invoice.description.substring(0, 30)
            : '';

        // Format date to yyyy-mm-dd
        let formattedDate = invoice.due_date;
        if (invoice.due_date) {
            const date = new Date(invoice.due_date);
            if (!isNaN(date.getTime())) {
                formattedDate = date.toISOString().split('T')[0];
            }
        }

        return new InvoiceDto({
            id: invoice.id,
            vendor_name: invoice.vendor_name,
            amount: invoice.amont,
            due_date: formattedDate,
            description: description,
            user_id: invoice.user_id,
            paid: invoice.paid
        });
    }
}