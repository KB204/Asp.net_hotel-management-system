using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Project_Dotnet.Models
{
    public class Reservation
    {
        [Key]
        public int ReservationID { get; set; }

        [Required]
        [ForeignKey("Client")]
        public int? ClientID { get; set; }

        [Required]
        [ForeignKey("Room")]
        public int RoomID { get; set; }

        [ForeignKey("Facilitie")]
        public int FacilitieID { get; set; }

        [Required]
        public DateTime CheckInDate { get; set; }

        [Required]
        public DateTime CheckOutDate { get; set; }

        [Required]
        public decimal TotalAmount { get; set; }

      
        public virtual Client? Client { get; set; }
        public virtual Room? Room { get; set; }
        public virtual Facilitie? Facilitie { get; set; }
    }
}
