import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionActions from "@mui/material/AccordionActions";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import Link from "@mui/material/Link";
import ChartData from "../../Interfaces/ChartData";
import Divider from "@mui/joy/Divider";
import Topic from "../../Interfaces/Topic";
import HorizontalBarPlot from "./HorizontalBarPlot";
import * as autorest from "../../lib/autorest-library-v1/src";
import { useEffect, useState } from "react";
import CompanyCheckbox from "./CompanyCheckBox";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ProjectApi from "../../API/ProjectApi";
import {
  AddNewArticleResponse,
  NewArticleScoreResponse,
  CompanyResponse,
  FeedbackRequest,
} from "../../Lib/autorest-library-v1/src";
import { jwtDecode } from "jwt-decode";

interface ArticlesListProps {
  articleScores: NewArticleScoreResponse[];
  selectedTopicToScore: Topic | null;
}

const ArticlesList: React.FC<ArticlesListProps> = ({
  selectedTopicToScore,
  articleScores,
}) => {
  const myAPI = new ProjectApi();

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  function ArticleElement(articleScore: autorest.NewArticleScoreResponse) {
    const accessToken = localStorage.getItem("accessToken");
    const [isPositiveSelected, setIsPositiveSelected] = useState(false);
    const [isNegativeSelected, setIsNegativeSelected] = useState(false);
    const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
    const [userRole, setUserRole] = useState("");

    const [relatedCompanies, setRelatedCompanies] = useState<CompanyResponse[]>(
      []
    );
    useEffect(() => {
      checkUserRole();
    
    }, []);
    const checkUserRole = () => {
      if (accessToken) {
        const DecodeToken = jwtDecode(accessToken); 

        if (DecodeToken) {
          let clientRole = false;
          let reviewerRole = false;
          let adminRole = false;

          for (const key in DecodeToken) {
           
            if (key === "Client") {
              clientRole = true;
              break;
            } else if (key === "Admin") {
              adminRole = true;
              break;
            } else if (key === "Reviewer") {
              reviewerRole = true;
              break;
            }
          }

          if (clientRole) {
            setUserRole("client");
          } else if (adminRole) {
            setUserRole("Admin");
          } else setUserRole("Reviewer");
        }
      }
    };
    const handleSelectingCompanies = (company: CompanyResponse[]) => {
      setRelatedCompanies(company);
    };
    const handleRating = async (isPositive: boolean) => {
      setIsButtonsDisabled(true);
      if (isPositive) {
        setIsPositiveSelected(true);
      } else {
        setIsNegativeSelected(true);
      }
      if (selectedTopicToScore) {
        const article: AddNewArticleResponse = await myAPI.addNewArticle({
          requestOptions: {
            customHeaders: { Authorization: `Bearer ${accessToken}` },
          },
          body: {
            source: articleScore.source,
            author: articleScore.author,
            url: articleScore.url,
            title: articleScore.title,
            description: articleScore.description,
            content: articleScore.content,
          },
        });
       
        const feedBack: FeedbackRequest = {
          topicId: selectedTopicToScore.id,
          articleId: article.id,
          articleUrl: articleScore.url,
          highScore: articleScore.highScore,
          midScore: articleScore.midScore,
          lowScore: articleScore.lowScore,
          finalScore: articleScore.result,
          rated: isPositive,
          relatedCompanies: relatedCompanies.map((company) => company.id),
          articleSentiment: articleScore.articleSentiment,

          reviewer: "Syrine",
        };
        myAPI.addFeedback({
          requestOptions: {
            customHeaders: { Authorization: `Bearer ${accessToken}` },
          },
          body: feedBack,
        });
       
      }
    };

    const newchart: ChartData[] = [];
    if (selectedTopicToScore) {
      for (let i = 0; i < selectedTopicToScore.highLabels.length; i++) {
        newchart.push({
          value: articleScore.highScore[i],
          label: selectedTopicToScore.highLabels[i],
        });
      }
      for (let i = 0; i < selectedTopicToScore.midLabels.length; i++) {
        newchart.push({
          value: articleScore.midScore[i],
          label: selectedTopicToScore.midLabels[i],
        });
      }
      for (let i = 0; i < selectedTopicToScore.lowLabels.length; i++) {
        newchart.push({
          value: articleScore.lowScore[i],
          label: selectedTopicToScore.lowLabels[i],
        });
      }
    }
    const textColor = (sentiment: string) => {
      if (sentiment == "Positive") return { color: "Green" };
      if (sentiment == "Negative") return { color: "red" };
      if (sentiment == "Neutral") return { color: "Grey" };
    };
    return (
      <Accordion
        expanded={expanded === articleScore.title}
        onChange={handleChange(articleScore.title)}
        style={{ minWidth: "500px" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              {articleScore.title} - {articleScore.source}
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: "small" }}>
              {articleScore.description}
            </Typography>
          </div>
          <div
            className="Sentiment and Score"
            style={{ display: "flex", minWidth: "130px", marginLeft: "10px" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{ color: "text.secondary" }}
                style={textColor("Negative")}
              >
                {articleScore.articleSentiment} -
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  justifyContent: "flex-end",
                  alignSelf: "center",
                  marginLeft: "4px",
                }}
              >
                {articleScore.result.toFixed(2)}%
              </Typography>
            </div>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          
          <Typography>{articleScore.content}</Typography>
          <Typography sx={{ marginTop: "8px" }}>
            URL:{" "}
            <Link href={articleScore.url} target="_blank">
              {articleScore.url}
            </Link>
          </Typography>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "60%",
                height: "270",
                margin: "0 auto",
              }}
            >
              <HorizontalBarPlot data={newchart} />
            </div>
            <div
              style={{
                marginTop: "30px",
                justifyContent: "center",
                alignItems: "center",
                width: "40%",
              }}
            >
              <CompanyCheckbox
                companiesIds={articleScore.companiesIds}
                companiesScores={articleScore.companiesScores}
                relatedCompanies={relatedCompanies}
                handleSelectingCompanies={handleSelectingCompanies}
              />
            </div>
          </div>
        </AccordionDetails>

        <Divider />
        {userRole === "Reviewer" && (
          <>
            <AccordionActions>
              <div style={{ flexGrow: 1, width: "80%" }} />
              <ListItemButton
                onClick={() => handleRating(true)}
                disabled={isButtonsDisabled || isPositiveSelected}
              >
                <ListItemIcon>
                  {isPositiveSelected ? (
                    <ThumbUpIcon color="success" />
                  ) : (
                    <ThumbUpOffAltIcon />
                  )}
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton
                onClick={() => handleRating(false)}
                disabled={isButtonsDisabled || isNegativeSelected}
              >
                <ListItemIcon>
                  {isNegativeSelected ? (
                    <ThumbDownIcon color="error" />
                  ) : (
                    <ThumbDownOffAltIcon />
                  )}
                </ListItemIcon>
              </ListItemButton>
            </AccordionActions>
          </>
        )}
      </Accordion>
    );
  }

  return (
    <div>
      {articleScores.map((articleScore) => ArticleElement(articleScore))}
    </div>
  );
};

export default ArticlesList;
