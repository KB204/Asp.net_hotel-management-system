using System.ComponentModel.DataAnnotations;

namespace Project_Dotnet.Models
{
    public class Categorie
    {
        [Key]
        public int CategorieID { get; set; }

        [Required]
        public string CategorieName { get; set;}

        [Required]
        public string CategorieDescription { get; set;}

        [Required]
        public string Capacity { get; set;}

        public virtual ICollection<Room> Rooms { get; set; }
    }
}
