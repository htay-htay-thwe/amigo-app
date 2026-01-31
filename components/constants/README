# 🌍 Amigo App

Hello GitHub Copilot! 👋

A comprehensive mobile application built with React Native and Expo that revolutionizes travel planning with AI-powered itineraries, real-time flight and hotel search, and intelligent trip organization.

---

## 📱 Overview

**Amigo App** is a modern travel planning solution designed to simplify the entire journey—from initial inspiration to detailed day-by-day itineraries. Whether you're planning a weekend getaway or a month-long adventure, Amigo helps you organize flights, accommodations, activities, and budgets all in one place.

### ✨ Key Highlights

- 🤖 **AI-Powered Planning**: Leverages Google Gemini AI to generate personalized itineraries
- ✈️ **Smart Flight & Hotel Search**: Real-time travel data with cost optimization
- 📅 **Interactive Timeline**: Visual day-by-day itinerary with activity cards
- 💾 **Save & Organize**: Multiple trip plans with persistent storage
- 🔐 **Secure Authentication**: Google Sign-In integration
- 🌙 **Theme Support**: Light and dark mode for comfortable viewing
- 📱 **Cross-Platform**: Works on iOS and Android

---

## 🚀 Features

### 🗺️ Intelligent Trip Planning
- **6-Step Planning Wizard**: Guided process from destination selection to final confirmation
- **AI Itinerary Generation**: Automatically creates day-by-day activities based on preferences
- **Budget Management**: Track estimated costs for flights, hotels, and activities
- **Flexible Dates**: Calendar integration for easy date selection

### ✈️ Travel Logistics
- **Flight Search**: Browse outbound and return flights with pricing
- **Hotel Recommendations**: AI-selected accommodations within budget
- **Visa Information**: Essential travel requirements and documentation
- **Cost Optimization**: Smart selection of lowest-cost options

### 📊 Trip Management
- **Save Multiple Plans**: Organize all your trips in one place
- **Edit Itineraries**: Modify trip details and summaries
- **Activity Cards**: Visual timeline with photos, descriptions, and costs
- **YouTube Integration**: Discover destination videos and guides

### 👤 User Experience
- **Smooth Navigation**: Bottom tabs and stack navigation
- **Form Validation**: Input validation for travel details
- **Toast Notifications**: User-friendly feedback messages
- **Gesture Support**: Swipe and tap interactions

---

## 🛠️ Tech Stack

### Core Technologies
| Category | Technology |
|----------|-----------|
| **Framework** | React Native 0.81.5 with Expo SDK 54 |
| **Language** | TypeScript 5.9 |
| **Navigation** | Expo Router 6 |
| **State Management** | Zustand |
| **Styling** | NativeWind (TailwindCSS) |
| **AI Integration** | Google Gemini API |

### Key Dependencies
- **Authentication**: `expo-auth-session`, `@react-native-google-signin/google-signin`
- **UI Components**: `react-native-reanimated`, `react-native-gesture-handler`, `react-native-calendars`
- **Storage**: `@react-native-async-storage/async-storage`
- **HTTP Client**: `axios`
- **Notifications**: `toastify-react-native`
- **Carousel**: `react-native-reanimated-carousel`

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Studio (for Android development)

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/htay-htay-thwe/amigo-app.git
cd amigo-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**

Create a `.env` file in the root directory (or configure directly in your code):
```env
# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Flight & Hotel API Keys (if applicable)
TRAVEL_API_KEY=your_travel_api_key_here
```

4. **Start the development server**
```bash
npx expo start
# or
npm start
```

5. **Run on your preferred platform**
```bash
# For Android
npx expo run:android
# or npm run android

# For iOS (Mac only)
npx expo run:ios
# or npm run ios

# For Web
npx expo start --web
# or npm run web
```

---

## 📂 Project Structure

```
amigo-app/
├── app/                          # Application screens
│   ├── screens/                  # All screen components
│   │   ├── GetStarted.tsx        # Onboarding screen
│   │   ├── Login.tsx             # Authentication
│   │   ├── Register.tsx          # User registration
│   │   ├── StepOne.tsx - StepSix.tsx  # Planning wizard steps
│   │   ├── TripPlan.tsx          # Generated itinerary view
│   │   └── Save.tsx              # Saved trips
│   ├── DataForm/                 # Form components
│   └── _layout.tsx               # Root layout
│
├── components/
│   ├── constants/                # Configuration & data
│   │   ├── api.ts                # API setup (Gemini)
│   │   ├── firstSystemPrompt.ts  # AI prompts
│   │   ├── nation.ts             # Country/destination data
│   │   └── validation.ts         # Form validation rules
│   │
│   ├── store/                    # State management (Zustand)
│   │   ├── auth.store.ts         # Authentication state
│   │   ├── trip.store.ts         # Trip planning state
│   │   └── plan.store.ts         # Saved plans state
│   │
│   ├── navigation/               # Navigation components
│   │   ├── BottomTabs.tsx        # Main tab navigator
│   │   └── StepStack.tsx         # Planning wizard stack
│   │
│   ├── Timeline/                 # Itinerary display
│   │   ├── ItineraryTimeline.tsx
│   │   ├── DaySection.tsx
│   │   └── ActivityCard.tsx
│   │
│   ├── ui/                       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── DatePicker.tsx
│   │   └── StepIndicatorComponent.tsx
│   │
│   └── Visa/                     # Travel logistics
│       ├── FlightCard.tsx
│       └── VisaCard.tsx
│
├── assets/                       # Static resources
│   └── images/
│
├── android/                      # Android native code
├── App.tsx                       # Root component
└── package.json                  # Dependencies
```

---

## 🎯 How It Works

### Planning Flow

1. **Get Started** → User creates an account or logs in
2. **Step 1: Destination** → Select country and city
3. **Step 2: Dates** → Choose travel dates
4. **Step 3: Budget** → Set spending limits
5. **Step 4: Preferences** → Activities, interests, travel style
6. **Step 5: Logistics** → Review flights and hotels
7. **Step 6: Confirmation** → Finalize and generate itinerary

### AI Integration

The app uses **Google Gemini API** to:
- Analyze trip parameters (destination, dates, budget, preferences)
- Search and select optimal flights and hotels
- Generate personalized day-by-day itineraries
- Provide activity recommendations with costs and timing
- Fetch YouTube videos for destination inspiration

### State Management

**Zustand stores** handle:
- `auth.store.ts`: User authentication and session management
- `trip.store.ts`: Current trip planning data (destination, dates, budget, etc.)
- `plan.store.ts`: Saved trips and itineraries
- `updateData.store.ts`: Data synchronization

---

## 🔑 Key Features Explained

### 🤖 AI-Powered Itinerary Generation

The app sends structured prompts to Google Gemini AI including:
- Trip details (destination, dates, budget)
- Flight and hotel options
- User preferences (activities, pace, interests)

The AI returns:
- Optimized flight and hotel selection
- Day-by-day itinerary with activities
- Time schedules and cost breakdowns
- Location descriptions and tips

### ✈️ Flight & Hotel Integration

- Real-time search through travel APIs
- Cost comparison and optimization
- AI-selected best options based on budget
- Detailed cards with pricing and amenities

### 📅 Interactive Timeline

- Collapsible day sections
- Activity cards with images
- Time-based organization
- Cost tracking per activity
- Photo carousels for destinations

---

## 🔐 Authentication

The app supports:
- **Email/Password**: Traditional registration and login
- **Google Sign-In**: One-tap authentication
- **Session Persistence**: AsyncStorage for offline access
- **Secure State**: Protected routes for authenticated users

---

## 🎨 UI/UX Features

- **NativeWind Styling**: TailwindCSS utilities for React Native
- **Custom Components**: Consistent design system
- **Animations**: React Native Reanimated for smooth transitions
- **Gesture Handling**: Swipe, tap, and scroll interactions
- **Responsive Design**: Adapts to different screen sizes
- **Toast Notifications**: User feedback for actions

---

## 📱 Screens Overview

| Screen | Purpose |
|--------|---------|
| `GetStarted` | App introduction and onboarding |
| `Login/Register` | User authentication |
| `Home` | Dashboard with quick actions |
| `StepOne - StepSix` | 6-step trip planning wizard |
| `TripPlan` | View generated AI itinerary |
| `TripDetails` | Detailed trip information |
| `TripEdit` | Modify trip parameters |
| `Save` | Browse all saved trips |
| `Settings` | App preferences and account |
| `Google` | Google Sign-In integration |

---

## 🧩 Core Components

### Navigation
- `BottomTabs.tsx`: Main app navigation (Home, Plan, Save)
- `StepStack.tsx`: Sequential planning wizard

### Forms
- `FormField.tsx`: Reusable input fields with validation
- `DatePicker.tsx`: Calendar date selection
- `Toggle.tsx`: Switch components for preferences

### Display
- `ItineraryTimeline.tsx`: Complete trip timeline
- `ActivityCard.tsx`: Individual activity with details
- `TripCard.tsx`: Saved trip preview card
- `ImageCarousel.tsx`: Swipeable photo gallery

---

## 🔧 Configuration

### Tailwind Setup
Configured in `tailwind.config.js` with NativeWind for React Native styling.

### TypeScript
Type definitions in `tsconfig.json` ensure type safety across the codebase.

### Expo Config
`app.json` contains:
- App name and slug
- Icon and splash screen
- Platform-specific settings
- Plugin configurations

---

## 🚨 Troubleshooting

### Common Issues

**1. Metro bundler issues**
```bash
npx expo start --clear
```

**2. Android build errors**
```bash
cd android
./gradlew clean
cd ..
npx expo run:android
```

**3. iOS pod issues (Mac)**
```bash
cd ios
pod install
cd ..
npx expo run:ios
```

**4. Missing dependencies**
```bash
rm -rf node_modules package-lock.json
npm install
```

**5. API Key issues**
- Ensure Gemini API key is properly configured
- Check API quota and rate limits
- Verify network connectivity

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use NativeWind for styling consistency
- Write clear commit messages
- Test on both iOS and Android
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Htay Htay Thwe**

- GitHub: [@htay-htay-thwe](https://github.com/htay-htay-thwe)
- Repository: [amigo-app](https://github.com/htay-htay-thwe/amigo-app)

---

## 🙏 Acknowledgments

- **Expo Team** for the amazing framework
- **Google Gemini** for AI capabilities
- **React Native Community** for excellent libraries
- **NativeWind** for TailwindCSS integration

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Search [existing issues](https://github.com/htay-htay-thwe/amigo-app/issues)
3. Open a new issue with detailed information

---

## 🗺️ Roadmap

Future enhancements planned:

- [ ] Real-time collaboration for group trips
- [ ] Expense tracking and splitting
- [ ] Integration with booking platforms
- [ ] Offline map support
- [ ] Social features and trip sharing
- [ ] Multi-language support
- [ ] Currency conversion
- [ ] Weather forecasts integration
- [ ] Travel insurance recommendations

---

## 📸 Screenshots

_Coming soon - Screenshots of the app in action_

---

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐ on GitHub!

---

**Made with ❤️ by Htay Htay Thwe**
