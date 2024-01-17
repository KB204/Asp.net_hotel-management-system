using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Dotnet.Data;
using Project_Dotnet.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_Dotnet.Controllers
{
    [ApiController]
    [Route("api/roomservices")]
    public class RoomServicesApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RoomServicesApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomService>>> GetRoomServices()
        {
            return await _context.RoomService.Include(r => r.Room).Include(r => r.Service).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoomService>> GetRoomService(int id)
        {
            var roomService = await _context.RoomService
                .Include(r => r.Room)
                .Include(r => r.Service)
                .FirstOrDefaultAsync(m => m.RoomID == id);

            if (roomService == null)
            {
                return NotFound();
            }

            return roomService;
        }

        [HttpPost]
        public async Task<ActionResult<RoomService>> PostRoomService(RoomService roomService)
        {
            _context.RoomService.Add(roomService);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoomService", new { id = roomService.RoomID }, roomService);
        }

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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoomService(int id)
        {
            var roomService = await _context.RoomService.FindAsync(id);
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
            return _context.RoomService.Any(e => e.RoomID == id);
        }
    }
}
