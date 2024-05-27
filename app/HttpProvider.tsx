import axios, { AxiosInstance } from 'axios';
import React, { ReactNode, createContext, useContext } from 'react';

interface AxiosWrapperOptions {
  children: ReactNode;
}

const HttpContext = createContext<AxiosInstance | undefined>(undefined);

export const useAxios = () => {
  const queryInstance = useContext(HttpContext);
  if (!queryInstance) {
    throw new Error('useQuery must be used within HttpProvider');
  }
  return queryInstance;
};

export const HttpProvider = ({ children }: AxiosWrapperOptions) => {
  const axiosInstance = axios.create();

  return (
    <HttpContext.Provider value={axiosInstance}>
      {children}
    </HttpContext.Provider>
  );
};