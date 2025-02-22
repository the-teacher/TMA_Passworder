import { useState, useCallback } from "react";
import AppLayout from "@components/AppLayout";
import PasswordEntryList from "@components/PasswordEntryList";
import SearchField from "@components/SearchField";

const IndexPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      console.log("Searching for:", query, searchQuery);
    },
    [searchQuery, setSearchQuery]
  );

  return (
    <AppLayout>
      <SearchField onSearch={handleSearch} />
      <PasswordEntryList />
    </AppLayout>
  );
};

export default IndexPage;
