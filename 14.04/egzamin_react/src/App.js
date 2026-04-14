import {BrowserRouter, Routes, Route, Link, Router} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import auta from "./cars.json";
import biznes from "./buisness.json";
import gracze from "./players.json";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/cars' element={<Cars />} />
          <Route path='/players' element={<Players />} />
          <Route path='/buisness' element={<Buisness />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


const Cars = () => {

  const [cars, setCars] = useState(auta);
  const [searchParams] = useSearchParams();
  const kolumna = searchParams.get('col')
  const sortOdrder = searchParams.get('sortOrder')
  const filter = searchParams.get('filter')
 
  // useEffect(() => {
  //   fetch("http://localhost:8000/cars")
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res);
  //       setCars(res.cars);
  //     })
  // }, []);

  useEffect(() => {
    if (cars.length === 0 || !kolumna || !sortOdrder) return;
    const order = sortOdrder.toLowerCase();
    let sorted = [...cars];
    if (kolumna && sortOdrder) {
      sorted.sort((a, b) => {
      let val1 = a[kolumna];
      let val2 = b[kolumna];

      if (typeof val1 === 'number' && typeof val2 === 'number') {
        return order === "asc" ? val1 - val2 : val2 - val1;
      }

      val1 = String(val1 || "").toLowerCase();
      val2 = String(val2 || "").toLowerCase();

      if (val1 < val2) return order === "asc" ? -1 : 1;
      if (val1 > val2) return order === "asc" ? 1 : -1;
      return 0;
    });
    }
    if (kolumna && filter) {
      sorted = sorted.filter((item) => {
        const val = String(item[kolumna] || "").toLowerCase();
        return val.includes(filter.toLowerCase());
      });
    }


    if (JSON.stringify(sorted) !== JSON.stringify(cars)) {
      setCars(sorted);
    }
    
  }, [searchParams])

  return (
    <div>
      <h1>Cars</h1>
      <table className='table table-bordered table-striped'>
      <thead>
      <tr>
        <th>id</th>
        <th>car_make</th>
        <th>car_model</th>
        <th>car_year</th>
        <th>car_vin</th>
        <th>car_color</th>
        <th>car_price</th>
        <th>car_mileage</th>
        <th>car_engine_size</th>
        <th>car_transmission</th>
        <th>car_fuel_type</th>
        <th>car_body_style</th>
        <th>car_condition</th>
        <th>car_location</th>
        <th>car_owner_name</th>
        <th>car_purchase_date</th>
      </tr>
      </thead>
      <tbody>
      {
        cars.map((r) => (
          <tr>
            <td>{r.id}</td>
            <td>{r.car_make}</td>
            <td>{r.car_model}</td>
            <td>{r.car_year}</td>
            <td>{r.car_vin}</td>
            <td>{r.car_color}</td>
            <td>{r.car_price}</td>
            <td>{r.car_mileage}</td>
            <td>{r.car_engine_size}</td>
            <td>{r.car_transmission}</td>
            <td>{r.car_fuel_type}</td>
            <td>{r.car_body_size}</td>
            <td>{r.car_condition}</td>
            <td>{r.car_location}</td>
            <td>{r.car_owner_name}</td>
            <td>{r.car_purchase_date}</td>
          </tr>
        ))
      }
      </tbody>
      </table>
    </div>
  )
}


const Buisness = () => {
  const [allBuisness, setAllBuisness] = useState(biznes); 
  const [displayBuisness, setDisplayBuisness] = useState([]);

  const [searchParams] = useSearchParams();
  const kolumna = searchParams.get('col');
  const sortOdrder = searchParams.get('sortOrder');
  const filter = searchParams.get('filter');

  useEffect(() => {
    let result = [...allBuisness];

    if (kolumna && filter) {
      result = result.filter((item) => {
        const val = String(item[kolumna] || "").toLowerCase();
        return val.includes(filter.toLowerCase());
      });
    }

    if (kolumna && sortOdrder) {
      const order = sortOdrder.toLowerCase();
      result.sort((a, b) => {
        let val1 = a[kolumna];
        let val2 = b[kolumna];

        if (typeof val1 === 'number' && typeof val2 === 'number') {
          return order === "asc" ? val1 - val2 : val2 - val1;
        }

        val1 = String(val1 || "").toLowerCase();
        val2 = String(val2 || "").toLowerCase();

        if (val1 < val2) return order === "asc" ? -1 : 1;
        if (val1 > val2) return order === "asc" ? 1 : -1;
        return 0;
      });
    }

    setDisplayBuisness(result);

  }, [searchParams, allBuisness])

  return (
    <div>
      <h1>Buisness</h1>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Industry</th>
            <th>Employees</th>
            <th>Revenue</th>
            <th>Founded</th>
            <th>CEO</th>
            <th>City</th>
            <th>Country</th>
            <th>Stock Symbol</th>
            <th>Segment</th>
            <th>Budget</th>
            <th>Satisfaction</th>
            <th>Market Share</th>
            <th>Product</th>
          </tr>  
        </thead>
        <tbody>
          {
            displayBuisness.map((c) => (
              <tr>
                <td>{c.id}</td>
                <td>{c.company_name}</td>
                <td>{c.industry}</td>
                <td>{c.employee_count}</td>
                <td>{c.revenue}</td>
                <td>{c.founded_date}</td>
                <td>{c.ceo_name}</td>
                <td>{c.headquarters_city}</td>
                <td>{c.headquarters_country}</td>
                <td>{c.stock_symbol}</td>
                <td>{c.customer_segment}</td>
                <td>{c.annual_budget}</td>
                <td>{c.customer_satisfaction_score}</td>
                <td>{c.market_share}</td>
                <td>{c.product_line}</td>
              </tr>
            ))
          }
        </tbody>
      </table>  
    </div>
  )
}

const Players = () => {

  const [players, setPlayers] = useState(gracze);
    // useEffect(() => {
    //   fetch("http://localhost:8000/players")
    //     .then(res => res.json())
    //     .then(res => {
    //       console.log(res.players);
    //       setPlayers(res.players);
    //     })
    // }, []);
const [searchParams] = useSearchParams();
  const kolumna = searchParams.get('col')
  const sortOdrder = searchParams.get('sortOrder')
  const filter = searchParams.get('filter')


  
  useEffect(() => {
    if (players.length === 0 || !kolumna || !sortOdrder) return;
    const order = sortOdrder.toLowerCase();
    let sorted = [...players];
    if (kolumna && sortOdrder) {
        sorted.sort((a, b) => {
        let val1 = a[kolumna];
        let val2 = b[kolumna];

        if (typeof val1 === 'number' && typeof val2 === 'number') {
          return order === "asc" ? val1 - val2 : val2 - val1;
        }

        val1 = String(val1 || "").toLowerCase();
        val2 = String(val2 || "").toLowerCase();

        if (val1 < val2) return order === "asc" ? -1 : 1;
        if (val1 > val2) return order === "asc" ? 1 : -1;
        return 0;
    });
    }
    if (kolumna && filter) {
      sorted = sorted.filter((item) => {
        const val = String(item[kolumna] || "").toLowerCase();
        return val.includes(filter.toLowerCase());
      });
    }
    

    if (JSON.stringify(sorted) !== JSON.stringify(gracze)) {
      setPlayers(sorted);
    }
    
  }, [searchParams])

  return (
    <div>
      <h1>Players</h1>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Email</th>
            <th>Username</th>
            <th>Favorite Game</th>
            <th>Status Icon</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.player_id}>
              <td>{p.player_id}</td>
              <td>
                <img src={p.avatar} alt="avatar" style={{ borderRadius: '50%', width: '40px' }} />
              </td>
              <td>{p.first_name}</td>
              <td>{p.last_name}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td>{p.country}</td>
              <td>{p.email}</td>
              <td><strong>{p.username}</strong></td>
              <td>{p.favorite_game}</td>
              <td style={{ textAlign: 'center' }}>
                <img src={p.icon} alt="icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default App;