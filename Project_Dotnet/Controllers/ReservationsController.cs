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
    public class ReservationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReservationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Reservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetReservations()
        {
            try
            {
                if (_context.Reservations == null)
                {
                    return NotFound();
                }

                var reservations = await _context.Reservations
                    .Include(r => r.Client)
                    .Include(r => r.Room)
                    .Include(r => r.Facilitie)
                    .ToListAsync();

                if (reservations == null || reservations.Count == 0)
                {
                    return NotFound();
                }

                // Project the data to a model that includes the ClientName, RoomNumber, and FacilitieName
                var reservationsWithDetails = reservations.Select(r => new
                {
                    r.ReservationID,
                    r.ClientID,
                    r.RoomID,
                    r.FacilitieID,
                    r.CheckInDate,
                    r.CheckOutDate,
                    r.TotalAmount,
                    Nom = r.Client != null ? r.Client.Nom : null,
                    RoomNumber = r.Room != null ? r.Room.RoomNumber : (int?)null,
                    FacilitieName = r.Facilitie != null ? r.Facilitie.FacilitieName : null
                });

                return Ok(reservationsWithDetails);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in GetReservations: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }


        // GET: api/Reservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReservationDTO>> GetReservation(int id)
        {
            try
            {
                var reservation = await _context.Reservations
                    .Include(r => r.Client)
                    .Include(r => r.Room)
                    .Include(r => r.Facilitie)
                    .FirstOrDefaultAsync(r => r.ReservationID == id);

                if (reservation == null)
                {
                    return NotFound();
                }

                var reservationDTO = new ReservationDTO
                {
                    ReservationID = reservation.ReservationID,
                    Nom = reservation.Client?.Nom,
                    RoomNumber = reservation.Room?.RoomNumber ?? 0,
                    FacilitieName = reservation.Facilitie?.FacilitieName,
                    CheckInDate = reservation.CheckInDate,
                    CheckOutDate = reservation.CheckOutDate,
                    TotalAmount = reservation.TotalAmount
                };

                return reservationDTO;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in GetReservation: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        // PUT: api/Reservations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, ReservationDTO reservationDTO)
        {
            try
            {
                if (id != reservationDTO.ReservationID)
                {
                    return BadRequest();
                }

                var reservation = await _context.Reservations
                    .Include(r => r.Room)
                    .FirstOrDefaultAsync(r => r.ReservationID == id);

                if (reservation == null)
                {
                    return NotFound();
                }

                // Check if the room number is being changed
                if (reservation.Room.RoomNumber != reservationDTO.RoomNumber)
                {
                    // Find or create the associated Room (with available status)
                    var room = await _context.Rooms
                        .FirstOrDefaultAsync(r => r.RoomNumber == reservationDTO.RoomNumber && r.IsAvailable)
                        ?? new Room { RoomNumber = reservationDTO.RoomNumber, IsAvailable = true };

                    reservation.RoomID = room.RoomID;
                }

                // Find or create the associated Facilitie (if FacilitieName is provided)
                Facilitie facilitie = null;
                if (!string.IsNullOrEmpty(reservationDTO.FacilitieName))
                {
                    facilitie = await _context.Facilities.FirstOrDefaultAsync(f => f.FacilitieName == reservationDTO.FacilitieName)
                                 ?? new Facilitie { FacilitieName = reservationDTO.FacilitieName };
                }

                // Update FacilitieID
                reservation.FacilitieID = facilitie?.FacilitieID;

                reservation.CheckInDate = reservationDTO.CheckInDate;
                reservation.CheckOutDate = reservationDTO.CheckOutDate;
                reservation.TotalAmount = reservationDTO.TotalAmount;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in PutReservation: {ex.Message}");
                return StatusCode(500, "Chambre indisponible");
            }
        }

        [HttpGet("reservations-per-month")]
        public ActionResult<IEnumerable<object>> GetReservationsPerMonth()
        {
            try
            {
                var reservationsPerMonth = _context.Reservations
                    .GroupBy(r => new { Year = r.CheckInDate.Year, Month = r.CheckInDate.Month })
                    .Select(group => new
                    {
                        Year = group.Key.Year,
                        Month = group.Key.Month,
                        ReservationCount = group.Count()
                    })
                    .ToList();

                return Ok(reservationsPerMonth);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetReservationsPerMonth: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("total-reservations")]
        public ActionResult<int> GetTotalReservations()
        {
            try
            {
                var totalReservations = _context.Reservations.Count();
                return Ok(totalReservations);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetTotalReservations: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpGet("monthly-gain")]
        public ActionResult<IEnumerable<object>> GetMonthlyGain()
        {
            try
            {
                var monthlyGain = _context.Reservations
                    .AsEnumerable()
                    .GroupBy(r => new { Year = r.CheckInDate.Year, Month = r.CheckInDate.Month })
                    .Select(group => new
                    {
                        Year = group.Key.Year,
                        Month = group.Key.Month,
                        TotalAmount = group.Sum(r => Convert.ToDouble(r.TotalAmount))
                    })
                    .ToList();

                return Ok(monthlyGain);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetMonthlyGain: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("total-gain")]
        public ActionResult<decimal> GetTotalGain()
        {
            try
            {
                var totalGain = _context.Reservations
                    .AsEnumerable()
                    .Sum(r => r.TotalAmount);

                return Ok(totalGain);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetTotalGain: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpGet("room-occupancy")]
        public ActionResult<IEnumerable<object>> GetRoomOccupancy()
        {
            try
            {
                var roomOccupancy = _context.Reservations
                    .Include(r => r.Room)
                    .AsEnumerable()
                    .Where(r => r.Room != null)
                    .GroupBy(r => new { RoomNumber = r.Room.RoomNumber, Year = r.CheckInDate.Year, Month = r.CheckInDate.Month })
                    .Select(group => new
                    {
                        RoomNumber = group.Key.RoomNumber,
                        Year = group.Key.Year,
                        Month = group.Key.Month,
                        ReservationCount = group.Count()
                    })
                    .ToList();

                return Ok(roomOccupancy);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetRoomOccupancy: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpGet("loyal-customers")]
        public ActionResult<IEnumerable<object>> GetLoyalCustomers()
        {
            try
            {
                var loyalCustomers = _context.Reservations
                    .Include(r => r.Client)
                    .AsEnumerable()
                    .Where(r => r.Client != null) 
                    .GroupBy(r => new { Nom = r.Client.Nom })
                    .Where(group => group.Count() > 1)
                    .Select(group => new
                    {
                        Nom = group.Key.Nom,
                        ReservationCount = group.Count()
                    })
                    .ToList();

                return Ok(loyalCustomers);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetLoyalCustomers: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("most-reserved-category")]
        public ActionResult<string> GetMostReservedCategory()
        {
            try
            {
                var mostReservedCategory = _context.Reservations
                    .Include(r => r.Room)
                    .ThenInclude(room => room.Categorie)
                    .AsEnumerable()
                    .GroupBy(r => r.Room?.Categorie)
                    .Where(group => group.Key != null)
                    .OrderByDescending(group => group.Count())
                    .FirstOrDefault()
                    ?.Key;

                if (mostReservedCategory != null)
                {
                    return Ok(new { CategoryName = mostReservedCategory.CategorieName });
                }
                else
                {
                    return Ok(new { Message = "No reservations yet" });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetMostReservedCategory: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        // POST: api/Reservations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation(ReservationDTO reservationDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Find or create the associated Client
                var client = await _context.Clients.FirstOrDefaultAsync(c => c.Nom == reservationDTO.Nom)
                                ?? new Client { Nom = reservationDTO.Nom };

                // Find or create the associated Room (with available status)
                var room = await _context.Rooms.FirstOrDefaultAsync(r => r.RoomNumber == reservationDTO.RoomNumber && r.IsAvailable)
                            ?? new Room { RoomNumber = reservationDTO.RoomNumber, IsAvailable = true };

                // Find or create the associated Facilitie (if FacilitieName is provided)
                Facilitie facilitie = null;
                if (!string.IsNullOrEmpty(reservationDTO.FacilitieName))
                {
                    facilitie = await _context.Facilities.FirstOrDefaultAsync(f => f.FacilitieName == reservationDTO.FacilitieName)
                                 ?? new Facilitie { FacilitieName = reservationDTO.FacilitieName };
                }

                // Create the Reservation entity
                var reservation = new Reservation
                {
                    ClientID = client.ClientID,
                    RoomID = room.RoomID,
                    FacilitieID = facilitie?.FacilitieID, // Set FacilitieID only if Facilitie exists
                    CheckInDate = reservationDTO.CheckInDate,
                    CheckOutDate = reservationDTO.CheckOutDate,
                    TotalAmount = reservationDTO.TotalAmount
                };

                _context.Reservations.Add(reservation);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetReservation", new { id = reservation.ReservationID }, reservation);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in PostReservation: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }



        // DELETE: api/Reservations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            if (_context.Reservations == null)
            {
                return NotFound();
            }
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
            return (_context.Reservations?.Any(e => e.ReservationID == id)).GetValueOrDefault();
        }
    }
}
