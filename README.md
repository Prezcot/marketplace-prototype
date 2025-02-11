# TheraConnect - AI-Powered Therapy Marketplace

## Overview

TheraConnect is a prototype marketplace platform that connects licensed therapists with clients seeking mental health services. The platform facilitates seamless booking of therapy sessions, secure video consultations, and integrated payment processing.

## 🚀 Features

### 1. Therapist Profiles

- AI-generated sample therapist profiles with realistic data
- Comprehensive profiles including names, specialties, bios, and availability
- Data stored in JSON format for easy access and modification

### 2. Client Search & Booking

- Intuitive search interface with filters for specialties and availability
- Real-time search results with detailed therapist information
- Streamlined booking process with time slot selection
- Clear confirmation system with booking details

### 3. Video Sessions

- Integrated with Jitsi Meet for secure video consultations
- Unique meeting links generated for each session

### 4. Payment Processing

- Simulated payment flow with credit/debit card support
- Mock transaction processing with realistic delays
- Secure payment confirmation system
- Transaction details and receipt generation

## 🛠️ Technology Stack

- **Frontend**: React.js with Vite
- **Styling**: Tailwind CSS
- **Video Conferencing**: Jitsi Meet API
- **State Management**: React Hooks
- **Routing**: React Router
- **Data Storage**: JSON

## 🔧 Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/Prezcot/marketplace-prototype.git
```

2. Change Directory:

```bash
cd marketplace-prototype
```

3. Install dependencies Start the development server:

```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

5. Login with your email

6. Search for a therapist

7. Book a therapist

8. Pay for the therapist - There is basic character length validation. Enter
   random numbers for all fields and continue

9. Confirm the booking - You will be redirected to a page with the booking
   details which includes the payment summary and the meeting link.

## 💡 Implementation Approach

### AI Tools Used

1. **Claude AI**: Used for:

   - Generating therapist profiles
   - Creating component structures
   - Implementing search algorithms
   - Designing UI/UX elements
   - Creating the readme file

2. **Cursor AI**: Used for:

   - Development environment of the project

### Development Process

1. Started with creating therapist profiles using AI-generated data
2. Implemented search and filtering functionality
3. Developed booking flow with time slot selection
4. Added mock payment processing
5. Integrated Jitsi Meet for video sessions
6. Enhanced UI/UX with Tailwind CSS

## 🎯 Assumptions & Shortcuts

1. **Authentication**: Basic authentication system implemented without full security features
2. **Database**: Used JSON file instead of a proper database for rapid prototyping
3. **Payment**: Simulated payment flow without actual payment gateway integration
4. **Email**: Mocked email notifications without actual email service
5. **Video**: Used free Jitsi Meet
