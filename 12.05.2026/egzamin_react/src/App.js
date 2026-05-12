import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

const getData = async () => {
  try{
    const response = await fetch("http://localhost:8000/employees");
    const result = await response.json();
    return result.data
  }catch (err){
    console.error(err.message);
  }
}

const deleteUser = async (uuid) => {
  await fetch(`http://localhost:8000/employees/${uuid}`, {
    method: 'DELETE'
  })
  
}


function App() {
  
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const [opcja, setOpcja] = useState('');
  const [wybor, setWybor] = useState('');

  useEffect(()=>{
  const fetchData = async () => {
    const result = await getData();
    setData(result);
  }
  fetchData();
  }, [])
      
  useEffect(() => {
    const result = data.filter(item => item.position.toLowerCase().includes(search.toLowerCase()));
    setFilteredData(result);
  }, [search, data])

const sortuj = () => {

  let sorted = [...filteredData];

  if (wybor === 'salary') {

    if (opcja === 'asc') {
      sorted.sort((a, b) => a.salary - b.salary);
    } else {
      sorted.sort((a, b) => b.salary - a.salary);
    }
  }
  if (wybor === 'age') {

    if (opcja === 'asc') {
      sorted.sort((a, b) => a.age - b.age);
    } else {
      sorted.sort((a, b) => b.age - a.age);
    }
  }

  if (wybor === 'name') {

    if (opcja === 'asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }

  }

  setFilteredData(sorted);
}


  return (
    <div>
      <div className='d-flex gap-5'>
      <div>
        <select onChange={(e) => setWybor(e.target.value)}>
          <option value="salary">Pensja</option>
          <option value="age">Wiek</option>
          <option value="name">Nazwa</option>
        </select>
        <select onChange={(e) => setOpcja(e.target.value)}>
          <option value="asc">Rosnąco</option>
          <option value="desc">Malejąco</option>
        </select>
        <button className='btn btn-success' onClick={() => sortuj()}>Sortuj!</button>
      </div>
      <div>
        <h5>Filtorwanie</h5>
        <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
</div>

      <table className='table'>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>position</th>
            <th>department</th>
            <th>email</th>
            <th>salary</th>
            <th>age</th>
            <th>country</th>
            <th>usuń</th>
          </tr>
        </thead>
        <tbody>
            {filteredData.map((v) => (
              <tr>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>{v.position}</td>
                <td>{v.department}</td>
                <td>{v.email}</td>
                <td>{v.salary}</td>
                <td>{v.age}</td>
                <td>{v.country}</td>
                <td><button className='btn btn-danger' onClick={() => deleteUser(v.id)}>Usun</button></td>
            </tr>
            ))}   
        </tbody>
      </table>
    </div>
  )
}

export default App;
