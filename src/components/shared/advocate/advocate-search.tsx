import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AdvocateSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
  debouncedSearch?: string;
}

export function AdvocateSearch({ search, onSearchChange, onReset, debouncedSearch }: AdvocateSearchProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleReset = () => {
    onReset();
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
    toast({
      title: "Search Reset",
      description: "Search has been cleared",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          ref={searchInputRef}
          placeholder="Search advocates..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleReset} variant="outline" className='bg-secondary' 
        style={{ background: 'linear-gradient(45deg,#deb260,#d39009)' }}>
          Reset Search
        </Button>
      </div>
      
      {search && (
        <p className="text-sm text-muted-foreground">
          Searching for: <span className="font-medium">{search}</span>
          {debouncedSearch && search !== debouncedSearch && (
            <span className="ml-2 text-xs text-muted-foreground">(updating...)</span>
          )}
        </p>
      )}
    </div>
  );
}