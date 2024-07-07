export class PaginationMetadata {
    totalItems: number;
    currentPage: number;
    pageSize: number;
  
    constructor(totalItems: number, currentPage: number, pageSize: number) {
      this.totalItems = totalItems;
      this.currentPage = currentPage;
      this.pageSize = pageSize;
    }
  }