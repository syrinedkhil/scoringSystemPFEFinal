using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Addmmmm : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NewArticleScore",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ArticleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TopicId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    result = table.Column<float>(type: "real", nullable: false),
                    HighScore = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MidScore = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LowScore = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewArticleScore", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NewArticleScore_NewArticle_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "NewArticle",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NewArticleScore_Topic_TopicId",
                        column: x => x.TopicId,
                        principalTable: "Topic",
                        principalColumn: "IdTopic",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NewArticleScore_ArticleId",
                table: "NewArticleScore",
                column: "ArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_NewArticleScore_TopicId",
                table: "NewArticleScore",
                column: "TopicId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NewArticleScore");
        }
    }
}
