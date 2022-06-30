import './App.css';
import React from 'react'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Layout from  './components/Layout/Layout'
import Header from './components/Layout/Header/Header'
import Nav from './components/Nav/Nav';
import Footer from './components/Layout/Footer/Footer'
import Menu from './components/Menu/Menu';

function App() {
  const header = (<Header/>);
  const nav = (<Nav/>);
  const menu = (
    <Routes>
      <Route path='/' element={<Menu/>}/>
      <Route path='/news' element={<div>News</div>}/>
    </Routes>
  )
  const footer = (<Footer/>);
  return (
    <Router>
        <Layout
          header={header}
          nav={nav}
          menu={menu}
          footer={footer}
        />
    </Router>
  );
}

export default App;
