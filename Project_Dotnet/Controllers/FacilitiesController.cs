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
    [Route("api/facilities")]
    public class FacilitiesApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FacilitiesApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Facilitie>>> GetFacilities()
        {
            return await _context.Facilities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Facilitie>> GetFacilitie(int id)
        {
            var facilitie = await _context.Facilities.FindAsync(id);

            if (facilitie == null)
            {
                return NotFound();
            }

            return facilitie;
        }

        [HttpPost]
        public async Task<ActionResult<Facilitie>> PostFacilitie(Facilitie facilitie)
        {
            _context.Facilities.Add(facilitie);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFacilitie", new { id = facilitie.FacilitieID }, facilitie);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFacilitie(int id, Facilitie facilitie)
        {
            if (id != facilitie.FacilitieID)
            {
                return BadRequest();
            }

            _context.Entry(facilitie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacilitieExists(id))
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
        public async Task<IActionResult> DeleteFacilitie(int id)
        {
            var facilitie = await _context.Facilities.FindAsync(id);
            if (facilitie == null)
            {
                return NotFound();
            }

            _context.Facilities.Remove(facilitie);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FacilitieExists(int id)
        {
            return _context.Facilities.Any(e => e.FacilitieID == id);
        }
    }
}
