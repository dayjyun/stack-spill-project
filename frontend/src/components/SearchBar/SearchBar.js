import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllQuestions } from "../../store/questionsReducer";
import "./SearchBar.css";

function SearchBarComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allQuestions = Object.values(useSelector((state) => state.questions));
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");

//   useEffect(() => {
//     dispatch(getAllQuestions());
//   }, [dispatch]);

  const questionResults = allQuestions.filter((question) => {
    return question?.title?.toLowerCase().includes(search.toLowerCase());
  });

//   let handleSearchLink;

//   allQuestions.map((question) => {
//     handleSearchLink = () => {
//       setSearch("");
//       history.push(`/questions/${question?.id}`);
//     };
//   });

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
