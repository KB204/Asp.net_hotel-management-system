using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Dotnet.Models
{
    public class RoomServiceDTO
    {
        [Required(ErrorMessage = "The roomNumber field is required.")]
        public int RoomNumber { get; set; }

        [Required(ErrorMessage = "The serviceName field is required.")]
        public string ServiceName { get; set; } = string.Empty;
    }
}
