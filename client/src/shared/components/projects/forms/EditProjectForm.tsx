import { z } from "zod";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ProjectsMyAllResponseQuery } from "@/shared/types/response/projects.type";
import type { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { ProjecEditRequestQuery } from "@/shared/types/request/projects.type";
import { EditProjectEndpoint } from "@/api/projects/edit";
import { toast } from "sonner";
import { useMyProjects } from "@/hooks/projects/useMyProjects";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { businessActivities } from "@/shared/constants/businnessActivities";

const projectFormSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  businessActivity: z.string().optional(),
  currency: z.string().min(1, "Currency is required"),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface EditProjectFormProps {
  project: ProjectsMyAllResponseQuery;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export function EditProjectForm({
  project,
  setIsEditDialogOpen,
}: EditProjectFormProps) {
  const { refetch } = useMyProjects();

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: project.name || "",
      businessActivity: project.businessActivity || "",
      currency: project.currency || "",
    },
  });

  const updateMutation = useMutation({
    mutationKey: ["update-project"],
    mutationFn: (values: ProjecEditRequestQuery) => {
      return EditProjectEndpoint(values);
    },
    onError: (err) => {
      toast.error("Something went wrong.", {
        description: err.message,
      });
    },
    onSuccess: () => {
      toast.success(`Project updated.`);
      refetch();
      setIsEditDialogOpen(false);
    },
  });

  // Handle form submission
  const handleSubmit = (values: ProjectFormValues) => {
    updateMutation.mutate({
      id: project.id,
      name: values.name,
      businessActivity: values.businessActivity
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-left">Name</FormLabel>
                <div className="col-span-3">
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {project.plan === "business" && (
            <FormField
              control={form.control}
              name="businessActivity"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Business Activity</FormLabel>
                  <div className="col-span-3">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                  </div>
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-left">Currency</FormLabel>
                <div className="col-span-3">
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
