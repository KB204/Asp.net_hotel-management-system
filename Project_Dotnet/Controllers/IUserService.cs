// IUserService.cs
using System.Threading.Tasks;
using Project_Dotnet.Data;
using Project_Dotnet.Models;

namespace Project_Dotnet.Services
{
    public interface IUserService
    {
        Task<Client> AuthenticateAsync(string email, string password, ApplicationDbContext dbContext);
        Task<Client> CreateUserAsync(Client client);
        string GenerateToken(Client client);
    }
}
