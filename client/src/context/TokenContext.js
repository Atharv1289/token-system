import React, { createContext, useState } from 'react';


export const TokenContext = createContext();


export default function TokenProvider({children}) {
  const [currentToken, setCurrentToken] = useState('T-000');
  


  const value = {
    currentToken,
    setCurrentToken
  }

  return (
    <TokenContext.Provider value={value}>
      {children}
    </TokenContext.Provider>
  );
}
