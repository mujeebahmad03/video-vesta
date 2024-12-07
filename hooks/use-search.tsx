import { SUBSCRIPTION_PLAN } from "@prisma/client";
import { useEffect, useState } from "react";
import { useQueryData } from "./use-query-data";
import { searchUsers } from "@/app/actions/user";

type SearchedUser = {
  id: string;
  subscription: {
    plan: SUBSCRIPTION_PLAN;
  } | null;
  firstName: string | null;
  lastName: string | null;
  image: string | null;
  email: string | null;
};

export const useSearch = (key: string, type: "USERS") => {
  const [query, setQuery] = useState("");
  const [debounce, setDebounce] = useState("");
  const [onUsers, setOnUsers] = useState<SearchedUser[] | undefined>(undefined);

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebounce(query);
    }, 1000);
    return () => clearTimeout(delayInputTimeoutId);
  }, [query]);

  const { refetch, isFetching } = useQueryData(
    [key, debounce],
    async ({ queryKey }) => {
      if (type === "USERS") {
        const users = await searchUsers(queryKey[1] as string);
        if (users.status === 200) setOnUsers(users.data);
      }
    }
  );

  useEffect(() => {
    if (debounce) refetch();
    if (!debounce) setOnUsers(undefined);
  }, [debounce, refetch]);

  return { onSearchQuery, query, isFetching, onUsers };
};
