using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Project_Dotnet.Data;
using Project_Dotnet.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

public class AuthService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly string _issuer;
    private readonly string _audience;
    private readonly string _secretKey;

    public AuthService(ApplicationDbContext dbContext, string issuer, string audience, string secretKey)
    {
        _dbContext = dbContext;
        _issuer = issuer;
        _audience = audience;
        _secretKey = secretKey;
    }

    public string GenerateJwtToken(Utilisateur user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
            // Add additional claims
        };

        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1), // Set expiration
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public Utilisateur RegisterUser(string name, string email, string password, string role = "User")
    {
        var user = new Utilisateur
        {
            Name = name,
            Email = email,
            Role = role,
        };

        user.SetPassword(password);

        // Save user to the database
        _dbContext.Utilisateurs.Add(user);
        _dbContext.SaveChanges();

        return user;
    }

    public Utilisateur AuthenticateUser(string email, string password)
    {
        // Retrieve user from the database based on the provided email
        var user = _dbContext.Utilisateurs.FirstOrDefault(u => u.Email == email);

        // Verify the password
        if (user != null && user.VerifyPassword(password))
        {
            return user;
        }

        return null;
    }

    public Utilisateur GetUserById(int userId)
    {
        return _dbContext.Utilisateurs.Find(userId);
    }

    public void UpdateUser(Utilisateur user)
    {
        _dbContext.Entry(user).State = EntityState.Modified;
        _dbContext.SaveChanges();
    }
}
