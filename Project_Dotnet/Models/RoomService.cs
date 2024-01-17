using System.Text.Json.Serialization;


namespace Project_Dotnet.Models
{
    public class RoomService
    {

        public int RoomID { get; set; }
        [JsonIgnore]
        public Room? Room { get; set; }

        public int ServiceID { get; set; }
        [JsonIgnore]
        public Service? Service { get; set; }
    }
}
