import React from 'react'
import { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { TokenContext } from '../context/TokenContext';


const socket = io('http://localhost:4000');
function Dashboard() {
    const [patients, setPatients] = useState([]);
    // const [formData, setFormData] = useState({ name: '', phone: '' });
    const { currentToken, setCurrentToken } = useContext(TokenContext);
    
   
  
    const addPatient = (name, phone) => {
      // Generate token
      const token = `T-${(patients.length + 1).toString().padStart(3, '0')}`;
  
      // Add patient
      const newPatient = { name, phone, token };
      setPatients([...patients, newPatient]);
  
      // Send patient data to server
      socket.emit('addPatient', newPatient);
    };
  
    const nextToken = () => {
      // Find index of current token
      const index = patients.findIndex(patient => patient.token === currentToken);
  
      // If current token is last in the list, start from the beginning
      const nextIndex = index === patients.length - 1 ? 0 : index + 1;
  
      // Set current token to the next token
      const nextToken = patients[nextIndex].token;
      setCurrentToken(nextToken);
  
      // Send current token to server
     
      socket.emit('setCurrentToken', nextToken);
    };
  
    useEffect(() => {
      // Listen for updates from server
      socket.on('updatePatients', updatedPatients => {
        setPatients(updatedPatients);
      });

      socket.on('currentToken', (token) => {
        setCurrentToken(token); 
      });
  
   
      socket.emit('getPatients');
      socket.emit('getCurrentToken');
    }, []);

 //
  return (
     <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold mb-8">Token Dashboard</h1>
    <div class="mb-8">
      <form onSubmit=  { e => { e.preventDefault(); addPatient(e.target.name.value, e.target.phone.value); }} class="flex flex-col sm:flex-row sm:space-x-4">
        <input type="text" name="name" placeholder="Name" class="w-full sm:w-1/3 px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
        <input type="number" name="phone" placeholder="Phone" class="w-full sm:w-1/3 px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
        <button type="submit" class="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Add Patient</button>
      </form>
    </div>
    <table class="w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
        </tr>
      </thead>
      <tbody>
        {patients.map(patient => (
          <tr key={patient.token} className={currentToken === patient.token ? 'bg-blue-50' : 'bg-white'}>
            <td class="px-6 py-4 whitespace-nowrap">{patient.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">{patient.phone}</td>
            <td class="px-6 py-4 whitespace-nowrap">{patient.token}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={nextToken} class="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Next Token</button>
    <div class="mt-8">
       <h2 class="text-xl font-bold  text-sky-400">Current Token:</h2>
      <h2 class="text-2xl font-bold text-sky-400 ">{currentToken}</h2> 
     
    </div>
  </div>
  )
}

export default Dashboard;