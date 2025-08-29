import React, { createContext, useState } from 'react';

interface GlobalState {
  host: string;
  mode: string;
}

interface GlobalStateContextType {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

const GlobalStateContext = createContext<GlobalStateContextType>({} as GlobalStateContextType);

const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [globalState, setGlobalState] = useState<GlobalState>({
    host: 'The Host',
    mode: 'Community Favorites'
  });

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };