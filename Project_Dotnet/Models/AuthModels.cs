using System.ComponentModel.DataAnnotations;

namespace Project_Dotnet.Models
{
    public class AuthModels
    {
        public class RegistrationModel
        {
            [Required]
            public string Name { get; set; }

            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            public string Password { get; set; }

            public string Role { get; set; }
        }

        public class LoginModel
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            public string Password { get; set; }
        }
    }
}
