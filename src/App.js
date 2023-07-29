import React from 'react'; 
import logo from './logo.svg';
import './App.css';
import {useCookies} from 'react-cookie';

import Header from './Header'
import Content from './Content'
import OptionProvider from './OptionContext'
import GithubTokenPopup from './GithubTokenPopup';

export default function App() {  
  return (        
    <div className="App">  
      <OptionProvider>
        <Header />
        <Content />
      </OptionProvider>   
    </div>
    
  );
}