using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class FixFAQS : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_FAQ_FaqGroupId",
                table: "FAQ",
                column: "FaqGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_FAQ_FAQGroup_FaqGroupId",
                table: "FAQ",
                column: "FaqGroupId",
                principalTable: "FAQGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FAQ_FAQGroup_FaqGroupId",
                table: "FAQ");

            migrationBuilder.DropIndex(
                name: "IX_FAQ_FaqGroupId",
                table: "FAQ");
        }
    }
}
