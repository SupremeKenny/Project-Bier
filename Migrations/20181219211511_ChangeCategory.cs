using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectBier.Migrations
{
    public partial class ChangeCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Categories");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Categories",
                nullable: true);
        }
    }
}
