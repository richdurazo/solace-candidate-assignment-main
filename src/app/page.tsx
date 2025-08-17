"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { Advocate, AdvocatesResponse } from "@/types/advocate";

export default function Home(): JSX.Element {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAdvocates();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
  };
  const filteredAdvocates: Advocate[] = useMemo(() => {
    if (!search || search.length === 0 || search === "") return advocates;
    return advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(search.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(search.toLowerCase()) ||
        advocate.city.toLowerCase().includes(search.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(search.toLowerCase()) ||
        advocate.specialties.includes(search) ||
        String(advocate.yearsOfExperience).includes(search) ||
        String(advocate.phoneNumber).includes(search)
      );
    });
  }, [advocates, search])
  
  

  const onResetSearch = (): void => {
    setSearch("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{search}</span>
        </p>
        <input 
          ref={searchInputRef}
          style={{ border: "1px solid black" }} 
          onChange={onChange} 
        />
        <button onClick={onResetSearch}>Reset Search</button>
      </div>
      <br />
      <br />
      
      {loading && <p>Loading advocates...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {!loading && !error && (
        <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, index) => {
            return (
              <tr key={`${advocate.firstName}-${advocate.lastName}-${index}`}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s, specialtyIndex) => (
                    <div key={specialtyIndex}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      )}
    </main>
  );
}
