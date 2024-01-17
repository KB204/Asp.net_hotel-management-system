using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace Project_Dotnet.Models
{
    public class Room
    {
        [Key]
        public int RoomID { get; set; }

        [ForeignKey("Categorie")]
        public int CategorieID { get; set; }

        [Required]
        public int RoomNumber { get; set; }

        [Required]
        public decimal Price { get; set; } = 0.0m;

        [Required]
        public bool IsAvailable { get; set; }

        public virtual ICollection<Reservation>? Reservations { get; set; } = new List<Reservation>();

        public ICollection<RoomService>? RoomServices { get; set; } = new List<RoomService>();

        [JsonIgnore]
        public virtual Categorie? Categorie { get; set; } 
    }
}
