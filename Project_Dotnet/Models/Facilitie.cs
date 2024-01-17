using System.ComponentModel.DataAnnotations;

namespace Project_Dotnet.Models
{
    public class Facilitie
    {
        [Key]
        public int FacilitieID { get; set; }

        [Required]
        public string FacilitieName { get; set; }

        [Required]
        public string FacilitieDescription { get; set; }

        [Required]
        public decimal FacilitiePrice { get; set; }

        public virtual ICollection<Reservation>? Reservations { get; set; }
    }
}
