using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project_Dotnet.Migrations
{
    public partial class UpdateReservation2TableToDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FacilitieID",
                table: "Reservations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_FacilitieID",
                table: "Reservations",
                column: "FacilitieID");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Facilities_FacilitieID",
                table: "Reservations",
                column: "FacilitieID",
                principalTable: "Facilities",
                principalColumn: "FacilitieID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Facilities_FacilitieID",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_FacilitieID",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "FacilitieID",
                table: "Reservations");
        }
    }
}
