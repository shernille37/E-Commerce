import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import NotFound from './components/NotFound';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';

function App() {
  const [clientID, setClientID] = useState(null);

  useEffect(() => {
    const getClientId = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');

      setClientID(clientId);
    };
    getClientId();
  }, []);

  return (
    clientID && (
      <PayPalScriptProvider
        deferLoading={true}
        options={{
          'client-id': clientID,
          components: 'buttons',
          currency: 'EUR',
        }}
      >
        <Router>
          <Header />
          <main className='py-3'>
            <Container>
              <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path='/' element={<HomeScreen />} />
                <Route path='/product/:id' element={<ProductScreen />} />
                <Route path='/register' element={<RegisterScreen />} />
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/profile' element={<ProfileScreen />} />
                <Route path='/cart' element={<CartScreen />} />
                <Route path='/admin/userlist' element={<UserListScreen />} />
                <Route
                  path='/admin/userlist/:id/edit'
                  element={<UserEditScreen />}
                />
                <Route
                  path='/admin/productlist'
                  element={<ProductListScreen />}
                />

                <Route
                  path='/admin/productlist/:id/edit'
                  element={<ProductEditScreen />}
                />

                <Route path='/shipping' element={<ShippingScreen />} />
                <Route path='/payment' element={<PaymentScreen />} />
                <Route path='/placeorder' element={<PlaceOrderScreen />} />
                <Route path='/order/:id' element={<OrderScreen />} />
              </Routes>
            </Container>
          </main>
          <Footer />
        </Router>
      </PayPalScriptProvider>
    )
  );
}

export default App;
