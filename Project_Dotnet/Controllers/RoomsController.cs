using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Project_Dotnet.Data;
using Project_Dotnet.Models;

namespace Project_Dotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RoomsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {
            try
            {
                if (_context.Rooms == null)
                {
                    return NotFound();
                }

                var rooms = await _context.Rooms
                    .Include(r => r.Categorie) // Include the related Categorie
                    .ToListAsync();

                if (rooms == null || rooms.Count == 0)
                {
                    return NotFound();
                }

                // Project the data to a model that includes the CategorieName
                var roomsWithCategoryName = rooms.Select(r => new
                {
                    r.RoomID,
                    r.CategorieID,
                    r.RoomNumber,
                    r.Price,
                    r.IsAvailable,
                    CategorieName = r.Categorie != null ? r.Categorie.CategorieName : string.Empty
                });

                return Ok(roomsWithCategoryName);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in GetRooms: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }


        // GET: api/Rooms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RoomDTO>> GetRoom(int id)
        {
            try
            {
                var room = await _context.Rooms
                    .Include(r => r.Categorie) // Include the related Categorie
                    .FirstOrDefaultAsync(r => r.RoomID == id);

                if (room == null)
                {
                    return NotFound();
                }

                // Map the Room entity to RoomDTO
                var roomDTO = new RoomDTO
                {
                    RoomID = room.RoomID,
                    RoomNumber = room.RoomNumber,
                    Price = room.Price,
                    IsAvailable = room.IsAvailable,
                    CategorieName = room.Categorie?.CategorieName,
                    // Map other properties as needed
                };

                return roomDTO;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in GetRoom: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }



        // PUT: api/Rooms/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoom(int id, RoomDTO roomDTO)
        {
            try
            {
                if (id != roomDTO.RoomID)
                {
                    return BadRequest();
                }

                // Find the Categorie by name
                var categorie = await _context.Categories.FirstOrDefaultAsync(c => c.CategorieName == roomDTO.CategorieName);

                if (categorie == null)
                {
                    return BadRequest($"Categorie with name {roomDTO.CategorieName} not found.");
                }

                // Check if the room number already exists
                if (_context.Rooms != null && _context.Rooms.Any(r => r.RoomNumber == roomDTO.RoomNumber && r.RoomID != id))
                {
                    return BadRequest("Chambre existe déjà. Veuillez choisir un autre numéro");
                }

                var existingRoom = await _context.Rooms.FindAsync(id);

                if (existingRoom == null)
                {
                    return NotFound();
                }

                existingRoom.CategorieID = categorie.CategorieID;
                existingRoom.RoomNumber = roomDTO.RoomNumber;
                existingRoom.Price = roomDTO.Price;
                existingRoom.IsAvailable = roomDTO.IsAvailable;

                _context.Entry(existingRoom).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in PutRoom: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }



        // POST: api/Rooms
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Room>> PostRoom([FromBody] RoomDTO roomDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Find the Categorie by name
            var categorie = await _context.Categories.FirstOrDefaultAsync(c => c.CategorieName == roomDTO.CategorieName);

            if (categorie == null)
            {
                return BadRequest($"Categorie with name {roomDTO.CategorieName} not found.");
            }

            // Check if the room number already exists
            if (_context.Rooms.Any(r => r.RoomNumber == roomDTO.RoomNumber))
            {
                return BadRequest("Chambre existe déjà. Veuillez choisir un autre numéro.");
            }

            // Create a new Room entity
            var room = new Room
            {
                CategorieID = categorie.CategorieID,
                RoomNumber = roomDTO.RoomNumber,
                Price = roomDTO.Price,
                IsAvailable = roomDTO.IsAvailable
            };

            _context.Rooms.Add(room);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RoomExists(room.RoomID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRoom", new { id = room.RoomID }, room);
        }



        // DELETE: api/Rooms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            if (_context.Rooms == null)
            {
                return NotFound();
            }
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
            return (_context.Rooms?.Any(e => e.RoomID == id)).GetValueOrDefault();
        }
    }
}
