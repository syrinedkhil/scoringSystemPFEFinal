using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Addoo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Feedback",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    topicId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    articleUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    highScore = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    midScore = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    lowScore = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    finalScore = table.Column<float>(type: "real", nullable: false),
                    rated = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedback", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Feedback_Topic_topicId",
                        column: x => x.topicId,
                        principalTable: "Topic",
                        principalColumn: "IdTopic",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_topicId",
                table: "Feedback",
                column: "topicId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Feedback");
        }
    }
}
