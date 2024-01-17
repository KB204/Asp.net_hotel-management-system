using System;
using System.Collections.Generic;
using System.Linq;
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
    public class FacilitiesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FacilitiesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Facilities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Facilitie>>> GetFacilities()
        {
          if (_context.Facilities == null)
          {
              return NotFound();
          }
            return await _context.Facilities.ToListAsync();
        }

        // GET: api/Facilities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Facilitie>> GetFacilitie(int id)
        {
          if (_context.Facilities == null)
          {
              return NotFound();
          }
            var facilitie = await _context.Facilities.FindAsync(id);

            if (facilitie == null)
            {
                return NotFound();
            }

            return facilitie;
        }

        // PUT: api/Facilities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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

        // POST: api/Facilities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Facilitie>> PostFacilitie(Facilitie facilitie)
        {
          if (_context.Facilities == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Facilities'  is null.");
          }
            _context.Facilities.Add(facilitie);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFacilitie", new { id = facilitie.FacilitieID }, facilitie);
        }

        // DELETE: api/Facilities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFacilitie(int id)
        {
            if (_context.Facilities == null)
            {
                return NotFound();
            }
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
            return (_context.Facilities?.Any(e => e.FacilitieID == id)).GetValueOrDefault();
        }
    }
}
