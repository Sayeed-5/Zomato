import React,{useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Auth from '../components/Auth'
import Home from '../components/Home'
import CreateFood from '../components/CreateFood'
import FoodPartnerProfile from '../components/FoodPartnerProfile'
import UserLogin from '../components/UserLogin'
import UserRegister from '../components/UserRegister'
import PartnerLogin from '../components/PartnerLogin'
import PartnerRegister from '../components/PartnerRegister'

function AppRoutes() {
    // const [view, setView] = useState('userLogin');
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/create-food" element={<CreateFood/>}/>
                <Route path="/food/partner-profile" element={<FoodPartnerProfile/>}/>
                {/* <Route path="/user/register" element={<UserRegister setView={setView}/> }/>
                <Route path="/user/login" element={<UserLogin setView={setView} />} />
                <Route path="/food-partner/register" element={<PartnerRegister setView={setView} />} />
                <Route path="/food-partner/login" element={<PartnerLogin setView={setView} />} /> */}
            </Routes>
        </Router>
    )
}

export default AppRoutes