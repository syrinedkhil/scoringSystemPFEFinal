import React, { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";

interface ArticleFieldProps {
  article: string;
  onArticleChange: (text: string) => void;
}

const ArticleField: React.FC<ArticleFieldProps> = ({ article, onArticleChange }) => {

  const handleArticleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onArticleChange(event.target.value);
  };

  return (
      <TextField
        id="outlined-multiline-flexible"
        placeholder="You can input your article here."
        multiline
        rows={20}
        value={article}
        style={{width:'100%'}}
        onChange={handleArticleChange}
      />
  );
};

export default ArticleField;