const express = require('express');
const app = express();
const Joi = require('joi')

app.use(express.json());

courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/courses', (req, res) => {
  return res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given ID was not found.");
    else return res.status(200).send(course);
});

app.post("/api/courses", (req, res) => {
   const result = validateCourse(req.body);
    if(result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    return res.status(201).send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given ID was not found.");

    const result = validateCourse(req.body);
    if(result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    course.name = req.body.name;
    return res.status(200).send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given ID was not found.");
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    return res.status(200).send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});