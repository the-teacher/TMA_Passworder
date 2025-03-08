import { useState, useCallback } from "react";
import AppLayout from "@components/AppLayout";
import PasswordEntryList from "@components/PasswordEntry/List";
import SearchField from "@components/SearchField";

import { useUser } from "@hooks/useUser";

const IndexPage = () => {
  const user = useUser();
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
      <h1>Hello, {user.first_name}!</h1>
      <SearchField onSearch={handleSearch} />
      <PasswordEntryList />
    </AppLayout>
  );
};

export default IndexPage;
