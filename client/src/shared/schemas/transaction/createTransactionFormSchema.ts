import { z } from "zod";

const formSchema = z.object({
  transactionType: z.enum(["cost", "profit", "investments"], {
    message:
      "Transaction type must be one of the following: 'cost', 'profit', 'investments'.",
  }),
  productType: z
    .string()
    .min(1, {
      message: "Product type is required.",
    })
    .max(100, {
      message: "Product type must be at most 100 characters.",
    }),
  amount: z.number().int().min(1, {
    message: "Amount must be a positive integer.",
  }),
  note: z
    .string()
    .max(255, {
      message: "Note must be at most 255 characters.",
    })
    .optional(),
});

export type CreateTransactionFormValues = z.infer<typeof formSchema>;

export const CreateTransactionFormSchema = formSchema;
