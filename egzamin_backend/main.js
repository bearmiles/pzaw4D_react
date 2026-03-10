const cors = require('cors');
const express = require('express');
const fs = require('fs')

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        key: 'Hello World!',
    });
});

app.listen(8000, () => {
    console.log('Server listening');
});

app.get("/aktualizuj", (req,res) => {
    fs.readFile('data.json', 'utf-8', (err, data) => {
            if (err){
                console.error("error reading file ", err);
                return;
            }
            const jsonData = JSON.parse(data);
            console.log(jsonData);
            res.send(jsonData);
    });
})


app.post("/dodaj", (req, res) => {
    const { title } = req.body;

    fs.readFile("data.json", "utf-8", (err, data) => {
        if (err) {
            console.error("error reading file", err);
            return res.status(500).send("error");
        }

        const jsonData = JSON.parse(data);

        jsonData.push({
            title: title,
            tasks: []
        });

        fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("error writing file", err);
                return res.status(500).send("error");
            }

            res.json(jsonData);
        });
    });
});

app.post('/update', (req, res) => {
    const {title, tasks} = req.body;
     fs.readFile("data.json", "utf-8", (err, data) => {
        if (err) {
            console.error("error reading file", err);
            return res.status(500).send("error");
        }

        const jsonData = JSON.parse(data);
        
        const list = [];
        list.push([...jsonData, jsonData.filter((item) => item.title === title)])
        
    })
})