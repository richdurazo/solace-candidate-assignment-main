import { useMemo } from "react";
import { Advocate } from "@/types/advocate";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AdvocateTableProps {
  advocates: Advocate[];
  searchTerm: string;
}

export function AdvocateTable({ advocates, searchTerm }: AdvocateTableProps) {
  const filteredAdvocates = useMemo(() => {
    if (!searchTerm || searchTerm.length === 0 || searchTerm === "") return advocates;
    return advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        String(advocate.yearsOfExperience).includes(searchTerm) ||
        String(advocate.phoneNumber).includes(searchTerm)
      );
    });
  }, [advocates, searchTerm]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Degree</TableHead>
            <TableHead>Specialties</TableHead>
            <TableHead>Years of Experience</TableHead>
            <TableHead>Phone Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAdvocates.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground">
                {searchTerm ? "No advocates found matching your search." : "No advocates available."}
              </TableCell>
            </TableRow>
          ) : (
            filteredAdvocates.map((advocate, index) => (
              <TableRow key={`${advocate.firstName}-${advocate.lastName}-${index}`}>
                <TableCell className="font-medium">{advocate.firstName}</TableCell>
                <TableCell>{advocate.lastName}</TableCell>
                <TableCell>{advocate.city}</TableCell>
                <TableCell>{advocate.degree}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {advocate.specialties.map((specialty, specialtyIndex) => {
                      const isMatch = searchTerm && 
                        specialty.toLowerCase().includes(searchTerm.toLowerCase());
                      return (
                        <span
                          key={specialtyIndex}
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            isMatch 
                              ? 'bg-green-100 text-green-800 border border-green-200' 
                              : 'bg-primary/10 text-primary'
                          }`}
                        >
                          {specialty}
                        </span>
                      );
                    })}
                  </div>
                </TableCell>
                <TableCell>{advocate.yearsOfExperience}</TableCell>
                <TableCell>{advocate.phoneNumber}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
