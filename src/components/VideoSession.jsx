import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function VideoSession() {
  const navigate = useNavigate();
  const { meetingId } = useParams();
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [participantCount, setParticipantCount] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // Validate meeting ID
    if (!meetingId) {
      navigate("/dashboard");
      return;
    }

    // Simulate connection delay
    const connectionTimer = setTimeout(() => {
      setIsConnected(true);
      setParticipantCount(2); // Simulate other participant joining
    }, 2000);

    // Start session timer
    const sessionTimer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(connectionTimer);
      clearInterval(sessionTimer);
    };
  }, [meetingId, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleEndSession = () => {
    if (window.confirm("Are you sure you want to end the session?")) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Therapy Session</h1>
            <p className="text-sm text-gray-400">Meeting ID: {meetingId}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Session Time</p>
            <p className="font-mono">{formatTime(elapsedTime)}</p>
          </div>
        </div>
      </div>

      {/* Main video area */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
          {!isConnected ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>Connecting to session...</p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xl mb-2">Session in Progress</p>
                <p className="text-gray-400">
                  {participantCount} participant
                  {participantCount !== 1 ? "s" : ""} in the session
                </p>
              </div>
            </div>
          )}

          {/* Self view */}
          <div className="absolute bottom-4 right-4 w-48 aspect-video bg-gray-700 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm">You</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full ${
              isMuted ? "bg-red-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMuted ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              )}
            </svg>
          </button>
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-4 rounded-full ${
              isVideoOff ? "bg-red-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isVideoOff ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              )}
            </svg>
          </button>
          <button
            onClick={handleEndSession}
            className="px-6 py-4 bg-red-500 rounded-full hover:bg-red-600"
          >
            End Session
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoSession;
