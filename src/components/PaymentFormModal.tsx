import React from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripeElementsOptions } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Button from "./Button";
import { formatCurrency } from "@/utils/formatters";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PaymentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientSecret: string;
  onPaymentSuccess: () => void;
  amount: number;
  description: string;
}

const PaymentForm: React.FC<{
  onClose: () => void;
  onPaymentSuccess: () => void;
  amount: number;
  description: string;
}> = ({ onClose, onPaymentSuccess, amount, description }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/my-bills`,
        payment_method_data: {
          billing_details: {
            name: "",
            email: "",
            address: {
              line1: "",
              city: "",
              state: "",
              postal_code: "",
              country: "US",
            },
          },
        },
      },
    });

    if (error) {
      setError(error.message || "An error occurred");
      setIsProcessing(false);
    } else {
      onPaymentSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Payment Details
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-1">{description}</p>
        <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {formatCurrency(amount)}
        </p>
      </div>

      <PaymentElement />

      {error && (
        <div className="text-red-600 dark:text-red-400 text-sm mt-2">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-3 mt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={!stripe || isProcessing}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </div>
    </form>
  );
};

export const PaymentFormModal: React.FC<PaymentFormModalProps> = ({
  isOpen,
  onClose,
  clientSecret,
  onPaymentSuccess,
  amount,
  description,
}) => {
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
    },
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-md w-full">
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm
            onClose={onClose}
            onPaymentSuccess={onPaymentSuccess}
            amount={amount}
            description={description}
          />
        </Elements>
      </div>
    </div>
  );
};
