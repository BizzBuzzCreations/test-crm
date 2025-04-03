import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import CRMLayout from './components/CRMLayout';
import Dashboard from './pages/Dashboard'
import ShowLeads from './pages/ShowLeads'
import ShowUsers from './pages/ShowUsers'
import ShowCampaigns from './pages/ShowCampaigns';
import ShowTeams from './pages/ShowTeams';
import ShowUserTypes from './pages/ShowUserTypes';
import ShowStatus from './pages/ShowStatus';
import AddLead from './pages/AddLead';
import AddUser from './pages/AddUser';
import AddCampaign from './pages/AddCampaign';
import AddTeam from './pages/AddTeam';
import AddUserType from './pages/AddUserType';
import AddStatus from './pages/AddStatus';
import EditLead from './pages/EditLead';
import EditUser from './pages/EditUser';
import EditCampaign from './pages/EditCampaign';
import EditTeam from './pages/EditTeam';
import EditUserType from './pages/EditUserType';
import EditStatus from './pages/EditStatus';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<CRMLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leads" element={<ShowLeads />} />
          <Route path="add-lead" element={<AddLead />} />
          <Route path="users" element={<ShowUsers />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="campaigns" element={<ShowCampaigns />} />
          <Route path="add-campaign" element={<AddCampaign />} />
          <Route path="teams" element={<ShowTeams />} />
          <Route path="add-team" element={<AddTeam />} />
          <Route path="user-types" element={ <ShowUserTypes /> } />
          <Route path="/edit-user-type/:id" element={ <EditUserType /> } />
          <Route path="add-user-type" element={<AddUserType />} />
          <Route path="status" element={<ShowStatus />} />
          <Route path="add-status" element={<AddStatus />} />
          <Route path="/edit-lead/:id" element={<EditLead />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/edit-campaign/:id" element={<EditCampaign />} />
          <Route path="/edit-team/:id" element={<EditTeam />} />
          <Route path="/edit-status/:id" element={<EditStatus />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
