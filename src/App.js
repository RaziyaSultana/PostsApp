import logo from './logo.svg';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import './App.css';
import Tasks from "./Tasks";
import TodoInput from "./TodoInput";

const HASURA_SECRET = "e1P8158TlFopMDAUddCkP6pAf8G7M04IusxIEojFu2ITADIpAnkuTKB5XmVHIMWQ"
// process.env.HASURA_SECRET;

const client = new ApolloClient({
  uri: `https://assured-catfish-84.hasura.app/v1/graphql`,
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': HASURA_SECRET
  }
  
  
});



function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>Posts </h1>
        </header>
        <br />
        <TodoInput />
        <Tasks />
      </div>
    </ApolloProvider>
  );
  
}

export default App;







//          <img src={logo} className="App-logo" alt="logo" />
