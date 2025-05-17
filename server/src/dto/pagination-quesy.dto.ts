export class PaginationQueryDto {
    page?: number;
    limit?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
}