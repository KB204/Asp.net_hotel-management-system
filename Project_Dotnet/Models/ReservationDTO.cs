using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Dotnet.Models
{
    public class ReservationDTO
    {
        public int ReservationID { get; set; }

        [Required(ErrorMessage = "The ClientName field is required.")]
        public string Nom { get; set; } = string.Empty;

        [Required(ErrorMessage = "The RoomNumber field is required.")]
        public int RoomNumber { get; set; }

        public string? FacilitieName { get; set; } = string.Empty;

        [Required(ErrorMessage = "The CheckInDate field is required.")]
        public DateTime CheckInDate { get; set; }

        [Required(ErrorMessage = "The CheckOutDate field is required.")]
        public DateTime CheckOutDate { get; set; }

        [Required(ErrorMessage = "The TotalAmount field is required.")]
        public decimal TotalAmount { get; set; }
    }
}
