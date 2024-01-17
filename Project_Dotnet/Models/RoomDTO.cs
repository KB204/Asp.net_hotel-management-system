using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Dotnet.Models
{
    public class RoomDTO
    {
        public int RoomID { get; set; }

        [Required(ErrorMessage = "The roomNumber field is required.")]
        public int RoomNumber { get; set; }

        [Required(ErrorMessage = "The Price field is required.")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "The status field is required.")]
        public bool IsAvailable { get; set; }

        [Required(ErrorMessage = "The categorieName field is required.")]
        public string CategorieName { get; set; } = string.Empty;
    }

}
