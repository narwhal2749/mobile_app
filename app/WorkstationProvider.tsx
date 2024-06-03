import React, { PropsWithChildren, createContext, useContext } from 'react';
import { Workstation } from './domain/Workstation';
import { useAxios } from './HttpProvider';
import { assembleWorkstation } from './WorkstationAssembler';

interface WorkstationProviderProps {
  workstation?: Workstation;
}

const WorkstationContext = createContext<WorkstationProviderProps>({});

export const useWorkstation = () => {
  const workstationContext = useContext(WorkstationContext);
  const queryClient = useAxios();

  if (!workstationContext) {
    throw new Error('useWorkstation must be used within WorkstationProvider');
  }
  
  const fetchWorkstation = async (url: string) => {
    const localIP = "http://192.168.2.20:5000";
    const correctedUrl = url.replace("http://localhost:5000", localIP);

    try {
      const response = await queryClient.get(correctedUrl);
      const workstations = assembleWorkstation(response.data);
      workstationContext.workstation = workstations;
    } catch (error) {
      console.error('Error fetching workstation:', error);
    }
  };

  return {
    workstation: workstationContext.workstation,
    fetchWorkstation
  };
};

export const WorkstationProvider = ({ children, workstation }: PropsWithChildren & WorkstationProviderProps) => {
  return (
    <WorkstationContext.Provider value={{workstation}}>
      {children}
    </WorkstationContext.Provider>
  );
};