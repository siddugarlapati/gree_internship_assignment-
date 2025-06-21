# 🛍️ Product Listing Application

A modern, full-stack product management application built with Next.js 15, React 19, TypeScript, and Tailwind CSS. This application allows users to view, add, and delete products with a clean, responsive interface.

## ✨ Features

- **Product Management**: Add, view, and delete products
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Dynamic product list updates
- **Image Support**: Product images with fallback handling
- **TypeScript**: Full type safety throughout the application
- **Modern Stack**: Built with Next.js 15 and React 19

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Development**: Turbopack for fast development builds
- **API**: Next.js API Routes
- **Data Storage**: In-memory storage (global state)

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (version 18 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gree_assignment-main-revised
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📖 Usage

### Adding a Product
1. Navigate to the products page (automatically redirected from home)
2. Fill in the product details:
   - **Product Name**: Enter the name of the product
   - **Price**: Enter the price (numeric value)
   - **Image URL**: Provide a valid image URL
3. Click "Add Product" to save

### Viewing Products
- All products are displayed in a responsive grid layout
- Each product card shows the image, name, and price
- Products are automatically loaded when the page loads

### Deleting Products
- Click the "Delete" button on any product card to remove it
- The product list will automatically update after deletion

### Product Details
- Click on a product to view its detailed information
- Individual product pages show larger images and additional details

## 🔧 Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🏗️ Project Structure

```
gree_assignment-main-revised/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page (redirects to products)
│   ├── globals.css              # Global styles
│   └── products/                # Products pages
│       ├── page.tsx             # Products listing page
│       ├── [id]/                # Dynamic product detail pages
│       │   └── page.tsx         # Individual product page
│       └── ProductCard.tsx      # Product card component
├── pages/                       # API Routes
│   └── api/
│       └── products/
│           ├── index.ts         # GET/POST products
│           └── [id].ts          # DELETE individual product
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
└── postcss.config.mjs          # PostCSS configuration
```

## 🔌 API Endpoints

### GET `/api/products`
Returns all products in the system.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Sample Product 1",
    "price": 1999,
    "imageUrl": "/next.svg"
  }
]
```

### POST `/api/products`
Adds a new product to the system.

**Request Body:**
```json
{
  "name": "Product Name",
  "price": 1999,
  "imageUrl": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "id": 1703123456789,
  "name": "Product Name",
  "price": 1999,
  "imageUrl": "https://example.com/image.jpg"
}
```

### DELETE `/api/products/[id]`
Deletes a product by ID.

**Response:**
```json
{
  "message": "Deleted product 1"
}
```

## 🎨 Styling

The application uses Tailwind CSS 4 for styling with:
- Responsive grid layouts
- Modern card designs
- Hover effects and transitions
- Mobile-first approach
- Clean typography

## 🔒 Data Storage

Currently, the application uses in-memory storage (global state) for simplicity. In a production environment, you would want to integrate with a proper database like:
- PostgreSQL
- MongoDB
- Supabase
- Firebase

## 🚀 Deployment

This application can be deployed to various platforms:

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

---

**Happy coding! 🎉**
