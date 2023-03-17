import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './config/ThemeConfig';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from './context/user_context';

import { CashFlowProvider } from './context/cashFlow_context';
import { BloodStorageProvider } from './context/bloodStorage_context';
import { StaffProvider } from './context/staff_context';
import { InforProvider } from './context/infor_context';
import { BloodDonateProvider } from './context/bloodDonate_context';
import { AdminProvider } from './context/admin_context';

ReactDOM.render(
  <UserProvider>
    <AdminProvider>
     
        <CashFlowProvider>
        <BloodDonateProvider>
        <StaffProvider>
        <InforProvider>
        <BloodStorageProvider>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
          </BloodStorageProvider>
          </InforProvider>
          </StaffProvider>
         
          </BloodDonateProvider>
          </CashFlowProvider>
      
    </AdminProvider>
  </UserProvider>,
  document.getElementById('root')
);
