# Fleet Management System (FMS)

## English

### Overview

Fleet Management System is a web application that displays real‑time
vehicle data from the **MBTA V3 API**.\
The application allows users to view vehicles, filter them by route and
trip, inspect vehicle details, and visualize location information.

The system is built using **Next.js, Redux Toolkit, Ant Design, and
Leaflet** for mapping.

API Reference: https://api-v3.mbta.com/docs/swagger/index.html

---

## Features

- View real‑time vehicles from the MBTA API
- Filter vehicles by **Route** and **Trip**
- Pagination with configurable page size (10 / 50 / 100)
- Vehicle detail modal with route, trip, and stop information
- Map visualization using Leaflet
- Dark / Light theme toggle

---

## Tech Stack

Technology Purpose

---

Next.js 16 React framework for SSR / App Router
React 19 UI library
Redux Toolkit Global state management
Ant Design UI component library
Axios API requests
Leaflet + React‑Leaflet Map rendering
TailwindCSS Utility‑first styling
Day.js Date formatting
Lodash Utility helpers

---

## Project Architecture

The project follows a **feature‑based modular architecture** with
separation between UI, state management, and API services.

    root
     ├── app
     │   ├── components
     │   │   └── ModalDetail
     │   │       ├── index.tsx
     │   │       └── useModalDetail.ts
     │   ├── useHome.tsx
     │   └── page.tsx
     │
     ├── components
     │   └── reusable UI components
     │
     ├── redux
     │   ├── store.ts
     │   └── features
     │       ├── themeSlice.ts
     │       ├── vehicleSlice.ts
     │       └── listSlice.ts
     │
     ├── hooks
     │   └── redux.ts
     │
     ├── libs
     │   ├── formatter.ts
     │   ├── notification.ts
     │   ├── requestApi.ts
     │   └── formatter.ts
     │
     ├── types
     │   └── TypeScript interfaces
     │
     └── assets
         └── constants and static data

### Architecture Principles

**1. Separation of Concerns** - UI Components → responsible only for
rendering - Hooks → handle business logic - Redux → manages global
application state - API Layer → handles HTTP communication

**2. Redux Toolkit State Management** The application uses Redux Toolkit
with slices:

- `themeSlice`
- `vehicleSlice`
- `listSlice`

These slices manage:

- vehicles
- routes
- trips
- loading states
- error handling

**3. Custom Hooks Pattern**

Example:

    useHome()

This hook handles: - pagination - filtering - API calls - UI state

This keeps UI components clean and maintainable.

**4. API Layer**

All HTTP requests go through:

    requestApi.ts

This wrapper standardizes:

- axios configuration
- base URL
- error handling

---

## Installation

Clone the repository:

    git clone <repository-url>

Navigate to the project folder:

    cd fleet-management-system

Install dependencies:

    npm install

or

    yarn install

---

## Create .env File

NEXT_PUBLIC_BASE_API_URL=https://api-v3.mbta.com

---

## Running the Application

Start development server:

    npm run dev

Then open:

    http://localhost:3000

---

## Production Build

Build the project:

    npm run build

Run the production server:

    npm run start

---

## API Used

The application consumes the **MBTA V3 Public API**:

https://api-v3.mbta.com/

Main endpoints used:

- `/vehicles`
- `/routes`
- `/trips`
- `/stops`

Pagination uses:

    page[offset]
    page[limit]

Example:

    /vehicles?page[offset]=0&page[limit]=10

---

# Bahasa Indonesia

## Gambaran Umum

Fleet Management System adalah aplikasi web yang menampilkan data
kendaraan secara **real‑time** dari **MBTA V3 API**.

Aplikasi ini memungkinkan pengguna untuk:

- melihat daftar kendaraan
- melakukan filter berdasarkan **route** dan **trip**
- melihat detail kendaraan
- melihat lokasi kendaraan pada peta

Aplikasi dibangun menggunakan **Next.js, Redux Toolkit, Ant Design, dan
Leaflet**.

---

## Fitur

- Menampilkan kendaraan secara real‑time
- Filter kendaraan berdasarkan **Route** dan **Trip**
- Pagination dengan ukuran halaman fleksibel (10 / 50 / 100)
- Modal detail kendaraan
- Visualisasi lokasi kendaraan pada peta
- Toggle tema **Dark / Light**

---

## Teknologi yang Digunakan

Teknologi Fungsi

---

Next.js Framework React
React Library UI
Redux Toolkit State management
Ant Design UI component
Axios HTTP request
Leaflet Map rendering
TailwindCSS Styling
Day.js Format tanggal
Lodash Utility helper

---

## Arsitektur Aplikasi

Proyek ini menggunakan **arsitektur modular berbasis fitur** dengan
pemisahan antara:

- UI
- State Management
- API Layer

Struktur folder utama:

    root
     ├── app
     ├── components
     ├── redux
     ├── hooks
     ├── libs
     ├── types
     └── assets

### Prinsip Arsitektur

**1. Separation of Concerns**

- Komponen UI hanya menangani tampilan
- Hook menangani logika bisnis
- Redux mengelola state global
- API layer menangani komunikasi HTTP

**2. Redux Toolkit**

State global dikelola menggunakan slice:

- `themeSlice`
- `vehicleSlice`
- `listSlice`

Yang mengatur:

- data kendaraan
- route
- trip
- loading state
- error handling

**3. Custom Hooks**

Contoh:

    useHome()

Hook ini mengelola:

- pagination
- filter
- pemanggilan API
- state UI

Hal ini membuat komponen UI lebih bersih.

**4. API Layer**

Semua request API menggunakan wrapper:

    requestApi.ts

Fungsinya:

- konfigurasi axios
- pengaturan base URL
- penanganan error

---

## Buat .env File

NEXT_PUBLIC_BASE_API_URL=https://api-v3.mbta.com

---

## Cara Menjalankan Aplikasi

Install dependency:

    npm install

Jalankan server development:

    npm run dev

Buka di browser:

    http://localhost:3000

---

## Build Production

Build aplikasi:

    npm run build

Jalankan server production:

    npm run start

---

## API yang Digunakan

Aplikasi menggunakan **MBTA V3 Public API**:

https://api-v3.mbta.com/

Endpoint utama:

- `/vehicles`
- `/routes`
- `/trips`
- `/stops`

Contoh request pagination:

    /vehicles?page[offset]=0&page[limit]=10
