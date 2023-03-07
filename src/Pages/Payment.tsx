import React from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from '../Components/Page/Payment';

function Payment() {
  const {
    state: { apiResult, userInput },
  } = useLocation();

  const stripePromise = loadStripe(
    'pk_test_51MhZrbLunxQjCbLSJ4fWmoD7UCoWvzO1hh5NsWbZYdapCR809D8bArdmnQMLk5NKbjjPOIfrriFObQLCU3QmDxmF00coOmUHka'
  );
  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiResult.clientSecret,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm />
    </Elements>
  );
}

export default Payment;
