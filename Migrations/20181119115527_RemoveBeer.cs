using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectBier.Migrations
{
    public partial class RemoveBeer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Beer");

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<decimal>(nullable: false),
                    Available = table.Column<bool>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Url = table.Column<string>(nullable: true),
                    CategoryId = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    AlcoholPercentage = table.Column<string>(nullable: true),
                    BrewerName = table.Column<string>(nullable: true),
                    CountryName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.CreateTable(
                name: "Beer",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    AlcoholPercentage = table.Column<string>(nullable: true),
                    Available = table.Column<bool>(nullable: false),
                    BrewerName = table.Column<string>(nullable: true),
                    CategoryId = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    CountryName = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<decimal>(nullable: false),
                    Url = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Beer", x => x.Id);
                });
        }
    }
}
