/* eslint-disable react/no-array-index-key */
import { AlertTriangle, Check, Loader2 } from "lucide-react";
import React, { Suspense, memo } from "react";
import { CategoryFormDialog } from "@/components/elements/category/form";
import { useSearchCategories } from "@/components/elements/category/select/useSearchCategories";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchCategory } from "@/types/prisma";
import { cn } from "@/utils";

function SearchingLoader() {
  return (
    <div className="grid gap-2 p-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={`searching-loader-${i}`} className="h-8 w-full" />
      ))}
    </div>
  );
}

type CategoryItemProps = {
  category: SearchCategory;
  setOpen?: (value: boolean) => void;
  setCategory: (value: string) => void;
  value: string;
};

const CategoryItem = memo(
  ({ category, setOpen, setCategory, value }: CategoryItemProps) => {
    return (
      <CommandItem
        key={category.name}
        className="mt-2 flex items-center justify-between text-sm capitalize first:mt-0"
        onSelect={(currentValue) => {
          setCategory(currentValue);
          setOpen?.(false);
        }}
        value={category.name}
      >
        <div className="flex items-center">
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              category.name === value ? "opacity-100" : "opacity-0"
            )}
          />
          <span>{category.name}</span>
        </div>
        <span className="text-muted-foreground">
          {category._count.components}種類
        </span>
      </CommandItem>
    );
  }
);

function Categories({
  setOpen,
  setCategory,
  value,
}: {
  setOpen?: (value: boolean) => void;
  setCategory: (value: string) => void;
  value: string;
}) {
  const {
    categories,
    hasMore,
    onChangeQuery,
    isSearching,
    inputValue,
    setInputValue,
    fetchNextPage,
  } = useSearchCategories();

  return (
    <>
      <CommandInput
        isLoading={isSearching}
        onValueChange={(v) => {
          onChangeQuery(v);
          setInputValue(v);
        }}
        placeholder="Search category"
      />
      <CommandEmpty className="py-0 text-left text-sm">
        {isSearching ? (
          <SearchingLoader />
        ) : (
          <div className="flex w-full flex-col  gap-4 overflow-hidden px-1.5 py-4">
            <div className="flex justify-center">
              <AlertTriangle className="h-8 w-8 text-muted-foreground" />
            </div>

            <div className="grid gap-2">
              <p className="text-center text-muted-foreground">Not Found for</p>
              <code className="line-clamp-1 max-w-full rounded-md bg-secondary p-2 text-destructive ">
                {inputValue}
              </code>
            </div>
            <CategoryFormDialog
              defaultValue={inputValue}
              onCreated={(category) => {
                setCategory(category);
                setOpen?.(false);
              }}
            />
          </div>
        )}
      </CommandEmpty>

      <CommandGroup>
        {categories.map((category) => (
          <CategoryItem
            key={category.name}
            category={category}
            setCategory={setCategory}
            setOpen={setOpen}
            value={value}
          />
        ))}
      </CommandGroup>
      {hasMore && (
        <div className="mb-2 border-t  border-border px-1 pt-6">
          <Button
            className="w-full rounded-full"
            disabled={isSearching}
            onClick={() => fetchNextPage()}
            size="sm"
            variant="default"
          >
            {isSearching && <Loader2 className="mr-4 h-5 w-5 animate-spin" />}
            {isSearching ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </>
  );
}

type SearchCategoriesProps = {
  onSelected: (category: string) => void;
  setOpen?: (value: boolean) => void;
  value: string;
};

export function SelectCategories({
  onSelected: setCategory,
  setOpen,
  value,
}: SearchCategoriesProps) {
  return (
    <Command>
      <Suspense
        fallback={
          <>
            <CommandInput disabled isLoading placeholder="Searching..." />
            <SearchingLoader />
          </>
        }
      >
        <Categories setCategory={setCategory} setOpen={setOpen} value={value} />
      </Suspense>
    </Command>
  );
}
