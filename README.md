# RNKit — Enterprise Mobile Application Foundation

RNKit is a highly optimized, type-safe, performance-locked React Native boilerplate template engineered for scalable data grids and seamless offline synchronization operations. The foundation uses a single source of truth structure for theme compliance, custom un-compromised UI controls, and a C++ native bridge execution layer.

---

## 🏗️ Core Architectural Blueprint

The runtime workspace is structured explicitly to decouple foundational layouts and reusable UI primitives from specific business feature domains:

```text
src/
├── app/                  # Application initialization configuration wrappers
│   ├── navigation/       # Type-safe stack navigators and dynamic auth-guard routers
│   └── providers/        # Redux, TanStack Query, and central Theme Providers
├── components/           # Global shared atomic view matrix
│   ├── ui/               # Core interactive elements (AppButton, AppFlashList, etc.)
│   ├── layouts/          # Padding, margins, and layout structures (Row, Column, Screen)
│   ├── feedback/         # Modals, blocking layouts, and custom Drum Pickers
│   └── shared/           # Extracted domain primitives (StatusBadge, ScreenHeader)
├── config/               # Application-wide system variables
│   └── theme/            # Theme engine context mappings and design token matrices
├── database/             # Relational lazy-loading data tier
│   ├── models/           # Local model schemas mapped back to TypeScript classes
│   └── sync.ts           # FastAPI delta-sync merge transaction coordinator
├── hooks/                # Custom state logic blocks (useClock, useNetworkStatus)
└── modules/              # Context-isolated domain feature directories (auth, hr)

🛠️ Integrated Technology Framework
State Optimization: Redux Toolkit utilizing synchronous key-value disk virtualization via react-native-mmkv and redux-persist.  

Asynchronous Caching Engine: TanStack React Query v5 configured with safe retry budgets and automatic re-sync flags upon network reconnection.  

Network Infrastructure: Custom Axios instance handling dynamic API base-URL hunting and asynchronous 401 token rotation interceptors.  

High-Performance Rendering: @shopify/flash-list component wrapper locked at a steady, memory-recycled 60 FPS.  

Local Relational Database: WatermelonDB with lazy-loading records handled natively via C++ JSI bindings to support backend Delta synchronization.  

Feedback System: Zero-dependency modal arrays, looping native shimmer loading skeletons, and custom clock/calendar linear drum scroll wheels.  

🚀 Getting Started
📦 Prerequisites
Ensure your environment meets the criteria defined in the official React Native CLI Environment Setup Guide.  

1️⃣ Initialization & Installation
Clone the repository and install the JavaScript dependencies:  

Bash
npm install
2️⃣ Sync Native Dependencies (macOS only for iOS)
Run the native CocoaPods pod-file linking system:  

Bash
cd ios && pod install && cd ..
Start your local packager server with a forced clean cache pass to compile path aliases cleanly:  

Bash
npx react-native start --clear-cache
4️⃣ Target Device Build Run
Open a secondary terminal workspace and launch your target platform:  

Android Deployment
Bash
npm run android
iOS Deployment
Bash
npm run ios
🔍 Validation, Testing & Code Health
This architecture uses static code validation metrics. Run the compile check regularly before saving commits into your version control logs:  

Bash
npm run typescript
Note: This runs tsc --noEmit under the hood to completely type-check absolute path aliases (@/*), generic models, and system theme token integrations across the codebase without generating loose output code blocks.