import React, { useState, useEffect } from "react";
import TopicDrawer from "../components/Common/TopicDrawer";
import { v4 as uuidv4 } from "uuid";
import emptyTopic from "../Interfaces/EmptyTopic";
import Topic from "../Interfaces/Topic";
import ArticlesList from "../components/Score Web/ArticlesList";
import ScoringButton from "../components/Common/ScoringButton";
import TopicPreview from "../components/Common/TopicPreview";
import EditTopicButton from "../components/Common/EditTopicButton";
import NewTopicSelector from "../components/Common/NewTopicSelector";
import NewLabel from "../Interfaces/NewLabel";
import {
  NewArticleScoreResponse,
  ScoreArticlesResponse,
} from "../Lib/autorest-library-v1/src";
import ProjectApi from "../API/ProjectApi";

const SearchWeb: React.FC = () => {
  const accessToken = localStorage.getItem("accessToken");

  const [scoringLoader, setScoringloader] = useState<boolean>(false);
  const [topics, setTopic] = useState<Topic[]>([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const myAPI = new ProjectApi();
  const [selectedTopicToScore, setSelectedTopicToScore] =
    useState<Topic | null>(null);
  const [showRightDiv, setShowRightDiv] = useState(false);
  const [articlesAvailable, setArticlesAvailable] = useState(false);
  const [articleScores, setArticleScores] = useState<NewArticleScoreResponse[]>(
    []
  );

  useEffect(() => {
    if (articleScores.length > 0) {
      setShowRightDiv(true);
      setArticlesAvailable(true);
    }
  }, [articleScores]);
  const clearRightDiv = () => {
    setShowRightDiv(false);
    setArticleScores([]);
    setArticlesAvailable(false);
  };

  const handleSelectedTempToScore = (topic: Topic | null): void => {
    setSelectedTopicToScore(topic);
  };

  const handleEditTopicClick = (): void => {
    setDrawerOpen(true);
  };

  const buildLabelsFromTopic = (topic: Topic | null): NewLabel[] => {
    const allLabels: NewLabel[] = [];
    topic?.highLabels.forEach((item) => {
      allLabels.push({
        NewLabelId: uuidv4(),
        item: item,
        score: 0,
        priority: 3,
      });
    });

    topic?.midLabels.forEach((item) => {
      allLabels.push({
        NewLabelId: uuidv4(),

        item: item,

        score: 0,
        priority: 2,
      });
    });

    topic?.lowLabels.forEach((item) => {
      allLabels.push({
        NewLabelId: uuidv4(),

        item: item,
        score: 0,
        priority: 1,
      });
    });

    return allLabels;
  };

  const handleSearching = async (): Promise<void> => {
    if (selectedTopicToScore !== null && selectedTopicToScore?.id !== "") {
      setScoringloader(true);
      clearRightDiv();

      const response: ScoreArticlesResponse = await myAPI.scoreArticles({
        requestOptions: {
          customHeaders: { Authorization: `Bearer ${accessToken}` },
        },
        body: { topicId: selectedTopicToScore.id },
      });
      setArticleScores([]);

      setArticleScores(response.sort((a, b) => b.result - a.result));
      setScoringloader(false);
    } else {
    }
  };

  const handleAddTopic = async (topic: Topic) => {
    const labels = buildLabelsFromTopic(topic);

    try {
      await myAPI.addTopic({
        requestOptions: {
          customHeaders: { Authorization: `Bearer ${accessToken}` },
        },
        body: {
          topicName: topic.topicName,
          labels: labels,
        },
      });
      fetchTopics();
      clearRightDiv();
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

  const handleUpdatetopic = async (topic: Topic) => {
    const labelUpdated = buildLabelsFromTopic(topic);
    try {
      myAPI.updateTopic({
        requestOptions: {
          customHeaders: { Authorization: `Bearer ${accessToken}` },
        },
        body: {
          topicId: topic.id,
          topicName: topic.topicName,
          labels: labelUpdated,
        },
      });
      fetchTopics();
      setSelectedTopicToScore(null);
      clearRightDiv();
    } catch (error) {
      console.error("Error editing topic:", error);
    }
  };

  const handleDeleteTopic = async (topic: Topic) => {
    await myAPI.deleteTopic({
      requestOptions: {
        customHeaders: { Authorization: `Bearer ${accessToken}` },
      },

      id: topic.id,
    });
    fetchTopics();
    if (selectedTopicToScore?.id === topic.id) setSelectedTopicToScore(null);
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
        const topics: Topic[] = response.map((topicData: any) => ({
          id: topicData.id,
          topicName: topicData.topicName,
          highLabels: topicData.highLabels ?? [],
          midLabels: topicData.midLabels ?? [],
          lowLabels: topicData.lowLabels ?? [],
        }));
        setTopic(topics);
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
    } finally {
      return topics;
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);
  return (
    <div
      style={{
        padding: "25px",
        display: "flex",
        flexDirection: "row",
        gap: "15px",
        margin: "2rem",
        justifyContent: "center",
      }}
    >
      <div
        className="leftPanel"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",

          width: "30%",
          minWidth: "300px",
          maxWidth: "700px",
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
            <NewTopicSelector
              topics={topics}
              selectedTopicToScore={
                selectedTopicToScore ? selectedTopicToScore : emptyTopic
              }
              handleSelectedTempToScore={handleSelectedTempToScore}
              clearRightDiv={clearRightDiv}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <EditTopicButton onClick={handleEditTopicClick} />
          </div>
        </div>
        <TopicPreview selectedTopicToScore={selectedTopicToScore} />
        <ScoringButton
          Bfunction={handleSearching}
          scoringLoader={scoringLoader}
          text1={"Search"}
          text2={"Searching"}
        />
        <TopicDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          topics={topics}
          addTopic={handleAddTopic}
          deleteTopic={handleDeleteTopic}
          Updatetopic={handleUpdatetopic}
        />
      </div>

      <div
        className="righPanel"
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: showRightDiv ? "300px" : "0px",
          maxWidth: showRightDiv ? "1000px" : "0px",
          width: showRightDiv ? "100%" : "0px",
          transition:
            "max-width 0.05s ease-in-out, width 0.05s ease-in-out , width 0.05s ease-in-out",
        }}
      >
        {articlesAvailable && (
          <ArticlesList
            selectedTopicToScore={selectedTopicToScore}
            articleScores={articleScores}
          />
        )}
      </div>
    </div>
  );
};

export default SearchWeb;
