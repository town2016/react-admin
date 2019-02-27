export const INIT_PAGINATION = {
    pageNum: 1,
    pageSize: 10,
    total: 0
};

export class Pagination {
    pageNum: number;
    pageSize: number;
    total: number;
    size: number;
    pages: number;
    current: number;
    constructor(data) {
        this.pageNum = data.pageNum;
        this.pageSize = data.pageSize;
        this.total = data.total || 0;
        this.size = data.size;
        this.pages = data.pages;
        this.current = data.pageNum;
    }

    static fromJSON(data) {
        return new Pagination(data);
    }
}
