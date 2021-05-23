import React from "react";
import { useQuery } from "@apollo/client";

import { GET_TODOS } from "./graphql/queries";
import Task from "./Task";
import "./Tasks.css";

const Tasks = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) {
    return <div className="tasks">Loading...</div>;
  }
  if (error) {
    return <div className="tasks">Error!</div>;
  }

  return (
    <div className="tasks">
      {data.posts.map((post) => (
        <Task key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Tasks;