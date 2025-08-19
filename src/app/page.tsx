"use client";

import { useEffect, useState } from "react";
import { Advocate, AdvocatesResponse } from "@/types/advocate";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-debounce";
import { AdvocateSearch, AdvocateTable } from "@/components/advocate";
import { Logo } from '@/components/brand/Logo';

export default function Home(): JSX.Element {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Debounce search input to prevent excessive filtering
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/api/advocates");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonResponse: AdvocatesResponse = await response.json();
        setAdvocates(jsonResponse.data);
      } catch (err) {
        console.error("Error fetching advocates:", err);
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAdvocates();
  }, [toast]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleResetSearch = () => {
    setSearch("");
  };

  return (
    <main className="container mx-auto p-6 max-w-8xl">
      <div className="space-y-6">
        <div>
          <div className="flex items-center">
            <Logo className="h-7 w-auto" />
            <div className="text-2xl tracking-tight text-gold">Advocates</div>
          </div>
          
          <p className="text-muted-foreground">Search and filter through our network of advocates</p>
        </div>

        <AdvocateSearch
          search={search}
          onSearchChange={handleSearchChange}
          onReset={handleResetSearch}
          debouncedSearch={debouncedSearch}
        />

        {loading && (
          <div className="space-y-3">
            <Skeleton className="h-4 w-[600px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        )}

        {error && (
          <div className="rounded-md bg-destructive/15 p-4">
            <p className="text-sm text-destructive">Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <AdvocateTable advocates={advocates} searchTerm={debouncedSearch} />
        )}
      </div>
    </main>
  );
}
