import React, { useState, useEffect } from "react";
import "./App.css";

const Article = props => {
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticle();
    console.log("Get news");
  }, [props.object]);

  const getArticle = async () => {
    // const requestUrl = `https://newsapi.org/v2/everything?q=${props.query}&from=2019-11-04&sortBy=publishedAt&apiKey=2a08aa9b8c5c4ca6939d78687a0e61e4`;
    // const response = await fetch(requestUrl);
    // const data = await response.json();
    // console.log(data.articles);
    // setArticles(data.articles);
    console.log(props.object);
  };

  return (
    <React.Fragment>
      <h1>{props.object.title}</h1>
      <img className="article-image" src={props.object.urlToImage} />
      <p>{props.object.content}</p>
    </React.Fragment>
  );
};

export default Article;
