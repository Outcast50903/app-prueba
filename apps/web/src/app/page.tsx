"use client"
import { useMutation, useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { deletePostParams, type DeletePostParams, insertPostParams, type InsertPostParams } from "@workspace/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormProvider } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";
import { Item } from "./_components/item";

export default function Home() {
  const form = useForm<z.infer<typeof insertPostParams>>({
    resolver: zodResolver(insertPostParams),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());
  const posts = useQuery(trpc.post.getAll.queryOptions());
  const createMutation = useMutation(
    trpc.post.create.mutationOptions({
      onSuccess: () => {
        posts.refetch();
      },
    }),
  );
  const deleteMutation = useMutation(
    trpc.post.delete.mutationOptions({
      onSuccess: () => { 
        posts.refetch();
      },
    }),
  );

  const handleAddTodo = (data: InsertPostParams) => {
    const parsedData = insertPostParams.safeParse(data);
    if (parsedData.success) {
      createMutation.mutate(parsedData.data);
    }
  };

  const handleDeleteTodo = (id: DeletePostParams["id"]) => {
    const parsedData = deletePostParams.safeParse({ id });
    if (parsedData.success) {
      deleteMutation.mutate(parsedData.data);
    }
  };
  
  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">API Status</h2>
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${healthCheck.data ? "bg-green-500" : "bg-red-500"}`}
              />
              <span className="text-sm text-muted-foreground">
                {healthCheck.isLoading
                  ? "Checking..."
                  : healthCheck.data
                    ? "Connected"
                    : "Disconnected"}
              </span>
            </div>
        </section>
      </div>
      <div className="mx-auto w-full max-w-md py-10">
        <Card>
          <CardHeader>
            <CardTitle>Post List</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <SearchBar
              data={posts.data || []}
              keys={["name", "description"]}
              renderComponent={(item) => (
                <Item
                  {...item}
                  onDelete={handleDeleteTodo}
                />
              )}
              headers={["Name", "Description", "Actions"]}
              className="mb-4"
              emptyText="No posts found"
            />
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleAddTodo)} className="flex flex-row gap-4 justify-between w-full items-center">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                    maxLength: {
                      value: 64,
                      message: "Name must be less than 64 characters",
                    },
                    minLength: {
                      value: 1,
                      message: "Name must be at least 1 character",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={createMutation.isPending}
                          aria-label="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  rules={{
                    required: {
                      value: true,
                      message: "Description is required",
                    },
                    maxLength: {
                      value: 256,
                      message: "Description must be less than 256 characters",
                    },
                    minLength: {
                      value: 1,
                      message: "Description must be at least 1 character",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          disabled={createMutation.isPending}
                          aria-label="description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mr-1" disabled={createMutation.isPending}>
                  {`Sav${createMutation.isPending ? "ing..." : "e"}`}
                </Button>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
