'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Layout from '../../../components/layout/Layout';
import CheckoutForm from './components/CheckoutForm';
import OrderSummary from './components/OrderSummary';
import PaymentForm from './components/PaymentForm';
import OrderConfirmation from './components/OrderConfirmation';
import { selectCartItems, selectCartIsEmpty, selectCartTotalAmount } from '../../../redux/cartSlice';
import { selectIsAuthenticated } from '../../../redux/authSlice';
import { ROUTES } from '../../../constants/routes';
import './index.scss';

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState(null);
  
  const cartItems = useSelector(selectCartItems);
  const isEmpty = useSelector(selectCartIsEmpty);
  const totalAmount = useSelector(selectCartTotalAmount);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();

  // Redirect if cart is empty
  if (isEmpty) {
    router.push(ROUTES.CART);
    return null;
  }

  const steps = [
    { id: 1, title: 'Shipping Info', component: CheckoutForm },
    { id: 2, title: 'Payment', component: PaymentForm },
    { id: 3, title: 'Confirmation', component: OrderConfirmation }
  ];

  const handleStepComplete = (data) => {
    if (currentStep < steps.length) {
      setOrderData(prev => ({ ...prev, ...data }));
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <Layout>
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-header">
            <h1 className="checkout-title">Checkout</h1>
            
            {/* Progress Steps */}
            <div className="checkout-steps">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`step ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
                >
                  <div className="step-number">{step.id}</div>
                  <div className="step-title">{step.title}</div>
                  {index < steps.length - 1 && <div className="step-line"></div>}
                </div>
              ))}
            </div>
          </div>

          <div className="checkout-content">
            <div className="checkout-main">
              <CurrentStepComponent
                onComplete={handleStepComplete}
                onBack={handleStepBack}
                orderData={orderData}
                canGoBack={currentStep > 1}
              />
            </div>
            
            {currentStep < 3 && (
              <div className="checkout-sidebar">
                <OrderSummary />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;