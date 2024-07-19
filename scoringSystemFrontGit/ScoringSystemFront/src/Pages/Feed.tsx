import  { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ProjectApi from "../API/ProjectApi";
import { NewArticleResponse } from "../lib/autorest-library-v1/src";
import LaunchIcon from "@mui/icons-material/Launch";
const Feed = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [articleFeed, setArticleFeed] = useState<NewArticleResponse[]>([]);
  const [selectedArticle, setSelectedArticle] =
    useState<NewArticleResponse | null>(null);
  const myAPI = new ProjectApi();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const articles = await myAPI.getAllFeedbackByCompanyName({
        requestOptions: {
          customHeaders: { Authorization: `Bearer ${accessToken}` },
        },
      });
      
      setArticleFeed(articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "calc(100vh - 64px)",
        }}
      >
        {/* Left Sidebar */}
        <Box
          sx={{
            width: "30%",
            padding: "8px",
            minWidth: "300px",
          }}
        >
         <Paper style={{ padding: "12px", height: "100%", overflowY: "auto" }}>
            {articleFeed.length > 0 ? (
              articleFeed.map((item, index) => (
                <List component="nav" aria-label="main mailbox folders">
                  <ListItemButton key={index} onClick={() => setSelectedArticle(item)}>
                    <ListItemText primary={item.title} secondary={item.source} />
                  </ListItemButton>
                </List>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography variant="body1">No articles available</Typography>
              </div>
            )}
          </Paper>
        </Box>

        {/* Right Content */}
        <Box
          sx={{
            flex: "1",
            padding: "8px",
            minWidth: "400px",
          }}
        >
         {selectedArticle && (
            <Paper style={{ padding: "12px", height: "100%", overflowY: "auto" }}>
              <Box>
                <Stack spacing={2}>
                  <Box display="flex" alignItems="center">
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h4">{selectedArticle.title}</Typography>
                    </Box>
                    <Box marginRight={2}>
                      <Link
                        gap={1}
                        href={selectedArticle.url}
                        display="flex"
                        target="_blank"
                        underline="none"
                      >
                        Visit
                        <LaunchIcon />
                      </Link>
                    </Box>
                  </Box>
                  <Divider />
                  <Typography>Source : {selectedArticle.source}</Typography>
                  <Typography>Description : {selectedArticle.description}</Typography>
                  <Typography>author : {selectedArticle.author}</Typography>
                  <Typography>Content :</Typography>
                  <Typography>{selectedArticle.content}</Typography>

                  <iframe
                    id="inlineFrameExample"
                    title="Inline Frame Example"
                    style={{ flex: "1 1 auto", height: "calc(100vh - 92px)" }}
                    src={selectedArticle.url}
                  ></iframe>
                </Stack>
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Feed;
