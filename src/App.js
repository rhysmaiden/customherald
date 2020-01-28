import "./App.css";
import React, { useEffect, useState } from "react";
import Channel from "./Channel.js";
import Search from "./Search.js";
import Article from "./Article.js";
import NavBar from "./NavBar";
import ChannelNav from "./ChannelNav.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [query, setQuery] = useState("");
  const [article, setArticle] = useState({});

  const [isChannel, setIsChannel] = useState(true);
  const [isArticle, setIsArticle] = useState(false);

  const [channels, setChannels] = useState([]);

  const search = searchQuery => {
    setQuery(searchQuery);
  };

  const loadArticle = sentArticle => {
    setArticle(sentArticle);
    setIsChannel(false);
  };

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
      />
      <NavBar />
      <div className="container">
        {isChannel ? (
          <React.Fragment>
            <Search setQuery={search} />
            <Channel query={query} loadArticle={loadArticle} />
          </React.Fragment>
        ) : (
          <Article object={article} />
        )}
      </div>
    </React.Fragment>
  );
};

export default App;
