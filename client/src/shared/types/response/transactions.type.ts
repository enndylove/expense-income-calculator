export type Transaction = {
  id: string;
  accountId: string;
  transactionType: "cost" | "profit" | "investments";
  productType: string;
  amount: number;
  note?: string;
  createdAt: string;
  updatedAt: string;
};

export type TransactionPaginationMeta = {
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TransactionResponse = {
  data: Transaction[];
  meta: TransactionPaginationMeta;
};
