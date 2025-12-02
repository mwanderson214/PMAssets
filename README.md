# PropWise - Standalone Website

This is a standalone commercial property management application built with React.

## Structure

```
PMAssets/
├── index.html          - Main HTML file
├── propwise.jsx        - React application code  
├── server.py           - Simple HTTP server (Python)
├── serve.sh            - Quick server start script
└── README.md           - This file
```

## Quick Start

### Option 1: Using Python (Recommended)

```bash
# Using Python 3
python3 server.py

# Or use the quick start script
chmod +x serve.sh
./serve.sh
```

Then open your browser to: **http://localhost:8000**

### Option 2: Using Node.js

```bash
# Install http-server globally (one time)
npm install -g http-server

# Run server
http-server -p 8000
```

### Option 3: Using PHP

```bash
php -S localhost:8000
```

## Demo Accounts

### Property Manager
- Email: `manager@propwise.com`
- Password: `demo123`
- Access: Full management dashboard

### Property Owner  
- Email: `owner@pacific.com`
- Password: `demo123`
- Access: Owner-specific views

## Features

- ✅ Property Management
- ✅ Tenant Tracking
- ✅ Lease Management
- ✅ Payment Processing
- ✅ Expense Tracking
- ✅ Owner Portal
- ✅ Financial Reports

## Technical Details

- **React 18** - UI framework
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Tailwind CSS** - Styling
- **Local Storage** - Data persistence

## Notes

- This is a demo application with mock data
- All data is stored in browser local storage
- No backend server required
- Works completely offline after initial load

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

---

**PropWise** - Built with React
