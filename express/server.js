const express = require('express');
const fs = require('fs/promises');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const url = `${process.env.PWD}/../data/db.json`;

//List Students
app.get('/students', async (req, res) => {
    const db = await fs.readFile(url, {
        encoding: 'utf8',
    });
    res.send(db);
});

//Get Student
app.get('/students/:studentId', async (req, res) => {
    const db = await fs.readFile(url, {
        encoding: 'utf8',
    });

    const data = JSON.parse(db);

    res.send(
        data.students.filter(student => student.id == req.params.studentId),
    );
});

//New Student
//curl -X POST -H "Content-Type: application/json" -d '{"name":"Dave"}'  http://localhost:3000/students
app.post('/students', async (req, res) => {
    const db = await fs.readFile(url, {
        encoding: 'utf8',
    });

    const data = JSON.parse(db);

    data.students.push({ ...req.body, id: data.students.length });

    await fs.writeFile(url, JSON.stringify(data));

    return res.status(201).end();
});

//Edit Student
//curl -X PUT -H "Content-Type: application/json" -d '{"name":"Dave"}'  http://localhost:3000/students/0
app.put('/students/:studentId', async (req, res) => {
    const db = await fs.readFile(url, {
        encoding: 'utf8',
    });

    let { students } = JSON.parse(db);

    students = students.map(student => {
        if (student.id == req.params.studentId) {
            student.name = req.body.name;
        }
        return student;
    });

    await fs.writeFile(url, JSON.stringify({ students }));

    return res.status(200).end();
});

app.listen(port, () => {
    console.log(`Student data listening on port ${port}`);
});
