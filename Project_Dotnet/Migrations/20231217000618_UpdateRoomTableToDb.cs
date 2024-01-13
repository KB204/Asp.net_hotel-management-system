using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project_Dotnet.Migrations
{
    public partial class UpdateRoomTableToDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategorieID",
                table: "Rooms",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_CategorieID",
                table: "Rooms",
                column: "CategorieID");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Categories_CategorieID",
                table: "Rooms",
                column: "CategorieID",
                principalTable: "Categories",
                principalColumn: "CategorieID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Categories_CategorieID",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_CategorieID",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "CategorieID",
                table: "Rooms");
        }
    }
}
