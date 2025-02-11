import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentFlow from "./PaymentFlow";

// Helper functions to generate time slots from a range string
function formatTime(hour, minute) {
  const period = hour >= 12 ? "PM" : "AM";
  const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${adjustedHour}:${minute.toString().padStart(2, "0")} ${period}`;
}

function generateTimeSlots(rangeStr) {
  const [startStr, endStr] = rangeStr.split(" - ");
  const [startHour] = startStr.split(":").map(Number);
  const [endHour] = endStr.split(":").map(Number);
  let slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(formatTime(hour, 0));
  }
  return slots;
}

// Add the generateMeetingId function
const generateMeetingId = () => {
  return Math.random().toString(36).substring(2, 12);
};

// Add function to generate Jitsi meeting URL
const generateJitsiMeetingUrl = (meetingId) => {
  return `https://meet.jit.si/${meetingId}`;
};

// Add function to simulate email sending
const sendEmailNotification = (email, meetingDetails) => {
  console.log(`Email sent to ${email} with meeting details:`, meetingDetails);
  // In a real application, this would make an API call to your email service
};

function TherapistBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const therapist = location.state?.therapist;

  const [selectedDay, setSelectedDay] = useState(
    Object.keys(therapist?.availability || {})[0] || ""
  );
  const [timeSlot, setTimeSlot] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  if (!therapist) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              No therapist selected. Please return to the search page.
            </h2>
            <button
              onClick={() => navigate("/search-booking")}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Back to Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Generate available time slots based on selected day
  const availableTimeSlots = selectedDay
    ? generateTimeSlots(therapist.availability[selectedDay])
    : [];

  const handleBooking = (e) => {
    e.preventDefault();
    if (timeSlot && selectedDay) {
      setShowPayment(true);
    }
  };

  const handlePaymentComplete = (details) => {
    const meetingId = generateMeetingId();
    const jitsiUrl = generateJitsiMeetingUrl(meetingId);
    const userEmail = localStorage.getItem("userEmail");

    // Prepare meeting details
    const meetingDetails = {
      therapistName: therapist.name,
      date: selectedDay,
      time: timeSlot,
      meetingId,
      meetingUrl: jitsiUrl,
    };

    // Send email notification
    sendEmailNotification(userEmail, meetingDetails);

    setTransactionDetails({
      ...details,
      meetingId,
      meetingUrl: jitsiUrl,
    });
    setBookingConfirmed(true);
    setShowPayment(false);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/search-booking")}
          className="mb-8 flex items-center text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Search
        </button>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900">
              Book an Appointment with {therapist.name}
            </h2>
            <p className="mt-2 text-gray-600">
              Specialties: {therapist.specialties.join(", ")}
            </p>
          </div>

          {!showPayment && !bookingConfirmed && (
            <div className="p-6">
              <form onSubmit={handleBooking} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium text-sm mb-2">
                    Select Day:
                  </label>
                  <select
                    value={selectedDay}
                    onChange={(e) => {
                      setSelectedDay(e.target.value);
                      setTimeSlot("");
                    }}
                    className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                  >
                    {Object.keys(therapist.availability).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium text-sm mb-2">
                    Select Time:
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">--Select a Time Slot--</option>
                    {availableTimeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white rounded-md py-3 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Proceed to Payment
                </button>
              </form>
            </div>
          )}

          {showPayment && (
            <div className="p-6">
              <PaymentFlow
                onPaymentComplete={handlePaymentComplete}
                onCancel={handlePaymentCancel}
              />
            </div>
          )}

          {bookingConfirmed && (
            <div className="mt-12 transform transition-all duration-500">
              <div className="bg-white shadow-xl rounded-lg p-8 text-center border border-gray-100">
                <div className="mb-4">
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  Booking Confirmed!
                </h3>
                <div className="text-gray-600 space-y-2">
                  <p>
                    Your appointment with {therapist.name} is confirmed for{" "}
                    {selectedDay} at {timeSlot}.
                  </p>
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Payment Details
                    </h4>
                    <p>Transaction ID: {transactionDetails.transactionId}</p>
                    <p>Amount Paid: ${transactionDetails.amount}.00</p>
                    <p>
                      Card: {transactionDetails.paymentMethod.toUpperCase()}{" "}
                      ending in {transactionDetails.last4}
                    </p>
                  </div>
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Video Session Details
                    </h4>
                    <div className="space-y-2">
                      <p>Meeting ID: {transactionDetails.meetingId}</p>
                      <div className="bg-blue-50 p-4 rounded-lg mt-2">
                        <p className="text-blue-800">
                          We&apos;ve sent the meeting link to your email. You
                          can join the session by:
                        </p>
                        <ul className="text-sm text-blue-700 mt-2 space-y-1">
                          <li>1. Clicking the link in your email</li>
                          <li>
                            2. Using the button below at the scheduled time
                          </li>
                        </ul>
                      </div>
                      <a
                        href={transactionDetails.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-2 mt-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                      >
                        Join Meeting
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/search-booking")}
                  className="mt-6 px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Book Another Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TherapistBooking;
