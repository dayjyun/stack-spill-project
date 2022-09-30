import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./SearchBar.css";

function SearchBarComponent() {
  const dispatch = useDispatch();
  const allQuestions = Object.values(useSelector((state) => state.questions));
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");

  const questionResults = allQuestions.filter((question) => {
    return question?.title?.toLowerCase().includes(search.toLowerCase());
  });

  const questionReturns = questionResults.map((question) => {
    return (
      <Link
        to={`/questions/${question?.id}`}
        key={question?.id}
        onClick={() => setSearch("")}
        className="search-results-link"
      >
        <div className="search-results-text">
          <div className="search-results-body">{question?.title}</div>
        </div>
      </Link>
    );
  });

  return (
    <>
      <div className="search-bar-container">
        <form>
          <div className="search-bar">
            <input
              className="search-bar-input"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={() => setSearchResults("results-active")}
              onBlur={() => setSearchResults("")}
            />
          </div>
        </form>
        <div className={`search-results-box ${searchResults}`}>
          {questionReturns}
        </div>
      </div>
    </>
  );
}

export default SearchBarComponent;
