using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdatingDataBasee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_newLabel_Topic_TopicId",
                table: "newLabel");

            migrationBuilder.DropIndex(
                name: "IX_newLabel_TopicId",
                table: "newLabel");

            migrationBuilder.CreateTable(
                name: "TopicLabels",
                columns: table => new
                {
                    LabelsNewLabelId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TopicIdTopic = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TopicLabels", x => new { x.LabelsNewLabelId, x.TopicIdTopic });
                    table.ForeignKey(
                        name: "FK_TopicLabels_Topic_TopicIdTopic",
                        column: x => x.TopicIdTopic,
                        principalTable: "Topic",
                        principalColumn: "IdTopic",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TopicLabels_newLabel_LabelsNewLabelId",
                        column: x => x.LabelsNewLabelId,
                        principalTable: "newLabel",
                        principalColumn: "NewLabelId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TopicLabels_TopicIdTopic",
                table: "TopicLabels",
                column: "TopicIdTopic");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TopicLabels");

            migrationBuilder.CreateIndex(
                name: "IX_newLabel_TopicId",
                table: "newLabel",
                column: "TopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_newLabel_Topic_TopicId",
                table: "newLabel",
                column: "TopicId",
                principalTable: "Topic",
                principalColumn: "IdTopic",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
