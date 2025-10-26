import React, { useEffect, useState } from "react";
import { Employee } from "../types/Employee";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from "../services/employeeService";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Card 
     ,TextField
} from "@mui/material";

const EmployeeCrud: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [form, setForm] = useState<Employee>({
        empId: 0,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    });

    const fetchEmployees = async () => {
        const response = await getEmployees();
        setEmployees(response.data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.empId === 0) await addEmployee(form);
        else await updateEmployee(form);
        setForm({ empId: 0, firstName: "", lastName: "", email: "", phoneNumber: "" });
        fetchEmployees();
    };

    const handleEdit = (employee: Employee) => {
        setForm(employee);
    };

    const handleDelete = async (id: number) => {
        await deleteEmployee(id);
        fetchEmployees();
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
            <h4>Employee Management</h4>
                </Typography> 
            <form onSubmit={handleSubmit}>
                    <TextField size="small"
                    type="text"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />
                    <TextField size="small"
                    type="text"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
                    <TextField size="small"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                    <TextField size="small"
                    type="text"
                    placeholder="Phone Number"
                    value={form.phoneNumber}
                    onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                />
               <Button variant="contained" type="submit" color="primary" style={{ marginBottom: "1px" }}>
                {form.empId === 0 ? "Add" : "Update"} Employee</Button>
            </form>
            <div style={{ padding: "20px" }}>
           

            <Card>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Employee ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone Number</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.map((emp) => (
                                <TableRow key={emp.empId}>
                                    <TableCell>{emp.empId}</TableCell>
                                    <TableCell>{emp.firstName}</TableCell>
                                    <TableCell>{emp.lastName}</TableCell>
                                    <TableCell>{emp.email}</TableCell>
                                    <TableCell>{emp.phoneNumber}</TableCell>
                                    <TableCell>
                                <button onClick={() => handleEdit(emp)}>Edit</button>
                                <button onClick={() => handleDelete(emp.empId)}>Delete</button>
                            </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
        </div>
    );
};

export default EmployeeCrud;
