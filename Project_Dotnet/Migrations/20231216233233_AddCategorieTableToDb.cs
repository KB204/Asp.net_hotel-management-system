using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project_Dotnet.Migrations
{
    public partial class AddCategorieTableToDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategorieID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CategorieName = table.Column<string>(type: "TEXT", nullable: false),
                    CategorieDescription = table.Column<string>(type: "TEXT", nullable: false),
                    Capacity = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategorieID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
