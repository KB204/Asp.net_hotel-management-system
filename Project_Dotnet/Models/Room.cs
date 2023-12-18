using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Dotnet.Models
{
    public class Room
    {
        [Key]
        public int RoomID { get; set; }

        [Required]
        [ForeignKey("Categorie")]
        public int CategorieID { get; set; }

        [Required]
        public int RoomNumber {  get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public bool IsAvailable { get; set; }

        public virtual ICollection<Reservation> Reservations { get; set; }
        public ICollection<RoomService> RoomServices { get; set; }
        public virtual Categorie Categorie { get; set; }
    }
}
