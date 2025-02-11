import { useState } from "react";
import { useNavigate } from "react-router-dom";
import therapistData from "../database/therapist-profiles.json";

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

function ClientSearch() {
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState("");
  const [availability, setAvailability] = useState("");
  const [results, setResults] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Get unique specialties from all therapists
  const uniqueSpecialties = Array.from(
    new Set(therapistData.flatMap((therapist) => therapist.specialties))
  ).sort();

  // Get unique days from all therapists
  const uniqueDays = Array.from(
    new Set(
      therapistData.flatMap((therapist) => Object.keys(therapist.availability))
    )
  ).sort();

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = therapistData.filter((therapist) => {
      const matchSpecialty = specialty
        ? therapist.specialties.includes(specialty)
        : true;
      const matchAvailability = availability
        ? Object.keys(therapist.availability).includes(availability)
        : true;
      return matchSpecialty && matchAvailability;
    });
    setResults(filtered);
    setSelectedTherapist(null);
    setSelectedDay("");
    setTimeSlot("");
    setBookingConfirmed(false);
  };

  const handleSelectTherapist = (therapist) => {
    setSelectedTherapist(therapist);
    // Set default day to the first available day
    const firstDay = Object.keys(therapist.availability)[0];
    setSelectedDay(firstDay);
    setTimeSlot("");
    setBookingConfirmed(false);
    navigate("/book-therapist", { state: { therapist } });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (timeSlot && selectedDay) {
      setBookingConfirmed(true);
    }
  };

  // Generate available time slots based on selected therapist and day
  const availableTimeSlots =
    selectedTherapist && selectedDay
      ? generateTimeSlots(selectedTherapist.availability[selectedDay])
      : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Find Your Therapist
          </h2>
          <p className="text-lg text-gray-600">
            Search by specialty or availability to book your session
          </p>
        </div>

        {/* Search Form */}
        <div className="transform transition-all duration-500 hover:scale-[1.01]">
          <form
            onSubmit={handleSearch}
            className="bg-white shadow-xl rounded-lg p-6 mb-8 border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium text-sm mb-2">
                  Specialty:
                </label>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                >
                  <option value="">All Specialties</option>
                  {uniqueSpecialties.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium text-sm mb-2">
                  Available Day:
                </label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                >
                  <option value="">Any Day</option>
                  {uniqueDays.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Search
            </button>
          </form>
        </div>

        {/* Search Results */}
        <div className="space-y-6">
          {results.length > 0 && (
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              Available Therapists
            </h3>
          )}
          <div className="grid grid-cols-1 gap-6">
            {results.length === 0 ? (
              <div className="bg-white shadow-lg rounded-lg p-8 text-center border border-gray-100">
                <div className="mb-6">
                  <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  No Therapists Found
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    We couldn&apos;t find any therapists matching your current
                    search criteria:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg inline-block mx-auto">
                    {specialty && (
                      <p className="text-gray-700">
                        <span className="font-medium">Specialty:</span>{" "}
                        {specialty}
                      </p>
                    )}
                    {availability && (
                      <p className="text-gray-700">
                        <span className="font-medium">Day:</span> {availability}
                      </p>
                    )}
                    {!specialty && !availability && (
                      <p className="text-gray-700 italic">No filters applied</p>
                    )}
                  </div>
                  <div className="mt-6">
                    <p className="text-gray-600 font-medium mb-2">
                      Suggestions:
                    </p>
                    <ul className="text-gray-600 text-sm space-y-2">
                      <li>• Try selecting a different specialty</li>
                      <li>• Check availability on different days</li>
                      <li>
                        • Clear one or both filters to broaden your search
                      </li>
                      <li>
                        • Check back later as new therapists may become
                        available
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              results.map((therapist) => (
                <div
                  key={therapist.id}
                  className="bg-white shadow-lg rounded-lg p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="flex-grow">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {therapist.name}
                      </h4>
                      <p className="text-gray-600 mb-1">
                        <span className="font-medium">Specialties:</span>{" "}
                        {therapist.specialties.join(", ")}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Availability:</span>{" "}
                        {Object.entries(therapist.availability)
                          .map(([day, time]) => `${day}: ${time}`)
                          .join(", ")}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSelectTherapist(therapist)}
                      className="mt-4 md:mt-0 md:ml-4 px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientSearch;
