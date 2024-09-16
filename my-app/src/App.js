import './App.css';
import React, { useState, useEffect, useRef, useMemo, useCallback  } from 'react'

const useUsers = () => {
  const [loaded, setLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { Name: 'Lev', Year: 2008, Email: 'Lev@gmail.com' },
        { Name: 'Alex', Year: 2009, Email: 'Alex@gmail.com' },
        { Name: 'Alexandra', Year: 2018, Email: 'Alexandra@gmail.com' },
        { Name: 'Iryna', Year: 2001, Email: 'Iryna@gmail.com' },
        { Name: 'Sofia', Year: 2002, Email: 'Sofia@gmail.com' },
        { Name: 'Valerii', Year: 2003, Email: 'Valerii@gmail.com' },
        { Name: 'Bob', Year: 2004, Email: 'Bob@gmail.com' }
      ]);
      setLoaded(true);
    }, 2000);
  }, []);
  
  return {
    users,
    loaded
  };
}

function App() {


  const [searchName, setSearchName] = useState('');
  const { users, loaded } = useUsers();
  const inputRef = useRef('');

  useEffect(() => {
    inputRef.current.focus();
  }, []);


  const filteredUsers = useMemo(() => {
    return users.filter((user) => user.Name.includes(searchName));
  }, [searchName, users]);

  useCallback((e) => {
      if (e !== searchName) {
        setSearchName(e);
      }
    },
    [searchName] 
  );

  
  return (
    <div className="App">
      <input type='text' ref={inputRef} onChange={(e) => setSearchName(e.target.value)} />
      {!loaded ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {filteredUsers.map(({ Name, Year, Email }, index) => (
            <li key={index}>{`Name: ${Name}, Year: ${Year}, Email: ${Email}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
