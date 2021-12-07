import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import MyGarden from './pages/MyGarden';
import Home from './pages/Home';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Team from './pages/Team';
import Forum from './pages/Forum';
import PlantCare from './pages/PlantCare'

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
         <Navbar/>
     <div className="content-container">
         <Route exact path="/"><Home/></Route>
         <Route exact path="/contact"><Contact/></Route>
         <Route exact path="/about"><About/></Route>
         <Route exact path="/testimonials"><Testimonials/></Route>
         <Route exact path="/mygarden"><MyGarden/></Route>
         {/*future development pages*/}
         <Route exact path="/PlantCare"><PlantCare/></Route>
         {/*<Route exact path="/shop"><Shop/></Route>*/}
         <Route exact path="/forum"><Forum/></Route>
         <Route exact path="/team"><Team/></Route>
     </div>
        <Footer/>
     </Router>
   </ApolloProvider>
  );
}

export default App;
