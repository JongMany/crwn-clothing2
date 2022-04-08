import { useState } from "react";
import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { BUTTON_TYPES_CLASSES } from "../button/button.component";
import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

import { selectCartTotalPrice } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/use.selector";

const PaymentForm = () => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const totalPrice = useSelector(selectCartTotalPrice);
  const currentUser = useSelector(selectCurrentUser);

  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    //Serverless 함수를 동작시키기 위해, netlfiy end point의 함수에 fetching한다. (serverless 함수 = API의 end point)
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: totalPrice * 100 }),
    }).then((res) => res.json());

    //실제 payment와 관련된 값
    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });
    console.log(response);

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <PaymentButton
          buttonType={BUTTON_TYPES_CLASSES.inverted}
          isLoading={isProcessingPayment}
        >
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
