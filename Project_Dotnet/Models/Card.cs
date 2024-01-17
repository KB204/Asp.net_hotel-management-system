using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Dotnet.Models
{
    public class Card
    {
        [Key]
        public int CardID { get; set; }

        [Required]
        [ForeignKey("Client")]
        public int ClientID { get; set; }

        [Required]
        public string CardNumber { get; set; } = string.Empty;

        [Required]
        public int Points { get; set; } = 0;

        [Required]
        public string Reduction { get; set; } = string.Empty;

        public string Programme { get; set; } = string.Empty;

        public virtual Client Client { get; set; }
    }
}
