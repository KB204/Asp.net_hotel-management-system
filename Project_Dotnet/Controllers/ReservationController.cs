// Controllers/ReservationController.cs
using Microsoft.AspNetCore.Mvc;
using Project_Dotnet.Data;
using Project_Dotnet.Models;

[ApiController]
[Route("api/reservations")]
public class ReservationController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ReservationController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult AddReservation([FromBody] Reservation reservation)
    {
        if (reservation == null)
        {
            return BadRequest("Invalid reservation data");
        }

        _context.Reservations.Add(reservation);
        _context.SaveChanges();

        return Ok("Reservation added successfully");
    }

    // Add other methods for updating, deleting, or retrieving reservations
}
