import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_TODO, GET_TODOS } from "./graphql/queries";
import "./TodoInput.css";


const updateCache = (cache, { data }) => {
  const existingTodos = cache.readQuery({
    query: GET_TODOS,
  });

  const newTodo = data.insert_posts_one;
  cache.writeQuery({
    query: GET_TODOS,
    data: { posts: [...existingTodos.posts, newTodo] },
  });
};

export default () => {
  const [task, setTask] = useState("");
  const [addTodo] = useMutation(ADD_TODO, { update: updateCache });

  const submitTask = () => {
    addTodo({ variables: { task } });
    setTask("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add a new Post"
        className="taskInput"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") submitTask();
        }}
      />
      <button onClick={submitTask}>Create Post</button>
    </div>
  );
};