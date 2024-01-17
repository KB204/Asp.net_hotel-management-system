using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Dotnet.Data;
using Project_Dotnet.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Newtonsoft.Json;

namespace Project_Dotnet.Controllers
{
    [ApiController]
    [Route("api/reservations")]
    public class ReservationsApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReservationsApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
            return await _context.Reservations.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

  [HttpPost]
public ActionResult<Reservation> PostReservation(Reservation reservation)
{
    try
    {
        // Access user information
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);


        // Calculate total amount based on your business logic
        reservation.TotalAmount = CalculateTotalAmount(reservation);

        // Your existing code for adding and saving the reservation...
        _context.Reservations.Add(reservation);
        _context.SaveChanges();

        return CreatedAtAction("GetReservation", new { id = reservation.ReservationID }, reservation);
    }
    catch (Exception ex)
    {
        // Log any exceptions that occurred during the reservation creation
        Console.WriteLine($"Error creating reservation: {ex.Message}");
        return StatusCode(500, "Internal Server Error");
    }
}


            private decimal CalculateTotalAmount(Reservation reservation)
            {
                // Your logic to calculate the total amount based on check-in, check-out, room, etc.
                // Example logic: just for illustration, replace it with your actual business logic
                var totalAmount = 100.0m; // Replace with your calculation

                return totalAmount;
            }




        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, Reservation reservation)
        {
            if (id != reservation.ReservationID)
            {
                return BadRequest();
            }

            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
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
        public async Task<IActionResult> DeleteReservation(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReservationExists(int id)
        {
            return _context.Reservations.Any(e => e.ReservationID == id);
        }
    }
}
