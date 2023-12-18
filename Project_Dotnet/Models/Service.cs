using System.ComponentModel.DataAnnotations;


namespace Project_Dotnet.Models
{
    public class Service
    {
        [Key]
        public int ServiceID { get; set; }

        [Required]
        public string ServiceName { get; set; }

        [Required]
        public string ServiceDescription { get; set; }

        [Required]

        public decimal Price { get; set; }

        public ICollection<RoomService> RoomServices { get; set; }
    }
}
