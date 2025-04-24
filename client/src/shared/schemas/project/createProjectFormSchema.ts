import { currencyList } from "@/shared/constants/currencyArray";
import { z } from "zod";

const currencyKeys = Object.keys(currencyList);

const formSchema = z.object({
  plan: z.enum(["personal", "business"], {
    errorMap: () => ({ message: "Plan must be either 'personal' or 'business'." }),
  }),
  name: z.string()
    .min(1, { message: "Project name is required." })
    .max(100, { message: "Project name must be at most 100 characters." }),
  currency: z.enum([...(currencyKeys as [string, ...string[]])], {
    errorMap: () => ({ message: "Currency must be one of the supported types." }),
  }),
  businessActivity: z.string().optional(),
})

export type CreateProjectsFormValues = z.infer<typeof formSchema>;

export const CreateProjectsFormSchema = formSchema;
