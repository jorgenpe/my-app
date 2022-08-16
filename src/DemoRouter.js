import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home';
import Person from './Components/Person';
import About from './Components/About';
import CrudDemo from './CrudDemo';
import NotFound from './Components/NotFound';
import Header from './Components/Header';
import Welcome from './Components/Welcome';
import './App.css'

export default function DemoRouter() {
console.log("hej 2")
return (
    
    <Router>
        <div className="DemoRouter">
        
           <Header /> 
           <Routes>
           <Route extract path="/" element= {<Header />} />
                <Route path="/home" element={<Home />} />
                <Route path="/person" element={<Person />} />
                <Route path="/about" element={<About />} />
                <Route path="/crud" element={<CrudDemo />} />
                <Route element={<NotFound />} />
        </Routes>
    

        </div>
    </Router>
)

}

/*   
    <Router >
        <Header />
        <Routes>
            <Route extract path="/" component= {Home} />
            <Route path="/home" component={Home} />
            <Route path="/person" component={Person} />
            <Route path="/about" component={About} />
            <Route path="/crud" component={CrudDemo} />
            <Route component={NotFound} />
        </Routes>
    </Router>
    import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
    



     <Router >
        
            <Routes>
                <Route extract path="/" element= {<Header />} />
                <Route path="/home" element={<Home />} />
                <Route path="/person" element={<Person />} />
                <Route path="/about" element={<About />} />
                <Route path="/crud" element={<CrudDemo />} />
                <Route element={<NotFound />} />
            </Routes>
       
    </Router>
    */ 
