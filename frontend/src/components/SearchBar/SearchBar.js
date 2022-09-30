import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllQuestions } from "../../store/questionsReducer";
import "./SearchBar.css";

function SearchBarComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allQuestions = Object.values(useSelector((state) => state.questions));
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");

  useEffect(() => {
    dispatch(getAllQuestions());
  }, [dispatch]);

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
      <NavLink
        to={`/questions/${question?.id}`}
        key={question?.id}
        // onClick={handleSearchLink}
        id='search-results-link'
      >
        <div id="search-results-text">
          <div>{question?.title}</div>
        </div>
      </NavLink>
    );
  });

  return (
    <>
      <div id="search-bar-container">
        <form>
          <div id="search-bar">
            <input
              id="search-bar-input"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={() => setSearchResults("results-active")}
              onBlur={() => setSearchResults("")}
            />
          </div>
        </form>
        <div id={`search-results-box ${searchResults}`}>{questionReturns}</div>
      </div>
    </>
  );
}

export default SearchBarComponent;
