import { useState, useEffect } from "react";
import { useUser } from "./useUser";

export const useUserExists = () => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [userExists, setUserExists] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkUserExists = async () => {
      try {
        setIsLoading(true);
        // Make API call to check if user exists
        const response = await fetch(`/api/v1/users/${user.id}/exists`);

        if (!response.ok) {
          throw new Error(`Failed to check user: ${response.status}`);
        }

        const data = await response.json();
        setUserExists(data.exists);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        // Default to false if there's an error
        setUserExists(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Only check if we have a real user (not guest)
    if (user.id !== 0) {
      checkUserExists();
    } else {
      // For guest users, we'll assume they don't exist
      setUserExists(false);
      setIsLoading(false);
    }
  }, [user.id]);

  return { isLoading, userExists, error };
};
