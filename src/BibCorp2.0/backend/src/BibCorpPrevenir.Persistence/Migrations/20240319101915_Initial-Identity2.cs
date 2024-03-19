using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BibCorpPrevenir.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialIdentity2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AcervoId",
                table: "Patrimonios",
                type: "INTEGER",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AcervoId",
                table: "Patrimonios");
        }
    }
}
