using System;
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
        public string CardNumber { get; set; }

        [Required]
        public int Points { get; set; }

        [Required]
        public string Reduction { get; set; }

        public string Programme { get; set; }

        public virtual Client Client { get; set; }  
    }
}
