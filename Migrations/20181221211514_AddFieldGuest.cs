using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectBier.Migrations
{
    public partial class AddFieldGuest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "GuestUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "GuestUsers");
        }
    }
}
