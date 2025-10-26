import axios from "axios";
import { Employee } from "../types/Employee";

const BASE_URL = "https://localhost:44377/api/Employee";

export const getEmployees = () => axios.get<Employee[]>(BASE_URL);
export const addEmployee = (employee: Employee) => axios.put(BASE_URL, employee);
export const updateEmployee = (employee: Employee) => axios.post(BASE_URL, employee);
export const deleteEmployee = (id: number) => axios.delete(`${BASE_URL}/${id}`);
