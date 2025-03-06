import { useState, useCallback } from "react";
import AppLayout from "@components/AppLayout";
import PasswordEntryList from "@components/PasswordEntry/List";
import SearchField from "@components/SearchField";

import { useLaunchParams } from "../../hooks/useLaunchParams";

const IndexPage = () => {
  const launchParams = useLaunchParams();
  console.log("Launch Parameters:", launchParams);

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
      <h1>Hello, {launchParams.tgWebAppData?.user?.first_name || "User"}!</h1>
      <SearchField onSearch={handleSearch} />
      <PasswordEntryList />
    </AppLayout>
  );
};

export default IndexPage;
