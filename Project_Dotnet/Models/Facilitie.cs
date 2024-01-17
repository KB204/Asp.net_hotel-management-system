using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Project_Dotnet.Models
{
    public class Facilitie
    {
        [Key]
        public int FacilitieID { get; set; }

        [Required]
        public string FacilitieName { get; set; } = string.Empty;

        [Required]
        public string FacilitieDescription { get; set; } = string.Empty;

        [Required]
        public decimal FacilitiePrice { get; set; } = 0.0m;

        public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    }
}
