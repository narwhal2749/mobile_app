import React, { createContext, useContext, useState, PropsWithChildren, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export interface UserData {
  firstName: string;
  lastName: string;
}
interface UserContextProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}
const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [userData, setUserData] = useState<UserData>({ firstName: '', lastName: '' });
  const navigation = useNavigation();

  useMemo(() => {
    const loadData = async () => {
      try {
        const firstName = await AsyncStorage.getItem('firstName');
        const lastName = await AsyncStorage.getItem('lastName');
        if (!firstName || !lastName) {
          router.push('settings'); 
        } else {
          setUserData({ firstName, lastName });
        }
      } catch (e: any) {
        Alert.alert('Failed to load data', e.message);
      }
    };

    loadData();
  }, [navigation]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
