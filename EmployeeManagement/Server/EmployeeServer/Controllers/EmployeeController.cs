using EmployeeServer.Data;
using EmployeeServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeServer.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("OpenCORSPolicy")]
   // [ApiController, Authorize]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmpDbContext _EmpDBContext;

        public EmployeeController(EmpDbContext EmpDBContext)
        {
            _EmpDBContext = EmpDBContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_EmpDBContext.Employee.ToList());
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_EmpDBContext.Employee.FirstOrDefault(c => c.EmpId == id));
        }


        [HttpPut]
        public IActionResult Put([FromBody] Employee employee)
        {
            EmployeeEntity entity = new();
            entity.PhoneNumber = employee.PhoneNumber;
            entity.LastName = employee.LastName;
            entity.FirstName = employee.FirstName;
            entity.Email = employee.Email;
            _EmpDBContext.Employee.Add(entity);
            _EmpDBContext.SaveChanges();

            return Ok("Employee created");
        }


        [HttpPost]
        public IActionResult Post([FromBody] Employee employee)
        {
            var emp = _EmpDBContext.Employee.FirstOrDefault(c => c.EmpId == employee.EmpId);

            if (emp == null)
                return BadRequest();

            emp.FirstName = employee.FirstName;
            emp.LastName = employee.LastName;
            emp.Email = employee.Email;
            emp.PhoneNumber = employee.PhoneNumber;

            _EmpDBContext.Employee.Update((EmployeeEntity)emp);
            _EmpDBContext.SaveChanges();

            return Ok("Employee updated");
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var emp = _EmpDBContext.Employee.FirstOrDefault(c => c.EmpId == id);

            if (emp == null)
                return BadRequest();

            _EmpDBContext.Employee.Remove(emp);
            _EmpDBContext.SaveChanges();

            return Ok("Employee deleted");
        }
    }
}