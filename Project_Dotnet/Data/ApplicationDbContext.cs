using Microsoft.EntityFrameworkCore;
using Project_Dotnet.Models;

namespace Project_Dotnet.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> option) : base(option)
        {
        }

        public DbSet<Client>? Clients { get; set; }

        public DbSet<Room>? Rooms { get; set; }
        public DbSet<Reservation>? Reservations { get; set; }
        public DbSet<Categorie>? Categories { get; set; }
        public DbSet<Service>? Services { get; set; }
        public DbSet<Facilitie>? Facilities { get; set; }
        public DbSet<Card>? Cards { get; set; }
        public DbSet<Review>? Reviews { get; set; }
        public DbSet<Utilisateur>? Utilisateurs { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define relationships
            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Client)
                .WithMany(g => g.Reservations)
                .HasForeignKey(r => r.ClientID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Room)
                .WithMany(room => room.Reservations)
                .HasForeignKey(r => r.RoomID)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<Room>()
                .HasOne(r => r.Categorie)
                .WithMany(room => room.Rooms)
                .HasForeignKey(r => r.CategorieID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RoomService>()
             .HasKey(rs => new { rs.RoomID, rs.ServiceID });

            modelBuilder.Entity<RoomService>()
                .HasOne(rs => rs.Room)
                .WithMany(r => r.RoomServices)
                .HasForeignKey(rs => rs.RoomID);

            modelBuilder.Entity<RoomService>()
                .HasOne(rs => rs.Service)
                .WithMany(s => s.RoomServices)
                .HasForeignKey(rs => rs.ServiceID);

            modelBuilder.Entity<Reservation>()
               .HasOne(r => r.Facilitie)
               .WithMany(room => room.Reservations)
               .HasForeignKey(r => r.FacilitieID)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Card>()
                .HasOne(c => c.Client)
                .WithOne(client => client.Card)
                .HasForeignKey<Card>(c => c.ClientID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Review>()
              .HasOne(r => r.Client)
              .WithMany(c => c.Reviews)
              .HasForeignKey(r => r.ClientID)
              .OnDelete(DeleteBehavior.Restrict);
        }
        public DbSet<Project_Dotnet.Models.RoomService>? RoomService { get; set; }
    }

}
