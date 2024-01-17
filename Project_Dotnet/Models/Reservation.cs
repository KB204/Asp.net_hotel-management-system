using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace Project_Dotnet.Models
{
    public class Reservation
    {
        [Key]
        public int ReservationID { get; set; }

        [ForeignKey("Client")]
        public int ClientID { get; set; }

        [ForeignKey("Room")]
        public int RoomID { get; set; }

        public int? FacilitieID { get; set; }

        [Required]
        public DateTime CheckInDate { get; set; } = DateTime.MinValue;

        [Required]
        public DateTime CheckOutDate { get; set; } = DateTime.MinValue;

        [Required]
        public decimal TotalAmount { get; set; } = 0.0m;

        [JsonIgnore]
        public virtual Client? Client { get; set; }

        [JsonIgnore]
        public virtual Room? Room { get; set; }

        [JsonIgnore]
        public virtual Facilitie? Facilitie { get; set; }
    }
}
