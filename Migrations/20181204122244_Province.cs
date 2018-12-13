using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectBier.Migrations
{
    public partial class Province : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Province",
                table: "Addresses",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Province",
                table: "Addresses");
        }
    }
}
