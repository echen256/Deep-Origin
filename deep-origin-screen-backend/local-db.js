// Implements a local database for the backend

const sampleUsers = [     
    { id: 1, name: 'Alice', email: 'alice@example.com', picture : '1' },
    { id: 2, name: 'Bob' , email: 'bob@example.com', picture : '2'}
]

const data = {
    users : sampleUsers,
}

const addJSONTable = (tableName, columns) => {
    if (!data[tableName]) {
        data[tableName] = {
           columns : columns,
           rows : []
        }
    } else {
        throw new Error(`Table ${tableName} already exists`)
    }
}

const updateJSONTable = (tableName, rows) => {
    if (data[tableName]) {
        data[tableName].rows.push(rows);
    } else {
        throw new Error(`Table ${tableName} does not exist`)
    }
}

const tableExists = (tableName) => {
    return data[tableName] ? true : false
}

const getJSONTable = (tableName) => {
    if (data[tableName]) {
        return data[tableName]
    } else {
        throw new Error(`Table ${tableName} does not exist`)
    }
}

