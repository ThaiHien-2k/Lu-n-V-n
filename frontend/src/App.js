import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {
  AdminsPage,
  Dashboard,
  LoginPage,
 
  StaffsPage,
  InforsPage,
  CashFlowsPage,
  PrivateRoute,
  BloodStoragesPage,
  InforDetaislPage,
   StaffDetaislPage,
  DonateDetaislPage,
  BloodDonatesPage,
  DonatePage,
} from './pages';



function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/'>
          <Dashboard />
        </PrivateRoute>


        <PrivateRoute exact path='/cashFlows'>
          <CashFlowsPage />
          </PrivateRoute>

          <PrivateRoute exact path='/bloodDonates'>
          <BloodDonatesPage />
          </PrivateRoute>

          
          <PrivateRoute exact path='/bloodStorages'>
          <BloodStoragesPage />
          </PrivateRoute>

          <PrivateRoute exact path='/donates'>
          <DonatePage />
          </PrivateRoute>

          <PrivateRoute exact path='/infors'>
          <InforsPage />
          </PrivateRoute>

          <PrivateRoute exact path='/staffs'>
          <StaffsPage />
          </PrivateRoute>

         
          <PrivateRoute exact path='/infors/:id'>
          <InforDetaislPage />
        </PrivateRoute>
        <PrivateRoute exact path='/staffs/:id'>
          <StaffDetaislPage />
        </PrivateRoute>

        <PrivateRoute exact path='/donates/:id'>
          <DonateDetaislPage />
        </PrivateRoute>
        
      
        <PrivateRoute exact path='/accounts'>
          <AdminsPage />
        </PrivateRoute>
        <PrivateRoute exact path='/login'>
          <LoginPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
