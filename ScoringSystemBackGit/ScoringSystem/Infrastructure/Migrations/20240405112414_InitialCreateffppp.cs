using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateffppp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Companies_Feedback_FeedbackId",
                table: "Companies");

            migrationBuilder.DropIndex(
                name: "IX_Companies_FeedbackId",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "FeedbackId",
                table: "Companies");

            migrationBuilder.CreateTable(
                name: "FeedbackCompany",
                columns: table => new
                {
                    FeedbackId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    relatedCompaniesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeedbackCompany", x => new { x.FeedbackId, x.relatedCompaniesId });
                    table.ForeignKey(
                        name: "FK_FeedbackCompany_Companies_relatedCompaniesId",
                        column: x => x.relatedCompaniesId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FeedbackCompany_Feedback_FeedbackId",
                        column: x => x.FeedbackId,
                        principalTable: "Feedback",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FeedbackCompany_relatedCompaniesId",
                table: "FeedbackCompany",
                column: "relatedCompaniesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FeedbackCompany");

            migrationBuilder.AddColumn<Guid>(
                name: "FeedbackId",
                table: "Companies",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Companies_FeedbackId",
                table: "Companies",
                column: "FeedbackId");

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_Feedback_FeedbackId",
                table: "Companies",
                column: "FeedbackId",
                principalTable: "Feedback",
                principalColumn: "Id");
        }
    }
}
