using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Project_Dotnet.Models
{
    public class Service
    {
        [Key]
        public int ServiceID { get; set; }

        [Required]
        public string ServiceName { get; set; } = string.Empty;

        [Required]
        public string ServiceDescription { get; set; } = string.Empty;

        [Required]
        public decimal Price { get; set; } = 0.0m;

        public ICollection<RoomService> RoomServices { get; set; } = new List<RoomService>();
    }
}
