import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Auth from '../components/Auth'

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/user/register" element={<h1>User Register Page</h1>} />
                <Route path="/user/login" element={<h1>User Login Page</h1>} />
                <Route path="/food-partner/register" element={<h1>Food Partner Register Page</h1>} />
                <Route path="/food-partner/login" element={<h1>Food prtner Login Page</h1>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes