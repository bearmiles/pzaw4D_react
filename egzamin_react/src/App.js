import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

  const [dane, setDane] = useState([]);
  const title = useRef();
  const tasks = useRef();
  const new_task = useRef();
  const [adding, setAdding] = useState(false);
  const [dodajTask, setDodajTask] = useState(null);
  const checbox = useRef();

  const dodajTaska = async (title) => {

    if(!new_task.current) return;

    const response = await fetch('http://localhost:8000/update', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "tasks": new_task.current.value,
        "title" : title
      })
  })
    const data = await response.json();
    setDane(data);
    setDodajTask(null);

  }

 const isChecked = async (title, task_title, checked) => {

  const response = await fetch("http://localhost:8000/zmien-checked", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      task_title: task_title,
      isChecked: checked
    })
  })

  const data = await response.json();
  setDane(data);
}

  const onSubmit = async () => {
      const response = await fetch('http://localhost:8000/dodaj', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "title": title.current.value,
        })
      })

     const data = await response.json();
     console.log(data);
    
     window.location.reload(false);
  }

  useEffect(() => {
    fetch('http://localhost:8000/aktualizuj')
      .then(response => response.json())
      .then(json => setDane(json))
  }, []);

  console.log(dane);
  console.log(dodajTask);

  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Notes</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <button className='btn btn-success' onClick={() => setAdding(true)}>Dodaj</button>
            </li>
          </ul>
    </div>
    {adding ? true && (
      <div>
        <input type='text' placeholder='dodaj tytul' ref={title}/>
        <input type='button' value="dodaj" onClick={onSubmit}/>
      </div>
    ): (null) }
    
  </div>
</nav>
<div className="container mt-4">
  {dane != null && 
    <div className="row g-3">
      {dane.map((u, i) => (
        <div className="col-md-4" key={i}>
          <div className="card shadow-sm">
            
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">{u.title}</h5>
              <button className='btn btn-warning' onClick={()=> setDodajTask(u.title)}>Dodaj Task</button>
            </div>

            <ul className="list-group list-group-flush">
              
              {u.tasks.length === 0 ? (
                <li className="list-group-item text-muted">
                  brak zadań
                </li>
              ) : (
                u.tasks.map((t, j) => (
                  t.isChecked ? (
                    <>
                    <li className="list-group-item d-flex justify-content-between align-items-center bg-success" key={j}>
                    {t.task_title}
                    <input type='checkbox' checked={t.isChecked} onChange={(e) => isChecked(u.title, t.task_title, e.target.checked)} />
                    </li>
                    </>
                  ) : (
                    <>
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={j}>
                    {t.task_title}
                    <input type='checkbox' checked={t.isChecked} onChange={(e) => isChecked(u.title, t.task_title, e.target.checked)} />
                    </li>
                    </>
                  )
                ))
              )}
            </ul>
                  {dodajTask === u.title && 
                    (
                      <div className="p-2">
                        <input
                          type="text"
                          placeholder="wprowadz nazwe taska"
                          ref={new_task}
                          className="form-control"
                        />
                        <button
                          className="btn btn-success mt-2"
                          onClick={() => dodajTaska(u.title)}
                        >
                          Zapisz
                        </button>
                      </div>
                    )
                  }
          </div>
        </div>
      ))}
    </div>
  }
</div>
</div>
  );
}

export default App;
