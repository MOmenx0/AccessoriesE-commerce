# Luxury Accessories E-commerce Application

A complete full-stack e-commerce application for luxury accessories built with .NET 8 Web API backend and React frontend.

## 🚀 Features

### Backend (.NET 8 Web API)
- **Authentication & Authorization**: JWT-based authentication with Admin/Client roles
- **Entity Framework Core**: SQLite database with code-first approach
- **RESTful APIs**: Complete CRUD operations for products, orders, and users
- **Security**: BCrypt password hashing, role-based access control
- **Data Seeding**: Preloaded sample data for immediate testing

### Frontend (React + TypeScript)
- **Modern UI**: Luxury brand aesthetic with black/gold color palette
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for engaging user experience
- **State Management**: React Context API for authentication and cart
- **Type Safety**: Full TypeScript implementation

### Core Functionality
- **Product Management**: Browse, search, filter, and view product details
- **Shopping Cart**: Add/remove items, quantity management
- **Order Processing**: Complete checkout flow with Cash on Delivery
- **User Management**: Registration, login, profile management
- **Admin Dashboard**: Product/order management, analytics
- **Order Tracking**: Visual progress indicators for order status

## 🛠️ Tech Stack

### Backend
- **.NET 8** - Latest .NET framework
- **C#** - Primary programming language
- **Entity Framework Core** - ORM for database operations
- **SQLite** - Lightweight database
- **JWT Authentication** - Secure token-based authentication
- **BCrypt.Net-Next** - Password hashing
- **Swagger/OpenAPI** - API documentation

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library

## 📁 Project Structure

```
AccessoriesE-commerce/
├── AccessoriesEcommerce.API/          # .NET 8 Web API Backend
│   ├── Controllers/                   # API endpoints
│   ├── Data/                         # Database context and seeding
│   ├── DTOs/                         # Data transfer objects
│   ├── Models/                       # Entity models
│   ├── Services/                     # Business logic services
│   ├── appsettings.json             # Configuration
│   ├── Program.cs                    # Application entry point
│   └── AccessoriesEcommerce.API.csproj
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   ├── contexts/                # React contexts
│   │   ├── pages/                   # Page components
│   │   ├── services/                # API service layer
│   │   ├── types/                   # TypeScript type definitions
│   │   ├── App.tsx                  # Main app component
│   │   └── main.tsx                 # Entry point
│   ├── package.json                 # Frontend dependencies
│   ├── tailwind.config.ts           # Tailwind configuration
│   └── vite.config.ts               # Vite configuration
└── README.md                         # This file
```

## 🚀 Getting Started

### Prerequisites
- **.NET 8 SDK** - [Download here](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd AccessoriesEcommerce.API
   ```

2. **Restore dependencies**
   ```bash
   dotnet restore
   ```

3. **Run the application**
   ```bash
   dotnet run
   ```

4. **Access the API**
   - API: http://localhost:5000
   - Swagger UI: http://localhost:5000/swagger

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173

## 🔐 Authentication

### Demo Accounts

#### Admin User
- **Email**: admin@luxury.com
- **Password**: admin123
- **Role**: Admin (Full access to all features)

#### Client User
- **Email**: client@luxury.com
- **Password**: client123
- **Role**: Client (Shopping and order management)

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/{id}` - Update product (Admin only)
- `DELETE /api/products/{id}` - Delete product (Admin only)

#### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user` - Get user orders
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/{id}/status` - Update order status (Admin only)

## 🎨 UI Components

### Design System
- **Color Palette**: Luxury black/gold theme
- **Typography**: Modern, readable fonts
- **Spacing**: Consistent 4px grid system
- **Shadows**: Subtle depth and elevation
- **Animations**: Smooth transitions and micro-interactions

### Key Components
- **Header**: Navigation with cart and user menu
- **Product Cards**: Responsive grid with hover effects
- **Cart**: Interactive shopping cart with quantity controls
- **Checkout**: Multi-step form with progress indicator
- **Dashboard**: Admin panel with analytics and management tools

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔒 Security Features

- **JWT Tokens**: Secure authentication with expiration
- **Role-Based Access**: Admin/Client permission system
- **Password Hashing**: BCrypt with salt rounds
- **CORS Configuration**: Secure cross-origin requests
- **Input Validation**: Server-side data validation

## 🗄️ Database Schema

### Core Entities
- **Users**: Authentication and profile information
- **Products**: Product catalog with images and details
- **Orders**: Order management with status tracking
- **OrderItems**: Individual items within orders
- **CartItems**: Shopping cart functionality
- **WishlistItems**: User wishlist (future feature)

## 🚀 Deployment

### Backend Deployment
1. Build the application: `dotnet publish -c Release`
2. Deploy to your preferred hosting platform (Azure, AWS, etc.)
3. Update connection strings and environment variables

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure API base URL for production

## 🧪 Testing

### Backend Testing
```bash
cd AccessoriesEcommerce.API
dotnet test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📊 Performance

- **Backend**: Optimized Entity Framework queries
- **Frontend**: Code splitting and lazy loading
- **Images**: Optimized image loading and caching
- **Database**: Efficient indexing and query optimization

## 🔮 Future Enhancements

- **Wishlist**: Save favorite products
- **Dark/Light Mode**: Theme switching
- **Advanced Search**: Elasticsearch integration
- **Payment Gateway**: Stripe/PayPal integration
- **Email Notifications**: Order updates and marketing
- **Analytics**: Advanced reporting and insights
- **Multi-language**: Internationalization support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/swagger`
- Review the code comments and documentation

## 🙏 Acknowledgments

- **.NET Team** for the excellent framework
- **React Team** for the amazing library
- **Tailwind CSS** for the utility-first approach
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons

---

**Built with ❤️ for luxury accessories enthusiasts**
