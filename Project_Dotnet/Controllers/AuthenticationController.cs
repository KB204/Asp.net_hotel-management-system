// AuthenticationController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Dotnet.Data;
using Project_Dotnet.Models;
using Project_Dotnet.Services;

[ApiController]
[Route("api/auth")]
public class AuthenticationController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ApplicationDbContext _dbContext; // Add this field

    public AuthenticationController(IUserService userService, ApplicationDbContext dbContext)
    {
        _userService = userService;
        _dbContext = dbContext; // Assign the provided DbContext
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] ClientLoginModel clientLoginModel)
    {
        var user = await _userService.AuthenticateAsync(clientLoginModel.Email, clientLoginModel.Password, _dbContext);

        if (user == null)
        {
            return Unauthorized("Invalid email or password");
        }

        var token = _userService.GenerateToken(user);
        return Ok(new { Token = token });
    }

    [HttpPost("signup")]
    public async Task<IActionResult> SignUp([FromBody] Client client)
    {
        // Check if the user with the provided email already exists
        var existingUser = await _dbContext.Clients.FirstOrDefaultAsync(u => u.Email == client.Email);

        if (existingUser != null)
        {
            return BadRequest("User with the provided email already exists");
        }

        // Create the new user
        var newUser = await _userService.CreateUserAsync(client);

        if (newUser == null)
        {
            return BadRequest("Failed to create user");
        }

        // Generate a token for the new user
        var token = _userService.GenerateToken(newUser);
        return Ok(new { Token = token });
    }

}
