// Client.cs
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Project_Dotnet.Models
{
    public class Client
    {
        [Key]
        public int ClientID { get; set; }

        [Required]
        public string Cin { get; set; } = string.Empty;

        [Required]
        public string Nom { get; set; } = string.Empty;

        [Required]
        public string Prenom { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string Telephone { get; set; } = string.Empty;

        // Properties for authentication
        [Required]
        public string Password { get; set; } = string.Empty;

        public string Addresse { get; set; } = string.Empty;

        public virtual ICollection<Reservation>? Reservations { get; set; } = new List<Reservation>();
        public virtual ICollection<Review>? Reviews { get; set; } = new List<Review>();
        public virtual Card? Card { get; set; }
    }
}
