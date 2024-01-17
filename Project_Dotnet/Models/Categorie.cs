using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Project_Dotnet.Models
{
    public class Categorie
    {
        [Key]
        public int CategorieID { get; set; }

        [Required]
        public string CategorieName { get; set; } = string.Empty;

        [Required]
        public string CategorieDescription { get; set; } = string.Empty;

        [Required]
        public string Capacity { get; set; } = string.Empty;

        public virtual ICollection<Room>? Rooms { get; set; } = new List<Room>();
    }
}
