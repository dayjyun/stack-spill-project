import React, { useState, useEffect } from "react";
// import "./App.css";

const questions = [
  {
    id: 1,
    name: "a",
    title: 9,
    createdAt: 1999,
  },
  {
    id: 2,
    name: "b",
    title: 3,
    createdAt: 2004,
  },
  {
    id: 3,
    name: "c",
    title: 4,
    createdAt: 1987,
  },
];

function SortDelete() {
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("albums");

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        title: "title",
        createdAt: "createdAt",
      };
      const sortProperty = types[type];
      const sorted = [...questions].sort((a, b) => b[sortProperty] - a[sortProperty]);
      setData(sorted);
    };

    sortArray(sortType);
  }, [sortType]);

  return (
    <div className="App">
      <select onChange={(e) => setSortType(e.target.value)}>
        <option value="title">title</option>
        <option value="createdAt">createdAt</option>
      </select>

      {data.map((question) => (
        <div key={question.id} style={{ margin: "30px" }}>
          <div>{`question: ${question.name}`}</div>
          <div>{`title: ${question.title}`}</div>
          <div>{`Year of Release: ${question.createdAt}`}</div>
        </div>
      ))}
    </div>
  );
}

export default SortDelete;
