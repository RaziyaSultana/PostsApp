import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GetTodos {
    posts {
      id
      task
      completed
    }
  }
`;

export const ADD_TODO = gql`
  mutation($task: String!) {
    insert_posts_one(object: { task: $task }) {
      id
      task
      completed
    }
  }
`;


export const TOGGLE_COMPLETED = gql`
  mutation($id: Int!, $completed: Boolean!) {
    update_posts_by_pk(
      pk_columns: { id: $id }
      _set: { completed: $completed }
    ) {
      id
    }
  }
`;

export const REMOVE_TODO = gql`
  mutation($id: Int!) {
    delete_posts_by_pk(id: $id) {
      id
    }
  }
`;