import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Check, FileImage } from "lucide-react";

interface ReceiptResultProps {
  error: Error,
  result: any
}

export function ReceiptResult({ error, result }: ReceiptResultProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
        <CardDescription>Receipt type and extracted financial information</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        {result ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 p-2 rounded-full">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Receipt Type</p>
                <p className="text-sm text-gray-500 capitalize">{result.receipt_type}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Financial Details</h3>
              {result.receipt_type === "expense" || result.receipt_type === "store" ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Amount:</span>
                    <span className="font-medium">
                      {result.amount} {result.currency || ""}
                    </span>
                  </div>
                  {result.items && result.items.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-1">Items:</p>
                      <ul className="text-sm space-y-1">
                        {result.items.map((item: any, index: number) => (
                          <li key={index} className="flex justify-between">
                            <span>{item.name}</span>
                            <span>
                              {item.price} {result.currency || ""}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : result.receipt_type === "income" ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Received Amount:</span>
                    <span className="font-medium text-green-600">
                      {result.amount} {result.currency || ""}
                    </span>
                  </div>
                  {result.source && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Source:</span>
                      <span>{result.source}</span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No financial details extracted</p>
              )}
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Extracted Text</h3>
              <div className="bg-gray-50 p-3 rounded-md text-sm max-h-[200px] overflow-y-auto">
                <pre className="whitespace-pre-wrap">{result.extracted_text}</pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center text-gray-500">
            <FileImage className="h-10 w-10 mb-2 opacity-30" />
            <p>Upload and analyze a receipt to see results</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
