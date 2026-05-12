const cors = require('cors');
const express = require('express');
const fs = require('fs')
const data = require('./employees.json');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/employees', (req, res) => {
    res.json({
        data: data.employees
    });
});
app.delete('/employees/:uuid', (req, res) => {
    const uuid = req.params.uuid;
    if (!data.employees.filter(item => item.id === uuid)){
        return res.status(404).send("nie znaleziono uzytkownika");
    }
    
    data.employees = data.employees.filter(user => user.id !== uuid);

    fs.writeFileSync("./employees.json", JSON.stringify(data, null, 2));

    res.status(200).json({
        message: "user usuniety",
        data: data.employees
    });
})

app.listen(8000, () => {
    console.log('Server listening');
});

