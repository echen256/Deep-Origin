const express = require('express');
const app = express();
const port = 3000;

const { getJSONTable, updateJSONTable, addJSONTable , tableExists} = require('./local-db');

app.get('/api/data/:type', (req, res) => {
    const { type } = req.params; // Access route parameters
    console.log(`Request for data type: ${type}`);

    if (tableExists(type)) {
        res.json(getJSONTable(type))
    } else {
        res.status(404).json({ error: `Table ${type} does not exist` })
    }
});

app.put('/api/data/:type', (req, res) => {
    const { type } = req.params; // Access route parameters
    const { data } = req.body;
    console.log(`Request for data type: ${type}`);
    try {
        if (tableExists(type)) {
            updateJSONTable(type, data)
            res.json({ message: `Table ${type} updated` })
    } else {
        addJSONTable(type, req.body)
        updateJSONTable(type, data)
        res.json({ message: `Table ${type} created` })
    }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})  

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});