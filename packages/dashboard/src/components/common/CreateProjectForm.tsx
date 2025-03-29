
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Workspace } from '@/lib/types';

const projectSchema = z.object({
  name: z.string().min(3, { message: 'Project name must be at least 3 characters' }).max(50),
  description: z.string().max(200).optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface CreateProjectFormProps {
  workspaces: Workspace[];
  activeWorkspace: Workspace;
  onSubmit: (data: ProjectFormValues) => void;
  onCancel: () => void;
}

const CreateProjectForm = ({
  workspaces,
  activeWorkspace,
  onSubmit,
  onCancel,
}: CreateProjectFormProps) => {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const handleSubmit = (data: ProjectFormValues) => {
    try {
      onSubmit(data);
      toast.success('Project created successfully');
      form.reset();
    } catch (error) {
      toast.error('Failed to create project');
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            Create Project in "{activeWorkspace.name}"
          </h2>
          <p className="text-sm text-muted-foreground">
            Create a new project to organize your diagnostic scripts
          </p>
        </div>

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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the purpose of this project"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button type="submit">Create Project</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateProjectForm;
