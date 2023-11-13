import {Router} from "express";
import {
    createDepartment, createEmployee, createJobRole, createShift, createWorkOrder, createWorkOrderDetail,
    deleteDepartment, deleteEmployee, deleteJobRole, deleteShift, deleteWorkOrder, deleteWorkOrderDetail,
    getDepartment, getEmployee, getJobRole, getShift, getWorkOrder, getWorkOrderDetail,
    searchDepartment, searchEmployee,
    updateDepartment, updateEmployee, updateJobRole, updateShift, updateWorkOrder, updateWorkOrderDetail
} from "./hr.controller.js";
import path from "path";
import multer from "multer";

const hrRouters = Router()
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads")
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage})

/*
 * Department
 */
hrRouters.get('/department', getDepartment)
hrRouters.post('/department', createDepartment)
hrRouters.post('/department/search', searchDepartment)
hrRouters.put('/department/:id', updateDepartment)
hrRouters.delete('/department/:id', deleteDepartment)

/*
 * Employee
 */
hrRouters.get('/employee', getEmployee)
hrRouters.post('/employee', upload.single('emp_photo'), createEmployee)
hrRouters.put('/employee/:id', upload.single('emp_photo'), updateEmployee)
hrRouters.delete('/employee/:id', deleteEmployee)
hrRouters.post('/employee/search', searchEmployee)

/*
 * Job Role
 */
hrRouters.get('/job-role', getJobRole)
hrRouters.post('/job-role', createJobRole)
hrRouters.put('/job-role/:id', updateJobRole)
hrRouters.delete('/job-role/:id', deleteJobRole)

/*
 * Shift
 */
hrRouters.get('/shift', getShift)
hrRouters.post('/shift', createShift)
hrRouters.put('/shift/:id', updateShift)
hrRouters.delete('/shift/:id', deleteShift)

/*
 * Work Orders
 */
hrRouters.get('/work-orders', getWorkOrder)
hrRouters.post('/work-orders', createWorkOrder)
hrRouters.put('/work-orders/:id', updateWorkOrder)
hrRouters.delete('/work-orders/:id', deleteWorkOrder)

/*
 * Work Order Detail
 */
hrRouters.get('/work-order-detail', getWorkOrderDetail)
hrRouters.post('/work-order-detail', createWorkOrderDetail)
hrRouters.put('/work-order-detail/:id', updateWorkOrderDetail)
hrRouters.delete('/work-order-detail/:id', deleteWorkOrderDetail)

export default hrRouters