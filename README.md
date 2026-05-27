# RNKit — Enterprise Mobile Application Foundation

RNKit is a highly optimized, type-safe, performance-focused React Native boilerplate engineered for scalable enterprise mobile applications, offline-first workflows, and high-performance data synchronization systems.

The architecture is designed around a single source of truth structure with modular feature isolation, reusable UI primitives, dynamic theming, and native-performance storage/database layers.

---

# 🏗️ Core Architectural Blueprint

```text
src/
├── app/                  # Application initialization and providers
│   ├── navigation/       # Type-safe navigation architecture
│   └── providers/        # Redux, QueryClient, ThemeProvider
│
├── components/           # Shared reusable UI system
│   ├── ui/               # Atomic components
│   ├── layouts/          # Structural wrappers
│   ├── feedback/         # Loading, alerts, modals
│   └── shared/           # Shared feature primitives
│
├── config/               # Environment & app configuration
│   └── theme/            # Design token system
│
├── database/             # Offline/local database layer
│   ├── models/           # Database schemas
│   └── sync.ts           # Delta synchronization engine
│
├── hooks/                # Reusable custom hooks
│
├── libs/                 # Third-party wrappers
│   ├── storage/
│   ├── analytics/
│   └── notifications/
│
├── services/             # Business service layer
│
├── state/                # Global state management
│
├── utils/                # Helpers and utilities
│
└── modules/              # Feature-driven architecture
    ├── auth/
    ├── hr/
    ├── inventory/
    └── crm/
```

---

# 🛠️ Integrated Technology Stack

## State Management

- Redux Toolkit
- Redux Persist
- react-native-mmkv

Provides:

- centralized predictable state
- synchronous persistence
- offline-safe authentication
- ultra-fast native storage

---

## Server State & Caching

- TanStack React Query v5

Features:

- automatic background re-fetching
- request deduplication
- retry handling
- cache synchronization
- network recovery support

---

## Networking Layer

- Axios
- Dynamic Base URL Resolution
- Request/Response Interceptors

Supports:

- automatic token injection
- silent refresh-token rotation
- centralized API management
- production-safe retry handling

---

## Rendering Performance

- @shopify/flash-list

Optimized for:

- high-volume enterprise datasets
- memory recycling
- stable 60 FPS rendering
- low-overhead virtualization

---

## Offline Database

- WatermelonDB
- Native JSI bindings

Capabilities:

- lazy-loaded records
- large-scale local persistence
- delta synchronization support
- offline-first workflows

---

## Feedback & UX System

Custom-built UI infrastructure:

- shimmer skeleton loaders
- global loading overlays
- modal orchestration
- segmented controls
- wheel/drum pickers
- toast system
- enterprise dashboard cards

---

# 🚀 Getting Started

## 📦 Prerequisites

Ensure your environment is configured using the official React Native CLI setup:

- Node.js
- Android Studio
- Xcode (macOS only)
- JDK 17+
- React Native CLI

---

# 1️⃣ Install Dependencies

```bash
npm install
```

---

# 2️⃣ Install iOS Pods (macOS only)

```bash
cd ios && pod install && cd ..
```

---

# 3️⃣ Start Metro Server

```bash
npx react-native start --clear-cache
```

---

# 4️⃣ Run Application

## Android

```bash
npm run android
```

## iOS

```bash
npm run ios
```

---

# 🔍 Validation & Code Health

Run full TypeScript validation:

```bash
npm run typescript
```

This executes:

```bash
tsc --noEmit
```

to validate:

- absolute path aliases
- TypeScript generics
- theme token typing
- navigation types
- module contracts

without generating build artifacts.

---

# 🧠 Architectural Goals

RNKit is engineered around these principles:

- Feature-driven modular architecture
- Enterprise-grade scalability
- Offline-first synchronization
- Predictable state management
- Type-safe development
- High rendering performance
- Clean separation of concerns
- Production reliability

---

# 📌 Current Foundation Modules

- Authentication System
- Dynamic Theme Engine
- HR Management Module
- Attendance System
- Leave Management
- Dashboard Analytics
- Persistent Session Infrastructure
- Network Recovery System

---

# 📄 License

MIT License

---

# ✨ Vision

RNKit is designed as a long-term enterprise mobile platform foundation capable of powering:

- ERP systems
- HRMS platforms
- inventory systems
- field-service applications
- industrial operations dashboards
- offline enterprise mobility solutions