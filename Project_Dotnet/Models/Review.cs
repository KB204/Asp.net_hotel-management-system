using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Dotnet.Models
{
    public class Review
    {
        [Key]
        public int ReviewID { get; set; }

        [Required]
        [ForeignKey("Client")]
        public int ClientID { get; set; }

        [Required]
        public string Comment { get; set; } = string.Empty;

        public int Stars { get; set; } = 0;

        public virtual Client Client { get; set; }
    }
}
