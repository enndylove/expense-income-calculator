import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  CreateProjectsFormSchema,
  type CreateProjectsFormValues,
} from "@/shared/schemas/project/createProjectFormSchema"
import { currencies } from "@/shared/constants/currencies"
import { Check, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useRef, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { businessActivities } from "@/shared/constants/businnessActivities"
import { CreateProjectEndpoint } from "@/api/projects/create"

interface CreateProjectsProps {
  onSuccess?: () => void
}

export function CreateProjectsForm({ onSuccess }: CreateProjectsProps) {
  const form = useForm<CreateProjectsFormValues>({
    resolver: zodResolver(CreateProjectsFormSchema),
    defaultValues: {
      plan: "personal",
      name: "",
      currency: "",
      businessActivity: "",
    },
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter currencies based on search term
  const filteredCurrencies = Object.entries(currencies).filter(([code, currency]) => {
    const lowerSearchTerm = searchTerm.toLowerCase()
    return (
      code.toLowerCase().includes(lowerSearchTerm) ||
      currency.name.toLowerCase().includes(lowerSearchTerm) ||
      currency.symbolNative.includes(searchTerm)
    )
  })

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const createProjectMutation = useMutation({
    mutationKey: ["create-project"],
    mutationFn: (values: CreateProjectsFormValues) => {
      return CreateProjectEndpoint({
        plan: values.plan,
        name: values.name,
        currency: values.currency,
        businessActivity: values.businessActivity,
      })
    },
    onSuccess: () => {
      toast.success("Project created", {
        description: "Your new project has been created successfully",
      })
      onSuccess?.()
      form.reset()
      setSearchTerm("")
    },
    onError: (err: Error) => {
      toast.error("Failed to create project", {
        description: err.message,
      })
    },
  })

  const onSubmit = async (data: CreateProjectsFormValues) => {
    createProjectMutation.mutate(data)
  }

  const handleCurrencySelect = (code: string) => {
    form.setValue("currency", code)
    const selectedCurrency = currencies[code]
    if (selectedCurrency) {
      setSearchTerm(`${code} - ${selectedCurrency.name}`)
    }
    setShowDropdown(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs
          defaultValue="personal"
          onValueChange={(value) => form.setValue("plan", value as "personal" | "business")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
          </TabsList>
        </Tabs>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Currency</FormLabel>
              <div className="relative">
                <div className="relative">
                  <Input
                    ref={inputRef}
                    placeholder="Search currency..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setShowDropdown(true)
                      // If search is cleared, also clear the selected currency
                      if (e.target.value === "") {
                        form.setValue("currency", "")
                      }
                    }}
                    onClick={() => setShowDropdown(true)}
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>

                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-50 mt-1 max-h-[300px] w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {filteredCurrencies.length > 0 ? (
                      filteredCurrencies.map(([code, currency]) => (
                        <div
                          key={code}
                          className={cn(
                            "flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm",
                            code === field.value
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-accent hover:text-accent-foreground",
                          )}
                          onClick={() => handleCurrencySelect(code)}
                        >
                          {code === field.value && <Check className="mr-2 h-4 w-4" />}
                          <span className="font-medium">{code}</span>
                          <span className="ml-2">{currency.symbolNative}</span>
                          <span className="ml-2 text-muted-foreground">{currency.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="px-2 py-1.5 text-sm text-muted-foreground">No currency found</div>
                    )}
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("plan") === "business" && (
          <FormField
            control={form.control}
            name="businessActivity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Activity</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business activity" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {businessActivities.map((activity) => (
                      <SelectItem key={activity} value={activity}>
                        {activity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button className="w-full cursor-pointer" size="lg" type="submit" disabled={createProjectMutation.isPending}>
          {createProjectMutation.isPending ? "Creating Project..." : "Create Project"}
        </Button>
      </form>
    </Form>
  )
}
