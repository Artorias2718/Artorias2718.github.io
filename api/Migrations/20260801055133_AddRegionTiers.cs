using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddRegionTiers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RegionTier",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Key = table.Column<string>(type: "nvarchar(120)", nullable: false),
                    Label = table.Column<string>(type: "nvarchar(120)", nullable: false),
                    Currency = table.Column<string>(type: "nvarchar(4)", nullable: false),
                    Derived = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegionTier", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BoostTier",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegionTierId = table.Column<int>(type: "int", nullable: false),
                    MinParcels = table.Column<int>(type: "int", nullable: false),
                    ParcelsLabel = table.Column<string>(type: "nvarchar(120)", nullable: false),
                    Boost = table.Column<int>(type: "int", nullable: false),
                    NoAdsMonth = table.Column<decimal>(type: "decimal(8,4)", precision: 8, scale: 4, nullable: false),
                    WithAdsMonth = table.Column<decimal>(type: "decimal(8,4)", precision: 8, scale: 4, nullable: false),
                    WithAdsYear = table.Column<decimal>(type: "decimal(8,4)", precision: 8, scale: 4, nullable: false),
                    SrbYear = table.Column<decimal>(type: "decimal(8,4)", precision: 8, scale: 4, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoostTier", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BoostTier_RegionTier_RegionTierId",
                        column: x => x.RegionTierId,
                        principalTable: "RegionTier",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RegionCountry",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegionTierId = table.Column<int>(type: "int", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(120)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegionCountry", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RegionCountry_RegionTier_RegionTierId",
                        column: x => x.RegionTierId,
                        principalTable: "RegionTier",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BoostTier_RegionTierId",
                table: "BoostTier",
                column: "RegionTierId");

            migrationBuilder.CreateIndex(
                name: "IX_RegionCountry_RegionTierId",
                table: "RegionCountry",
                column: "RegionTierId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BoostTier");

            migrationBuilder.DropTable(
                name: "RegionCountry");

            migrationBuilder.DropTable(
                name: "RegionTier");
        }
    }
}
