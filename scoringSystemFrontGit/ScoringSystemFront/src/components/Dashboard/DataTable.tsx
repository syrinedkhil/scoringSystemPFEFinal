import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import FeedBack from "../../Interfaces/FeedBack";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { IconButton, Link } from "@mui/material";
import CompanyList from "./companyList";
import { useEffect, useState } from "react";
import Topic from "../../Interfaces/Topic";
import { Delete } from "@mui/icons-material";
import ProjectApi from "../../API/ProjectApi";
import { FeedbackResponse } from "../../Lib/autorest-library-v1/src";

interface Props {}

const DataTable: React.FC<Props> = ({}) => {
  const accessToken = localStorage.getItem("accessToken");
  const [topics, setTopic] = useState<Topic[]>([]);
  const [feedbacklist, setFeedbacklList] = useState<FeedBack[]>([]);
  const myAPI = new ProjectApi();

  const handleDeleteFeedback = async (id: string) => {
    try {
      await myAPI.deleteFeedback({
        requestOptions: {
          customHeaders: { Authorization: `Bearer ${accessToken}` },
        },
        id,
      });
    } catch (error) {
      console.error("Error deleting  feedback:", error);
    }
    fetchFeedbacklist();
  };

  const getAllTopics = async (): Promise<Topic[] | undefined> => {
    try {
      const topics = await myAPI.getAllTopics({
        requestOptions: {
          customHeaders: { Authorization: `Bearer ${accessToken}` },
        },
      });
      const Newtopics: Topic[] = topics.map((topic: any) => {
        const highLabels: string[] = [];
        const midLabels: string[] = [];
        const lowLabels: string[] = [];
        for (const label of topic.labels) {
          switch (label.priority) {
            case 3:
              highLabels.push(label.item);

              break;
            case 2:
              midLabels.push(label.item);

              break;
            case 1:
              lowLabels.push(label.item);
              break;
            default:
              break;
          }
        }

        return {
          id: topic.topicId,
          topicName: topic.topicName,
          highLabels,
          midLabels,
          lowLabels,
        };
      });
      return Newtopics;
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };
  const fetchTopics = async () => {
    const response = await getAllTopics();
    
    try {
      if (response) {
        const topiiics: Topic[] = response.map((topicData: any) => ({
          id: topicData.id,
          topicName: topicData.topicName,
          highLabels: topicData.highLabels ?? [],
          midLabels: topicData.midLabels ?? [],
          lowLabels: topicData.lowLabels ?? [],
        }));
        setTopic(topiiics);
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
    } finally {
     
      return topics;
    }
  };
  const fetchFeedbacklist = async () => {
    const topics = await fetchTopics();
    
    try {
      const response = await myAPI.getAllFeedback({
        requestOptions: {
          customHeaders: { Authorization: `Bearer ${accessToken}` },
        },
      });
      const feedbacklist: FeedBack[] = response.map(
        (feedback: FeedbackResponse): FeedBack => {
          const topic = topics.find((topic) => topic.id === feedback.topicId);
         
        
          return {
            ...feedback,
            topic: topic,
          };
        }
      );
      setFeedbacklList(feedbacklist);
    
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  useEffect(() => {
    fetchTopics();
    fetchFeedbacklist();
  }, []);

  const rowsWithIndex = feedbacklist.map((feedback, index) => ({
    ...feedback,
    index: index + 1,
  }));

  const columns: GridColDef<(typeof rowsWithIndex)[number]>[] = [
    { field: "index", headerName: "Index", width: 60, resizable: false },
    {
      field: "topicName",
      headerName: "Topic Name",
      type: "string",
      flex: 1,
      valueGetter: (value, row) => `${row.topic?.topicName}`,
      /* valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`, */
    },
    {
      field: "articleUrl",
      headerName: "Article Source",
      width: 100,
      editable: false,
      renderCell: (params) => (
        <Link href={params.value} target="_blank">
          Visit source
        </Link>
      ),
    },
    {
      field: "finalScore",
      headerName: "Score (%)",
      type: "number",
      width: 90,
      resizable: false,
      editable: false,
    },
    {
      field: "rated",
      headerName: "Approval Status",
      type: "boolean",
      width: 150,
      resizable: false,
      editable: false,
      /* valueGetter: (value, row) => (row.rated ? "Positive" : "Negative"), */
      renderCell: (params) =>
        params.value ? <ThumbUpOffAltIcon /> : <ThumbDownOffAltIcon />,
    },
    {
      field: "articleSentiment",
      headerName: "Article Sentiment",
      type: "string",
      width: 130,
      resizable: false,
      editable: false,
    },
    {
      field: "relatedCompanies",
      headerName: "Companies",
      type: "string",
      width: 100,
      resizable: false,
      /* flex:100, */
      editable: false,
      renderCell: (params) => <CompanyList relatedCompanies={params.value} />,
    },
    {
      field: "reviewer",
      headerName: "Reviewer",
      type: "string",
      width: 150,
      editable: false,
    },
    {
      field: "createdOn",
      headerName: "Time",
      type: "string",
      width: 100,
      resizable: false,
      editable: false,
    },
    {
      field: "companyname",
      headerName: "",
      sortable: false,
      width: 60,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleDeleteFeedback(params.row.id)}
          color="error"
        >
          <Delete />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%" /* , padding:"10px"  */ }}>
      <DataGrid
        rows={rowsWithIndex}
        columns={columns}
        /* rowHeight={50} */
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
          columns: {
            columnVisibilityModel: {
              index: false,
            },
          },
        }}
        pageSizeOptions={[10, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        autosizeOptions={{
          columns: [
            "topicName",
            "articleUrl",
            "finalScore",
            "rated",
            "articleSentiment",
            "relatedCompanies",
            "reviewer",
            "createdOn",
          ],
          expand: true,
        }}
      />
    </Box>
  );
};
export default DataTable;
