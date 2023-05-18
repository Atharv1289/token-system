import { useContext } from 'react';
import { TokenContext } from '../context/TokenContext';
import io from 'socket.io-client';
import { useEffect } from 'react';


const socket = io('http://localhost:4000');
function CurrentToken() {
    const { currentToken , setCurrentToken } = useContext(TokenContext);

    useEffect(() => {
        
        socket.on('currentTokenChanged', (token) => {
            setCurrentToken(token); 
          });
       
        
      }, []);
  
    return (
      <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
        <h2 className='text-6xl font-bold'> {currentToken}</h2>
      </div>
    );
  }

export default CurrentToken;
  