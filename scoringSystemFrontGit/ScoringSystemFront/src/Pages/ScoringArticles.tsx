import React, { useState, useEffect } from "react";

import ChartTabs from "../components/Score Article/ChartTabs";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { v4 as uuidv4 } from "uuid";
import ChartData from "../Interfaces/ChartData";
import Topic from "../Interfaces/Topic";
import emptyTopic from "../Interfaces/EmptyTopic";
import Label from "../Interfaces/Label";
import Score from "../Interfaces/Score";
import TopicSelector from "../components/Common/TopicSelector";
import EditTopicButton from "../components/Common/EditTopicButton";
import TopicPreview from "../components/Common/TopicPreview";
import ArticleField from "../components/Score Article/ArticleField";
import TopicDrawer from "../components/Common/TopicDrawer";
import ScoringButton from "../components/Common/ScoringButton";
import ProjectApi from '../API/ProjectApi';

const ScoringArticles: React.FC = () => {
  const [scoringLoader] = useState<boolean>(false);
  const [article, setArticle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [dataAvailable, setChartDataAvailable] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTempToScore, setSelectedTempToScore] = useState<Topic | null>(
    null
  );
  const accessToken = localStorage.getItem("accessToken");

  const myAPI = new ProjectApi();
  useEffect(() => {
    const localTopics = getTopicsFromLocal();
    setTopics(localTopics);
  }, []);

  const handleSelectedTempToScore = (topic: Topic | null): void => {
    setSelectedTempToScore(topic);
  };

  const handleEditItemClick = (): void => {
    setDrawerOpen(true);
  };

  const constructScoreObject = (data: any): Score => {
    const labels: Label[] = data.labels;
    const highLabels: string[] = [];
    const midLabels: string[] = [];
    const lowLabels: string[] = [];
    const highScore: number[] = [];
    const midScore: number[] = [];
    const lowScore: number[] = [];

    labels.forEach((label: Label) => {
      switch (label.priority) {
        case 3:
          highLabels.push(label.item);
          highScore.push(label.score);
          break;
        case 2:
          midLabels.push(label.item);
          midScore.push(label.score);
          break;
        case 1:
          lowLabels.push(label.item);
          lowScore.push(label.score);
          break;
        default:
          break;
      }
    });

    return {
      id: data.id,
      highLabels: highLabels,
      midLabels: midLabels,
      lowLabels: lowLabels,
      highScore: highScore,
      midScore: midScore,
      lowScore: lowScore,
      finalScore: data.finalScore,
    };
  };

  const mapDataToChartData = (score: Score): void => {
    const newchart: ChartData[] = [];
    for (let i = 0; i < score.highLabels.length; i++) {
      newchart.push({
        value: score.highScore[i],
        label: score.highLabels[i],
      });
    }
    for (let i = 0; i < score.midLabels.length; i++) {
      newchart.push({
        value: score.midScore[i],
        label: score.midLabels[i],
      });
    }
    for (let i = 0; i < score.lowLabels.length; i++) {
      newchart.push({
        value: score.lowScore[i],
        label: score.lowLabels[i],
      });
    }
    setChartData(newchart);
  };

  const addArticle = async (): Promise<string | undefined> => {
    const labels = buildLabelsFromTopic(selectedTempToScore);
    try {
      const response = await myAPI.addArticle({
        requestOptions: {
          customHeaders: { Authorization: `Bearer ${accessToken}` },
        },
        body: { articleTexte: article, labels: labels },
      });
      return response.articleId;
    } catch (error) {
      console.error("Error adding sequence:", error);
    }
  };

  const handleArticleChange = (text: string): void => {
    setArticle(text);
  };

  const buildLabelsFromTopic = (topic: Topic | null): Label[] => {
    const allLabels: Label[] = [];
    topic?.highLabels.forEach((item) => {
      allLabels.push({
        item: item,
        score: 0,
        priority: 3,
      });
    });

    topic?.midLabels.forEach((item) => {
      allLabels.push({
        item: item,
        score: 0,
        priority: 2,
      });
    });

    topic?.lowLabels.forEach((item) => {
      allLabels.push({
        item: item,
        score: 0,
        priority: 1,
      });
    });

    return allLabels;
  };

  const saveTopicsToLocal = (topics: any[]) => {
    const topicsWithIds = topics.map((topic) => ({
      ...topic,
    }));
    localStorage.setItem("topics", JSON.stringify(topicsWithIds));
  };
  const getTopicsFromLocal = () => {
    const storedTopics = localStorage.getItem("topics");
    return storedTopics ? JSON.parse(storedTopics) : [];
  };

  const addTopicLocally = (newTopic: Topic) => {
    const topicWithId = { ...newTopic, id: uuidv4() };
    const updatedTopics = [...topics, topicWithId];
    setTopics(updatedTopics);
    saveTopicsToLocal(updatedTopics);
  };

  const deleteTopicLocally = (topicToDelete: Topic) => {
    const updatedTopics = topics.filter(
      (topic) => topic.id !== topicToDelete.id
    );
    setTopics(updatedTopics);
    saveTopicsToLocal(updatedTopics);
  };
  const updateTopicLocally = (topic: Topic) => {
    const topicIndex = topics.findIndex((topic) => topic.id === topic.id);

    if (topicIndex !== -1) {
      const updatedTopics = [...topics];

      updatedTopics[topicIndex] = topic;
      setTopics(updatedTopics);
      saveTopicsToLocal(updatedTopics);
    } else {
      console.error("Topic not found");
    }
  };

  const score = async (): Promise<void> => {
    setChartDataAvailable(false);
    const articleId = await addArticle();
    try {
      const data = await myAPI.getArticleById({
        requestOptions: {
          customHeaders: { Authorization: `Bearer ${accessToken}` },
        },
        body: { articleId },
      });
    } catch (error) {
      console.error("Error scoring:", error);
    }
    const data = await myAPI.getArticleById({ body: { articleId } });

    const score: Score = constructScoreObject(data);
    setChartData([]);
    mapDataToChartData(score);
    setChartDataAvailable(true);
    setLoading(false);
  };

  return (
    <div
      style={{
        padding: "25px",
        display: "flex",
        flexDirection: "row",
        gap: "15px",
        margin: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "40%",
          minWidth: "300px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ alignItems: "flex-start", flexGrow: 1 }}>
            <TopicSelector
              topics={topics}
              selectedTempToScore={
                selectedTempToScore ? selectedTempToScore : emptyTopic
              }
              handleSelectedTempToScore={handleSelectedTempToScore}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <EditTopicButton onClick={handleEditItemClick} />
          </div>
        </div>
        <TopicPreview selectedTopicToScore={selectedTempToScore} />
        <ArticleField article={article} onArticleChange={handleArticleChange} />

        {loading && (
          <Box sx={{ width: "99%", alignSelf: "center" }}>
            <LinearProgress />
          </Box>
        )}

        <ScoringButton
          Bfunction={score}
          scoringLoader={scoringLoader}
          text1={"Score"}
          text2={"Scoring"}
        />

        <TopicDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          topics={topics}
          Updatetopic={updateTopicLocally}
          addTopic={addTopicLocally}
          deleteTopic={deleteTopicLocally}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          minWidth: "300px",
        }}
      >
        {dataAvailable && <ChartTabs data={chartData} />}
      </div>
    </div>
  );
};

export default ScoringArticles;
