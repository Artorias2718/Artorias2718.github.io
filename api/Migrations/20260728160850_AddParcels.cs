using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddParcels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Parcel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rarity = table.Column<string>(type: "nvarchar(10)", nullable: false),
                    Odds = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Rate = table.Column<decimal>(type: "decimal(18,12)", precision: 18, scale: 12, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parcel", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Parcel");
        }
    }
}
