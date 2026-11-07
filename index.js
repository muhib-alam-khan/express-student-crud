import express from 'express';
const app = express();
const PORT = 3000;
app.use(express.json());

let student = [
    {
        id: 1,
        name: "muhib",
        age: 20,
        gender: "male",
        city: "peshawar",
        email: "muhib@example.com",
        course: "computer science"
    },
    {
        id: 2,
        name: "ali",
        age: 22,
        gender: "male",
        city: "islamabad",
        email: "ali@example.com",
        course: "mathematics"
    }
];
let nextId = 3;

// GET all students
app.get('/students', (req, res) => {
    res.status(200).json({
        message: "All students retrieved successfully",
        data: student
    });
}
);
//add new student from frontend.
app.post("/students", (req, res) => {
    const { name, age, gender, city, email, course } = req.body;
    const newStudent = {
        id: nextId++,
        name,
        age,
        gender,
        city,
        email,
        course
    };
    student.push(newStudent);
    res.status(201).json({
        message: "Student created successfully",
        data: newStudent
    });
})

//partial update of student by 
app.patch("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const foundStudent = student.find((student) => student.id === id);
    if (!foundStudent) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    Object.assign(foundStudent, req.body);
    res.status(200).json({
        message: "Student updated successfully",
        data: foundStudent
    });
});

//delete student by id
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = student.findIndex((student) => student.id === id);
    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }
    student.splice(index, 1);
    res.status(200).json({
        message: "Student deleted successfully"
    });
});
//put method update the sudent all data by id.

app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, age, gender, city, email, course } = req.body;
    const index = student.findIndex((student) => student.id === id);
    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }
    student[index] = {
        id,
        name,
        age,
        gender,
        city,
        email,
        course
    };
    res.status(200).json({
        message: "Student updated successfully",
        data: student[index]
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});