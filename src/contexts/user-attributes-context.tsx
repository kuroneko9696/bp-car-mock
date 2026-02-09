"use client";

import { createContext, useContext } from "react";
import type { UserAttribute } from "@/hooks/use-session-storage";

interface UserAttributesContextValue {
  userAttributes: UserAttribute[];
  toggleUserAttribute: (attr: UserAttribute) => void;
}

const UserAttributesContext = createContext<UserAttributesContextValue>({
  userAttributes: [],
  toggleUserAttribute: () => {},
});

export function UserAttributesProvider({
  userAttributes,
  toggleUserAttribute,
  children,
}: UserAttributesContextValue & { children: React.ReactNode }) {
  return (
    <UserAttributesContext.Provider value={{ userAttributes, toggleUserAttribute }}>
      {children}
    </UserAttributesContext.Provider>
  );
}

export function useUserAttributes() {
  return useContext(UserAttributesContext);
}
