using System.ComponentModel.DataAnnotations;

namespace Project_Dotnet.Models
{
    public class Client
    {
        [Key]
        public int ClientID { get; set; }

        [Required]
        public string Cin { get; set; }

        [Required]
        public string Nom { get; set; }

        [Required]
        public string Prenom { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string Telephone { get; set; }

        public string Addresse { get; set; }

        public virtual ICollection<Reservation> Reservations { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual Card Card { get; set; }
    }
}
