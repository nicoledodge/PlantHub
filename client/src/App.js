import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';

import './App.css';
//import react router dom
//import graphql apollo (2 imports)
//import components
//import pages

// const auth link for auth token

// apollo client with auth link

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
    uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
  return (
   <ApolloProvider client={client}>
     <Router>
     <Navbar />
       <Switch>

       {/*  route exact path "/" */}
         {/*  route exact path "/saved" */}
         {/*  route render 404 page, *** create 404 component *** */}
       </Switch>
     </Router>
   </ApolloProvider>
  );
}

export default App;
