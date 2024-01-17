using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Dotnet.Models;
using System.Security.Claims;

namespace Project_Dotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] AuthModels.RegistrationModel model)
        {
            var user = _authService.RegisterUser(model.Name, model.Email, model.Password, model.Role);
            var token = _authService.GenerateJwtToken(user);

            return Ok(new { Token = token });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] AuthModels.LoginModel model)
        {
            var user = _authService.AuthenticateUser(model.Email, model.Password);

            if (user == null)
            {
                return Unauthorized();
            }

            var token = _authService.GenerateJwtToken(user);
            return Ok(new { Token = token });
        }

        // GET: api/Auth/current-user
        [HttpGet("current-user")]
        public IActionResult GetCurrentUserData()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                
                return Unauthorized();
            }

            try
            {
                var user = _authService.GetUserById(int.Parse(userId));

                if (user == null)
                {
                    return NotFound();
                }


                var userData = new
                {
                    user.UserId,
                    user.Name,
                    user.Email,
                    user.Role
                };

                return Ok(userData);
            }

            catch (Exception)
            {

                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut("update-user")]
        public IActionResult UpdateUserData([FromBody] Utilisateur updatedUser)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            try
            {
                var user = _authService.GetUserById(int.Parse(userId));

                if (user == null)
                {
                    return NotFound();
                }

                user.Name = updatedUser.Name;
                user.Email = updatedUser.Email;

                // Check if PasswordHash is provided before updating
                if (!string.IsNullOrEmpty(updatedUser.PasswordHash))
                {
                    user.PasswordHash = updatedUser.PasswordHash;
                }

                _authService.UpdateUser(user);

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

    }
}
