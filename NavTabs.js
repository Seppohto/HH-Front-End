import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Home from './Home'
import NotFound from './NotFound'
import TodolistApp from './todolistapp';


export default function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
    <BrowserRouter>
        <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
            <Tab label="Home" component={Link} to="/" />
            <Tab label="My Todos" component={Link} to="/components/todolistapp" />
        </Tabs>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/components/todolistapp" element={<TodolistApp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
    </Box>
  );
}