import { useState } from "react";

const MOCK_CONSULTATION_FEE = 150;

function PaymentFlow({ onPaymentComplete, onCancel }) {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsProcessing(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      // Simple validation
      if (cardNumber.length !== 16) {
        throw new Error("Invalid card number");
      }
      if (cvv.length !== 3) {
        throw new Error("Invalid CVV");
      }

      // Generate mock transaction details
      const transactionDetails = {
        transactionId: Math.random().toString(36).substr(2, 9),
        amount: MOCK_CONSULTATION_FEE,
        currency: "USD",
        status: "success",
        timestamp: new Date().toISOString(),
        paymentMethod: paymentMethod,
        last4: cardNumber.slice(-4),
      };

      onPaymentComplete(transactionDetails);
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Payment Details
        </h3>
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <span>Consultation Fee:</span>
          <span className="font-semibold">${MOCK_CONSULTATION_FEE}.00</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Card Number
          </label>
          <input
            type="text"
            maxLength="16"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
            placeholder="1234 5678 9012 3456"
            className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              maxLength="5"
              value={expiryDate}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length > 2) {
                  value = value.slice(0, 2) + "/" + value.slice(2);
                }
                setExpiryDate(value);
              }}
              placeholder="MM/YY"
              className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              CVV
            </label>
            <input
              type="text"
              maxLength="3"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              placeholder="123"
              className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isProcessing}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              `Pay $${MOCK_CONSULTATION_FEE}.00`
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentFlow;
