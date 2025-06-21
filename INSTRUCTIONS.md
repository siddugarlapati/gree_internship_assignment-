# 🚀 How to Run This Project

This guide provides detailed step-by-step instructions to get the Product Listing Application up and running on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (version 18 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

### Optional but Recommended
- **Git** (for version control)
  - Download from: https://git-scm.com/
- **VS Code** (recommended editor)
  - Download from: https://code.visualstudio.com/

## 🛠️ Step-by-Step Setup Instructions

### Step 1: Navigate to Project Directory
```bash
# Open your terminal/command prompt
# Navigate to the project folder
cd gree_assignment-main-revised
```

### Step 2: Verify Project Structure
Ensure you're in the correct directory by checking for these files:
```bash
# List files to verify project structure
ls
# or on Windows:
dir
```

You should see files like:
- `package.json`
- `next.config.ts`
- `tsconfig.json`
- `app/` folder
- `pages/` folder

### Step 3: Install Dependencies
```bash
# Install all required packages
npm install
```

**What this does:**
- Downloads React 19, Next.js 15, TypeScript, and Tailwind CSS
- Creates a `node_modules` folder with all dependencies
- Generates `package-lock.json` with exact versions

**Expected output:**
```
added XXX packages, and audited XXX packages in Xs
found 0 vulnerabilities
```

### Step 4: Start the Development Server
```bash
# Start the development server with Turbopack
npm run dev
```

**What this does:**
- Starts Next.js development server
- Enables hot reloading (changes appear instantly)
- Uses Turbopack for faster builds

**Expected output:**
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully in XXX ms
```

### Step 5: Open Your Browser
1. Open your web browser (Chrome, Firefox, Safari, Edge)
2. Navigate to: **http://localhost:3000**
3. You should see the Product Listing Application

## 🎯 What You Should See

### Home Page
- Automatically redirects to `/products`
- Shows the product listing page

### Products Page
- **Add Product Form** at the top with:
  - Product Name input
  - Price input
  - Image URL input
  - "Add Product" button
- **Product Grid** showing:
  - Sample products (if any exist)
  - Product cards with images, names, and prices
  - Delete buttons for each product

## 🧪 Testing the Application

### Test Adding a Product
1. Fill in the form at the top:
   - **Product Name**: "Test Product"
   - **Price**: "999"
   - **Image URL**: "https://via.placeholder.com/300x300"
2. Click "Add Product"
3. The new product should appear in the grid below

### Test Deleting a Product
1. Find any product card
2. Click the red "Delete" button
3. The product should disappear from the list

### Test Product Details
1. Click on any product card
2. You should be taken to a detailed view page
3. Use browser back button to return to the list

## 🔧 Available Commands

### Development
```bash
npm run dev          # Start development server
```

### Production
```bash
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Check code quality
```

## 🚨 Troubleshooting

### Common Issues and Solutions

#### Issue 1: "command not found: npm"
**Solution:**
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

#### Issue 2: "Port 3000 is already in use"
**Solution:**
```bash
# Kill the process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

#### Issue 3: "Module not found" errors
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Issue 4: "Cannot find module 'next'"
**Solution:**
```bash
# Reinstall dependencies
npm install
# If that doesn't work:
npm cache clean --force
npm install
```

#### Issue 5: Page shows "Loading..." indefinitely
**Solution:**
- Check browser console for errors (F12)
- Ensure the development server is running
- Try refreshing the page

### Performance Issues

#### Slow Loading
- Ensure you have a stable internet connection
- Close other resource-intensive applications
- Check if antivirus is blocking Node.js

#### Hot Reload Not Working
- Check if file watchers are enabled
- Try restarting the development server
- Ensure you're editing files in the correct directory

## 📱 Testing on Different Devices

### Mobile Testing
1. Start the development server
2. Find your computer's IP address:
   ```bash
   # On Windows:
   ipconfig
   
   # On Mac/Linux:
   ifconfig
   ```
3. On your mobile device, navigate to: `http://YOUR_IP:3000`
4. Test the responsive design

### Browser Testing
Test the application in different browsers:
- Chrome
- Firefox
- Safari
- Edge

## 🔍 Debugging Tips

### Browser Developer Tools
1. Press `F12` to open developer tools
2. Check the **Console** tab for errors
3. Check the **Network** tab for API calls
4. Use **Elements** tab to inspect the DOM

### Next.js Debug Mode
```bash
# Run with debug information
DEBUG=* npm run dev
```

### TypeScript Errors
If you see TypeScript errors:
1. Check the terminal output
2. Ensure all files have proper TypeScript syntax
3. Run `npm run lint` to see detailed errors

## 🚀 Next Steps

Once the application is running successfully:

1. **Explore the Code:**
   - Check `app/products/page.tsx` for the main functionality
   - Review `pages/api/products/` for API endpoints
   - Examine `app/layout.tsx` for the overall structure

2. **Make Changes:**
   - Edit product form fields
   - Modify styling in `app/globals.css`
   - Add new features

3. **Learn More:**
   - Read the [README.md](README.md) for detailed documentation
   - Check [Next.js documentation](https://nextjs.org/docs)
   - Explore [Tailwind CSS](https://tailwindcss.com/docs)

## 📞 Getting Help

If you encounter issues not covered here:

1. **Check the README.md** for comprehensive documentation
2. **Search existing issues** in the project repository
3. **Create a new issue** with:
   - Your operating system
   - Node.js version (`node --version`)
   - npm version (`npm --version`)
   - Exact error message
   - Steps to reproduce the issue

---

**🎉 Congratulations!** Your Product Listing Application should now be running successfully at http://localhost:3000 