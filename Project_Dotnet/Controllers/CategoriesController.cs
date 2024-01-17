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
    [Route("api/categories")]
    public class CategoriesApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categorie>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Categorie>> GetCategory(int id)
        {
            var categorie = await _context.Categories.FindAsync(id);

            if (categorie == null)
            {
                return NotFound();
            }

            return categorie;
        }

        [HttpPost]
        public async Task<ActionResult<Categorie>> PostCategory(Categorie categorie)
        {
            _context.Categories.Add(categorie);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = categorie.CategorieID }, categorie);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Categorie categorie)
        {
            if (id != categorie.CategorieID)
            {
                return BadRequest();
            }

            _context.Entry(categorie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategorieExists(id))
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
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var categorie = await _context.Categories.FindAsync(id);
            if (categorie == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(categorie);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategorieExists(int id)
        {
            return _context.Categories.Any(e => e.CategorieID == id);
        }
    }
}
