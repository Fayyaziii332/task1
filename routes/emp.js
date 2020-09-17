const express = require("express");
const Employee = require("../models/emp");

const router = express.Router();

router.post("/addEmployee", (req, res) => {

    Employee.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ msg: "Employee already exists" });
        } else {
            const newEmp = new Employee({
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                gender: req.body.gender,
                phone: req.body.prefix + "" + req.body.phone,
            });
            newEmp.save()
                .then(user => res.status(200).json({ msg: "employee added succesfully" }))
                .catch(err => res.status(500).json({ msg: "Database error" }));
        }
    });
});

router.get("/viewEmployees", (req, res) => {
    Employee.find({}).then(data => {
        res.status(200).json(data);
    }).catch(err => res.status(500).json({ msg: "Database error" }))
})

router.put("/editEmployees", (req, res) => {
    Employee.findByIdAndUpdate(
        req.body._id,
        req.body,
        { new: true }).then(
            (emp) => {
                res.status(200).json(emp);
            }).catch(err => res.status(500).json({ msg: "Database error" }))
})

router.delete("/deleteEmployees/:id", (req, res) => {
    Employee.deleteOne(
        { _id: req.params.id },
        { new: true }).then(
            (emp) => {
                res.status(200).json(emp);
            }).catch(err => {
                res.status(500).json({ msg: "Database error" })
            })
})

module.exports = router;
