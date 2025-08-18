# Manager Dashboard - Food Reservation System

A modern, responsive dashboard for managing restaurant food reservations, built with Next.js, TypeScript, and Tailwind CSS.

![Dashboard Preview](./public/restaurant-image.jpg)

## ✨ Features

- **User Authentication**
  - Secure login/signup system
  - Protected routes and API endpoints
  - Session management

- **Dashboard**
  - Overview of key metrics
  - Quick access to important functions
  - Real-time updates

- **Management**
  - Menu management
  - Categories management
  - Order tracking and management
  - Table reservations

- **UI/UX**
  - Responsive design
  - Modern, clean interface
  - Intuitive navigation

## 🚀 Technologies

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form
- **State Management**: React Context API
- **Authentication**: NextAuth.js
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/manager_dashboard_food_reservation.git
   cd manager_dashboard_food_reservation
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   # Add other environment variables as needed
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
.
├── app/                    # App router pages and layouts
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── dashboard/         # Main dashboard pages
│   └── manage/            # Management pages (categories, menus, orders)
├── components/            # Reusable UI components
│   ├── manage/            # Management components
│   ├── navigation/        # Navigation components
│   └── ui/                # UI components
├── lib/                   # Utility functions and configurations
├── public/                # Static files
├── schema/                # Form validation schemas
├── store/                 # State management
└── types/                 # TypeScript type definitions
```

## 📝 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
# Add other environment variables here
```

## 🚀 Deployment

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Other Platforms

You can also deploy to other platforms like:
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Heroku](https://www.heroku.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
