import React, { useState, useEffect } from "react";
import "./App.css";
import ChannelSettings from "./ChannelSettings";

import UUID from "node-uuid";
import { traverseFast } from "@babel/types";

const Channel = props => {
  const [articles, setArticles] = useState([]);
  const [parameters, setParameters] = useState([
    { title: "Terms: ", id: "terms", tags: [] },
    { title: "Included Domains: ", id: "included", tags: [] },
    { title: "Excluded Domains: ", id: "excluded", tags: [] }
  ]);
  const [terms, setTerms] = useState([]);
  const [includedSources, setIncludedSources] = useState([]);
  const [excludedSources, setExcludedSources] = useState([]);
  const [refreshState, setRefresh] = useState(false);

  let psl = require("psl");

  useEffect(() => {
    addSearchQueryToTerms();
    getNews();
    console.log("Get news");
    //setParameters([terms, includedSources, excludedSources]);
  }, [props.query]);

  //Source: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
  function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
      hostname = url.split("/")[2];
    } else {
      hostname = url.split("/")[0];
    }

    //find & remove port number
    hostname = hostname.split(":")[0];
    //find & remove "?"
    hostname = hostname.split("?")[0];

    return hostname;
  }

  const addSearchQueryToTerms = () => {
    if (props.query != "" && !terms.includes(props.query)) {
      addTag(props.query, "terms");
    }
  };

  function getParameter(id) {
    return parameters.filter(parameter => {
      return parameter.id === id;
    })[0];
  }

  const getNews = async () => {
    // return;
    if (getParameter("terms").tags.length == 0) {
      setArticles([]);
      return;
    }

    const terms_uri = getParameter("terms").tags.join(" ");
    const included_sources_uri = getParameter("included").tags.join(",");
    const excluded_sources_uri = getParameter("excluded").tags.join(",");

    var requestUrl = `https://newsapi.org/v2/everything?q=${terms_uri}&language=en&sortBy=publishedAt&apiKey=2a08aa9b8c5c4ca6939d78687a0e61e4`;

    if (included_sources_uri != "") {
      requestUrl += `&${included_sources_uri}`;
    }

    if (excluded_sources_uri != "") {
      requestUrl += `&${excluded_sources_uri}`;
    }

    const response = await fetch(requestUrl);
    const data = await response.json();

    setArticles(data.articles);
  };

  const loadArticle = article => {
    window.open(article.url);
  };

  const removeTag = (text, type) => {
    text = text.toLowerCase();
    const tags = getParameter(type).tags;

    // NOTE: Using filter didn't affect original array
    for (var i = 0; i < tags.length; i++) {
      if (tags[i] === text) {
        tags.splice(i, 1);
        break;
      }
    }

    setParameters(parameters);
  };

  const addTag = (text, type) => {
    console.log("ADD TAH");
    text = text.toLowerCase();
    const tags = getParameter(type).tags;
    tags.push(text);

    setParameters(parameters);
    setRefresh(!refreshState);
  };

  const changeParameter = (requestType, text, type) => {
    if (text.includes("http")) {
      text = psl.get(extractHostname(text));
    }

    if (requestType == "add") {
      addTag(text, type);
    }

    if (requestType == "remove") {
      removeTag(text, type);
    }

    console.log("Remove param");

    getNews();
  };

  return (
    <React.Fragment>
      <ChannelSettings
        parameters={parameters}
        changeParameter={changeParameter}
      />
      {getParameter("terms").tags.length > 0 ? (
        <div className="article-list">
          {articles.map(article => (
            <div className="article">
              <div className="content">
                <div>
                  <a onClick={() => loadArticle(article)}>
                    <p className="list-title">{article.title}</p>
                  </a>

                  <div className="description">
                    <p>{article.description}</p>
                  </div>
                </div>

                <div className="source">
                  <p className="source">{article.source.name}</p>
                  <i
                    onClick={() =>
                      changeParameter("add", article.url, "excluded")
                    }
                    className="fas fa-times"
                  ></i>
                </div>
              </div>

              <img src={article.urlToImage} />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default Channel;
