import { useMemo } from "react";
import { Advocate } from "@/types/advocate";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const formatPhoneNumber = (phoneNumber: number): string => {
  const phoneStr = phoneNumber.toString();
  if (phoneStr.length === 10) {
    return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
  }
  return phoneStr;
};

interface AdvocateTableProps {
  advocates: Advocate[];
  searchTerm: string;
}

export function AdvocateTable({ advocates, searchTerm }: AdvocateTableProps) {
  const filteredAdvocates = useMemo(() => {
    if (!searchTerm || searchTerm.length === 0 || searchTerm === "") return advocates;
    const q = searchTerm.toLowerCase();
    return advocates.filter((a) =>
      a.firstName.toLowerCase().includes(q) ||
      a.lastName.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.degree.toLowerCase().includes(q) ||
      a.specialties?.some((s) => s.toLowerCase().includes(q)) ||
      String(a.yearsOfExperience).includes(searchTerm) ||
      String(a.phoneNumber).includes(searchTerm)
    );
  }, [advocates, searchTerm]);
  return (
    <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
      <Table className="w-full">
        <TableHeader className="sticky top-0 z-10 bg-muted/60 backdrop-blur supports-[backdrop-filter]:bg-muted/40">
          <TableRow className="hover:bg-transparent">
            <TableHead className="h-10 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              First Name
            </TableHead>
            <TableHead className="h-10 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Last Name
            </TableHead>
            <TableHead className="h-10 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              City
            </TableHead>
            <TableHead className="h-10 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Degree
            </TableHead>
            <TableHead className="h-10 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Specialties
            </TableHead>
            <TableHead className="h-10 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Years of Experience
            </TableHead>
            <TableHead className="h-10 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Phone Number
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredAdvocates.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-10 text-center text-sm text-muted-foreground"
              >
                {searchTerm
                  ? "No advocates found matching your search."
                  : "No advocates available."}
              </TableCell>
            </TableRow>
          ) : (
            filteredAdvocates.map((a, i) => (
              <TableRow
                key={`${a.firstName}-${a.lastName}-${i}`}
                className="even:bg-muted/30 hover:bg-accent/40 transition-colors"
              >
                <TableCell className="py-3 font-medium">{a.firstName}</TableCell>
                <TableCell className="py-3">{a.lastName}</TableCell>
                <TableCell className="py-3">{a.city}</TableCell>
                <TableCell className="py-3">{a.degree}</TableCell>

                <TableCell className="py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {a.specialties?.map((s, idx) => {
                      const isMatch =
                        !!searchTerm &&
                        s.toLowerCase().includes(searchTerm.toLowerCase());
                      return (
                        <span
                          key={idx}
                          className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium
                            ${isMatch
                              ? "bg-primary text-primary-foreground border-transparent"
                              : "bg-accent text-accent-foreground border-border"
                            }`}
                        >
                          {s}
                        </span>
                      );
                    })}
                  </div>
                </TableCell>

                <TableCell className="py-3">{a.yearsOfExperience}</TableCell>
                <TableCell className="py-3 min-w-[140px]">{formatPhoneNumber(a.phoneNumber)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}