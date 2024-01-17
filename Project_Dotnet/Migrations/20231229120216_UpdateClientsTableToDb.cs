using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project_Dotnet.Migrations
{
    public partial class UpdateClientsTableToDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Prenom",
                table: "Clients");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Prenom",
                table: "Clients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
