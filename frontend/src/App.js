import './App.css';
import React from 'react'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Layout from  './components/Layout/Layout'
import Header from './components/Layout/Header/Header'
import Nav from './components/Nav/Nav';
import Footer from './components/Layout/Footer/Footer'


function App() {
  const header = (<Header/>);
  const nav = (<Nav/>);
  const footer = (<Footer/>);
  return (
    <Router>
        <Layout
          header={header}
          nav={nav}
          footer={footer}
        />
    </Router>
  );
}

export default App;
