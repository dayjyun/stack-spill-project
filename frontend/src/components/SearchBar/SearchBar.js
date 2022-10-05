import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllQuestions } from "../../store/questionsReducer";
import { getAllUsers } from "../../store/usersReducer";
import "./SearchBar.css";

function QuestionsSearchBarComponent() {
  const dispatch = useDispatch();
  const allQuestions = Object.values(useSelector((state) => state.questions));
  const allUsers = Object.values(useSelector(state => state.users))
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");

  useEffect(() => {
    dispatch(getAllQuestions())
    dispatch(getAllUsers())
  }, [dispatch])

  let searchArray = []

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

  const userResults = allUsers.filter(user => {
    return user?.username?.toLowerCase().includes(search.toLowerCase())
  })

  const userReturns = userResults.map((user) => {
    return (
      <Link
        to={`/users/${user?.id}`}
        onClick={() => setSearch('')}
        className='search-results-link'
        key={user?.username}
      >
        <div className="search-results-text">
          <img
            src={user?.profileImage}
            className='search-bar-profile-pic'
          />
          <div className="search-bar-profile-username">{user?.username}</div>
        </div>
      </Link>
    )
  })

  searchArray = [...questionReturns, ...userReturns];

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
              onKeyDown={() => setSearchResults("results-active")}
              onBlur={() => setSearchResults("")}
            />
          </div>
        </form>
        <div className={`search-results-box ${searchResults}`}>
          {/* {questionReturns} */}
          {/* {userReturns} */}
          {searchArray}
        </div>
      </div>
    </>
  );
}

export default QuestionsSearchBarComponent;
