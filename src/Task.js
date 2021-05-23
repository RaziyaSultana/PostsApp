import React from "react";
import { useMutation } from "@apollo/client";

//import { GET_TODOS, REMOVE_TODO } from "./graphql/queries";
import "./Task.css";
import { GET_TODOS, TOGGLE_COMPLETED, REMOVE_TODO } from "./graphql/queries";
//const [removeTodoMutation] = useMutation(REMOVE_TODO);


const Task = ({ post }) => {
  const [removeTodoMutation] = useMutation(REMOVE_TODO);

  const [toggleCompeletedMutation] = useMutation(TOGGLE_COMPLETED);
  //const toggleCompleted = ({ id, completed }) => {};

  const toggleCompleted = ({ id, completed }) => {
    toggleCompeletedMutation({
      variables: { id, completed: !completed },
      optimisticResponse: true,
      update: (cache) => {
        const existingTodos = cache.readQuery({ query: GET_TODOS });
        const updatedTodo = existingTodos.posts.map((post) => {
          if (post.id === id) {
            return { ...post, completed: !completed };
          } else {
            return post;
          }
        });
        cache.writeQuery({
          query: GET_TODOS,
          data: { post: updatedTodo },
        });
      },
    });
  };

  const removeTodo = (id) => {
    removeTodoMutation({
      variables: { id },
      optimisticResponse: true,
      update: (cache) => {
        const existingTodos = cache.readQuery({ query: GET_TODOS });
        const posts = existingTodos.posts.filter((t) => t.id !== id);
        cache.writeQuery({
          query: GET_TODOS,
          data: { posts },
        });
      },
    });
  };

  return (
    <div key={post.id} className="task">
       
      <span className={post.completed ? "completed" : ""}>{post.task}</span>
      <button type="submit" onClick={() => removeTodo(post.id)}>
        remove
      </button>
    </div>
  );
};

export default Task;


/*
<input
        type="checkbox"
        checked={post.completed}
        onChange={() => toggleCompleted(post)}
      /> 
*/