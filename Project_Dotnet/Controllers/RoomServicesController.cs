using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Dotnet.Data;
using Project_Dotnet.Models;

namespace Project_Dotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomServicesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RoomServicesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/RoomServices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetRoomService()
        {
            if (_context.RoomService == null)
            {
                return NotFound();
            }

            var roomServices = await _context.RoomService
                .Include(rs => rs.Room)
                .Include(rs => rs.Service)
                .ToListAsync();

            if (roomServices == null || roomServices.Count == 0)
            {
                return NotFound();
            }

            var roomserviceWithRoomNumber = roomServices.Select(r => new
            {
                r.RoomID,
                r.ServiceID,
                RoomNumber = r.Room != null ? r.Room.RoomNumber : 0,
                ServiceName = r.Service != null ? r.Service.ServiceName : string.Empty,
            });

            return Ok(roomserviceWithRoomNumber);
        }

        // GET: api/RoomServices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RoomService>> GetRoomService(int id)
        {
            if (_context.RoomService == null)
            {
                return NotFound();
            }
            var roomService = await _context.RoomService.FindAsync(id);

            if (roomService == null)
            {
                return NotFound();
            }

            return roomService;
        }

        // PUT: api/RoomServices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoomService(int id, RoomService roomService)
        {
            if (id != roomService.RoomID)
            {
                return BadRequest();
            }

            _context.Entry(roomService).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomServiceExists(id))
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

        // POST: api/RoomServices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RoomService>> PostRoomService([FromBody] RoomServiceDTO roomServiceDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Find the Room by number
            var room = await _context.Rooms.FirstOrDefaultAsync(r => r.RoomNumber == roomServiceDTO.RoomNumber);

            if (room == null)
            {
                return BadRequest($"Room with number {roomServiceDTO.RoomNumber} not found.");
            }

            // Find the Service by name
            var service = await _context.Services.FirstOrDefaultAsync(s => s.ServiceName == roomServiceDTO.ServiceName);
            if (service == null)
            {
                return BadRequest($"Service with name {roomServiceDTO.ServiceName} not found.");
            }

            // Create a new RoomService entity
            var roomService = new RoomService
            {
                RoomID = room.RoomID,
                ServiceID = service.ServiceID
            };

            _context.RoomService.Add(roomService);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RoomServiceExists(roomService.RoomID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRoomService", new { id = roomService.RoomID }, roomService);
        }


        // DELETE: api/RoomServices/5
        // DELETE: api/RoomServices/5/1
        [HttpDelete("{roomId}/{serviceId}")]
        public async Task<IActionResult> DeleteRoomService(int roomId, int serviceId)
        {
            var roomService = await _context.RoomService
                .FirstOrDefaultAsync(rs => rs.RoomID == roomId && rs.ServiceID == serviceId);

            if (roomService == null)
            {
                return NotFound();
            }

            _context.RoomService.Remove(roomService);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool RoomServiceExists(int id)
        {
            return (_context.RoomService?.Any(e => e.RoomID == id)).GetValueOrDefault();
        }
    }
}
