import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  CreateTransactionFormSchema,
  type CreateTransactionFormValues,
} from "@/shared/schemas/transaction/createTransactionFormSchema";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TransactionFormProps {
  onSuccess?: () => void;
}

export function TransactionForm({ onSuccess }: TransactionFormProps) {
  const [isOtherProductType, setIsOtherProductType] = useState(false);

  const form = useForm<CreateTransactionFormValues>({
    resolver: zodResolver(CreateTransactionFormSchema),
    defaultValues: {
      transactionType: "profit",
      productType: "",
      amount: 0,
      note: "",
    },
  });

  const onSubmit = async (data: CreateTransactionFormValues) => {
    try {
      // Handle form submission logic here
      console.log("Form submitted:", data);
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="transactionType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Tabs
                  value={field.value}
                  onValueChange={field.onChange}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="profit">Profit</TabsTrigger>
                    <TabsTrigger value="cost">Cost</TabsTrigger>
                    <TabsTrigger value="ivistation">Ivistation</TabsTrigger>
                  </TabsList>
                </Tabs>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Type</FormLabel>
              <Select
                onValueChange={(value: string) => {
                  if (value === "other") {
                    setIsOtherProductType(true);
                    field.onChange("");
                  } else {
                    setIsOtherProductType(false);
                    field.onChange(value);
                  }
                }}
                className="w-full"
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="digital">Digital Product</SelectItem>
                  <SelectItem value="physical">Physical Product</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="subscription">Subscription</SelectItem>
                  <SelectItem value="other">Other...</SelectItem>
                </SelectContent>
              </Select>
              {isOtherProductType && (
                <FormControl>
                  <Input
                    placeholder="Specify product type"
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value}
                    className="mt-2"
                  />
                </FormControl>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes here..."
                  className="resize-none min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full cursor-pointer"
          variant={"neutral"}
          size="lg"
          type="submit"
        >
          Submit Transaction
        </Button>
      </form>
    </Form>
  );
}
