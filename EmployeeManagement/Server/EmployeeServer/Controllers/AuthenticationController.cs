using JwtAuthServer.Models;
using Microsoft.AspNetCore.Mvc;
using JwtAuthServer.Token;
using Microsoft.AspNetCore.Cors;

namespace EmployeeServer.Controllers
{
    [Route("api/[controller]")]

    [EnableCors("OpenCORSPolicy")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IJwtTokenGenerator _tokenGenerator;
        public AuthenticationController(IJwtTokenGenerator tokenGenerator)
        {
            _tokenGenerator = tokenGenerator;
        }

        [HttpPost]
        public IActionResult Login([FromBody] Login user)
        {
            var response = _tokenGenerator.ValidateAndGenerateToken(user);
            if (!string.IsNullOrWhiteSpace(response.Token))
            {
                return Ok(response);
            }
            return Unauthorized();
        }
    }
}
