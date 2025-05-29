export interface BaseResponse {
    message: string,
    pagination: Pagination,
    isSuccess: boolean
}

export interface Pagination {
    pageNumber: number,
    pageSize: number,
    totalItems: number
}