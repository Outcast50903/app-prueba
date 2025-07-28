"use client";
import React from "react";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { CustomLoader } from "./custom-loader";
import { EmptyContent } from "./empty-content";

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends Record<string, any>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];

export function SearchBar<T extends Record<string, any>>({   
  data,
  keys,
  debounceTime = 300,
  renderComponent,
  className,
  placeholder,
  isLoadingData = false,
  emptyText,
  headers,
}: { 
  data: T[];
  keys: RecursiveKeyOf<T>[];
  debounceTime?: number;
  renderComponent: (results: T, index: number) => React.ReactNode;
  placeholder?: string;
  className?: string;
  isLoadingData?: boolean;
  emptyText?: string;
  headers?: string[];
}) {
  const [filteredResults, setFilteredResults] = useState<T[]>(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const filterData = useCallback((query: string): T[] => {
    if (!query.trim()) return data;

    return data.filter((item: T) => {
      return keys.some((key) => {
        const keys = key.split(".");
        let value: any = item;

        for (const k of keys) {
          value = value?.[k];
          if (value === undefined) return false;
        }
        const itemValue = value;
        if (typeof itemValue === 'string') {
          return itemValue.toLowerCase().includes(query.toLowerCase());
        }
        if (typeof itemValue === 'number') {
          return itemValue.toString().includes(query);
        }
        return false;
      });
    });
  }, [data, keys]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    
    if (searchQuery.trim().length > 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setFilteredResults(data);
      setDebouncedQuery("");
      return;
    }
    
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, debounceTime);
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [searchQuery, debounceTime]);

  useEffect(() => {
    setFilteredResults(filterData(debouncedQuery));
    setIsLoading(false);
  }, [debouncedQuery, filterData]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-1 gap-2 flex-col size-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder={placeholder || "Search"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border-gray-200 focus:border-purple-500 focus:ring-purple-500"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="animate-spin h-4 w-4 text-purple-500" />
          </div>
        )}
      </div>
      {!isLoading && searchQuery && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            Results found: {filteredResults.length}
          </p>
        </div>
      )}
      <div className="flex-1 flex justify-center items-center gap-2 flex-col my-4"> 
        {(isLoading || isLoadingData) && (
          <div className="flex items-center justify-center w-full h-auto">
            <CustomLoader />
          </div>  
        )}
        {!(isLoading || isLoadingData) && filteredResults.length === 0 && (
          <div className="flex items-center justify-center w-full h-auto">
            <EmptyContent message={emptyText || "No results found"} />
          </div>
        )}
        {filteredResults.length > 0 && (
          <table className={cn("flex-col gap-2 w-full", className)}>
            {headers && (
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index} className="text-sm text-gray-500 text-left">{header}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {!(isLoading || isLoadingData) && filteredResults?.map((item, index) => (
                <tr key={item.id ?? index}>
                  {renderComponent(item, index)}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </form>
  );
}