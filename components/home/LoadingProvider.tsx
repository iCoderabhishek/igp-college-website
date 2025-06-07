"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import LoadingBar from "./LoadingBar";

interface LoadingContextType {
  setLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      <LoadingBar isLoading={isLoading} />
      {children}
    </LoadingContext.Provider>
  );
};
