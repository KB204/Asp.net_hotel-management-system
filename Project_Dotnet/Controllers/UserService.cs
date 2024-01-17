// UserService.cs
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Project_Dotnet.Data;
using Project_Dotnet.Models;
using Microsoft.EntityFrameworkCore;

namespace Project_Dotnet.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<UserService> _logger;
        private readonly ApplicationDbContext _dbContext;

        public UserService(IConfiguration configuration, ILogger<UserService> logger, ApplicationDbContext dbContext)
        {
            _configuration = configuration;
            _logger = logger;
            _dbContext = dbContext;
        }

        public async Task<Client> AuthenticateAsync(string email, string password, ApplicationDbContext dbContext)
        {
            _logger.LogInformation($"Attempting user authentication for email: {email}");

            // Replace this with your actual database query logic
            var user = await dbContext.Clients
                .SingleOrDefaultAsync(u => u.Email == email && u.Password == password);

            if (user != null)
            {
                _logger.LogInformation($"User authentication successful for email: {email}");
                // Now, let's retrieve the user ID from the database using the email
                var userId = await dbContext.Clients
                    .Where(u => u.Email == email)
                    .Select(u => u.ClientID)
                    .FirstOrDefaultAsync();

                // Attach the user ID to the user object
                user.ClientID = userId;

                return user;
            }

            _logger.LogWarning($"User authentication failed for email: {email}");
            return null;
        }

        private async Task<bool> IsValidUserAsync(string email, string password)
        {
            // Replace this with your actual database query logic
            var user = await _dbContext.Clients
                .SingleOrDefaultAsync(u => u.Email == email && u.Password == password);

            return user != null;
        }

        public async Task<Client> CreateUserAsync(Client client)
        {
            // Add the new user to the database
            _dbContext.Clients.Add(client);
            await _dbContext.SaveChangesAsync();

            return client;
        }

        public string GenerateToken(Client client)
        {
            if (string.IsNullOrEmpty(client?.Email))
            {
                throw new ArgumentNullException(nameof(client.Email), "Email cannot be null or empty.");
            }

            byte[] emailBytes = Encoding.UTF8.GetBytes(client.Email);

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, client.Email),
                new Claim(ClaimTypes.NameIdentifier, client.ClientID.ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
