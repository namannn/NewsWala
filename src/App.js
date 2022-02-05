import './App.css';

import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize = 6;
  const apiKey = process.env.REACT_APP_NEWS_API

  const [searchTerm, setSearchTerm] = useState("");
  const [progress, setProgress] = useState(0);

  // setProgress = (progress) => {
  //   setState({progress: progress});
  // }

  const handleSearch = (searchTerm) => {
    console.log("search button clicked");
    console.log(searchTerm);
    setSearchTerm(searchTerm);
  }

  // render() is a lifecycle method.
  return <div>
    <Router>
      <Navbar handleSearch={handleSearch} />

      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <Routes>
        <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />} />
        <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" />} />
        <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
        <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />} />
        <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" />} />
        <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" />} />
        <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" />} />
        <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" />} />
        <Route path={`/search`} element={<News setProgress={setProgress} apiKey={apiKey} key={`search=${searchTerm}`} pageSize={pageSize} search={true} searchTerm={searchTerm} />} />
      </Routes>
    </Router>
  </div>;
}

export default App;
