
import { Route, Link, Routes } from 'react-router-dom';
import CurrentToken from './Routes/CurrentToken';
import Dashboard from './Routes/Dashboard';
import './App.css';




function App() {
 
  return (
    <Routes>
       <Route path="/current-token" element={<CurrentToken />}  />
       <Route path="/" element={<Dashboard />} />
       
      
    </Routes>
 
    

  
  );
}

export default App;
