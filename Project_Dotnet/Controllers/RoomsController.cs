using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Dotnet.Data;
using Project_Dotnet.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Threading.Tasks;

namespace Project_Dotnet.Controllers
{
    [ApiController]
    [Route("api/rooms")]
    public class RoomsApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RoomsApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {
            return await _context.Rooms.Include(r => r.Categorie).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoom(int id)
        {
            var room = await _context.Rooms.Include(r => r.Categorie).FirstOrDefaultAsync(m => m.RoomID == id);

            if (room == null)
            {
                return NotFound();
            }

            return room;
        }

        [HttpPost]
        public async Task<ActionResult<Room>> PostRoom(Room room)
        {
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoom", new { id = room.RoomID }, room);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoom(int id, Room room)
        {
            if (id != room.RoomID)
            {
                return BadRequest();
            }

            _context.Entry(room).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                return NotFound();
            }

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoomExists(int id)
        {
            return _context.Rooms.Any(e => e.RoomID == id);
        }

        [HttpGet("category/{id}")]
        public async Task<ActionResult<IEnumerable<Room>>> GetRoomsByCategory(int id)
        {
            var roomsInCategory = await _context.Rooms
                .Where(r => r.CategorieID == id)
                .ToListAsync();

            if (roomsInCategory == null || roomsInCategory.Count == 0)
            {
                return NotFound();
            }

            // Manually remove Categorie property from each room before serialization
            foreach (var room in roomsInCategory)
            {
                room.Categorie = null;
            }

            var json = JsonSerializer.Serialize(roomsInCategory);

            return Content(json, "application/json");
        }

    }
}
