import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Building2, Users, FileText, DollarSign, TrendingUp, Plus, Search, ChevronRight, Home, Settings, LogOut, Eye, EyeOff, Calendar, MapPin, Phone, Mail, Edit2, Trash2, X, Check, AlertCircle, Building, Wallet, Receipt, ArrowUpRight, ArrowDownRight, Filter, MoreVertical, User, Key, Loader2 } from 'lucide-react';

// ============================================
// DESIGN TOKENS
// ============================================
const colors = {
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617'
  },
  amber: {
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706'
  },
  emerald: {
    50: '#ecfdf5',
    500: '#10b981',
    600: '#059669'
  },
  rose: {
    50: '#fff1f2',
    500: '#f43f5e',
    600: '#e11d48'
  },
  blue: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb'
  }
};

// ============================================
// MOCK DATA GENERATORS
// ============================================
const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultOwners = [
  { id: 'owner1', name: 'Pacific Investments LLC', contact: 'Robert Chen', email: 'robert@pacificinv.com', phone: '(206) 555-0100', type: 'LLC' },
  { id: 'owner2', name: 'Northwest Holdings', contact: 'Maria Garcia', email: 'maria@nwholdings.com', phone: '(503) 555-0200', type: 'Corporation' },
  { id: 'owner3', name: 'Emerald City Partners', contact: 'James Wilson', email: 'james@emeraldcp.com', phone: '(206) 555-0300', type: 'Partnership' },
  { id: 'owner4', name: 'David & Sarah Thompson', contact: 'David Thompson', email: 'david.thompson@email.com', phone: '(360) 555-0400', type: 'Individual' }
];

const defaultProperties = [
  {
    id: 'prop1',
    name: 'Harbor View Plaza',
    address: '1200 Waterfront Drive',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
    type: 'Office',
    buildingClass: 'A',
    zoning: 'C-2',
    stories: 8,
    sqft: 48000,
    lotSize: 0.75,
    parkingSpaces: 120,
    yearBuilt: 2018,
    yearRenovated: null,
    taxId: 'KC-2024-00142',
    owners: [
      { ownerId: 'owner1', percentage: 60 },
      { ownerId: 'owner3', percentage: 40 }
    ],
    units: [
      { id: 'unit1-1', name: 'Suite 100', floor: 1, sqft: 2400, type: 'Retail', status: 'vacant', features: ['Street access', 'Display windows'] },
      { id: 'unit1-2', name: 'Suite 200', floor: 2, sqft: 3100, type: 'Office', status: 'occupied', features: ['Corner unit', 'City view'] },
      { id: 'unit1-3', name: 'Suite 300', floor: 3, sqft: 3100, type: 'Office', status: 'vacant', features: ['Open floor plan'] },
      { id: 'unit1-4', name: 'Suite 400', floor: 4, sqft: 4250, type: 'Office', status: 'occupied', features: ['Executive suite', 'Water view', 'Private restroom'] },
      { id: 'unit1-5', name: 'Suite 500', floor: 5, sqft: 4250, type: 'Office', status: 'vacant', features: ['Water view'] },
      { id: 'unit1-6', name: 'Suite 600', floor: 6, sqft: 4250, type: 'Office', status: 'vacant', features: ['Water view', 'Kitchenette'] },
    ],
    propertyExpenses: [
      { id: 'pe1', type: 'Property Tax', amount: 4500, frequency: 'monthly' },
      { id: 'pe2', type: 'Insurance', amount: 1800, frequency: 'monthly' },
      { id: 'pe3', type: 'Mortgage', amount: 12500, frequency: 'monthly' },
      { id: 'pe4', type: 'Property Management', amount: 2200, frequency: 'monthly' },
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
  },
  {
    id: 'prop2',
    name: 'Metropolitan Business Center',
    address: '450 Commerce Street',
    city: 'Portland',
    state: 'OR',
    zip: '97201',
    type: 'Mixed Use',
    buildingClass: 'B',
    zoning: 'MU-1',
    stories: 5,
    sqft: 72000,
    lotSize: 1.2,
    parkingSpaces: 200,
    yearBuilt: 2015,
    yearRenovated: 2022,
    taxId: 'MC-2024-00891',
    owners: [
      { ownerId: 'owner1', percentage: 100 }
    ],
    units: [
      { id: 'unit2-1', name: 'Ground Floor', floor: 1, sqft: 4500, type: 'Retail', status: 'occupied', features: ['Street frontage', 'High ceilings'] },
      { id: 'unit2-2', name: 'Floor 2', floor: 2, sqft: 6000, type: 'Office', status: 'vacant', features: ['Full floor', 'Renovated 2022'] },
      { id: 'unit2-3', name: 'Floor 3', floor: 3, sqft: 6000, type: 'Office', status: 'occupied', features: ['Full floor', 'Renovated 2022'] },
      { id: 'unit2-4', name: 'Floor 4', floor: 4, sqft: 6000, type: 'Office', status: 'vacant', features: ['Full floor'] },
      { id: 'unit2-5', name: 'Floor 5', floor: 5, sqft: 6000, type: 'Office', status: 'vacant', features: ['Full floor', 'Rooftop access'] },
    ],
    propertyExpenses: [
      { id: 'pe5', type: 'Property Tax', amount: 5200, frequency: 'monthly' },
      { id: 'pe6', type: 'Insurance', amount: 2100, frequency: 'monthly' },
      { id: 'pe7', type: 'Mortgage', amount: 15800, frequency: 'monthly' },
      { id: 'pe8', type: 'Property Management', amount: 2800, frequency: 'monthly' },
      { id: 'pe9', type: 'Landscaping', amount: 450, frequency: 'monthly' },
    ],
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=400&h=300&fit=crop'
  },
  {
    id: 'prop3',
    name: 'Riverside Industrial Park',
    address: '8800 Industrial Boulevard',
    city: 'Vancouver',
    state: 'WA',
    zip: '98660',
    type: 'Industrial',
    buildingClass: 'B',
    zoning: 'M-1',
    stories: 1,
    sqft: 120000,
    lotSize: 5.5,
    parkingSpaces: 85,
    yearBuilt: 2010,
    yearRenovated: null,
    taxId: 'CL-2024-02341',
    owners: [
      { ownerId: 'owner2', percentage: 50 },
      { ownerId: 'owner4', percentage: 50 }
    ],
    units: [
      { id: 'unit3-1', name: 'Warehouse A', floor: 1, sqft: 35000, type: 'Warehouse', status: 'occupied', features: ['Loading dock', '24ft ceilings', '3-phase power'] },
      { id: 'unit3-2', name: 'Warehouse B', floor: 1, sqft: 35000, type: 'Warehouse', status: 'vacant', features: ['Loading dock', '24ft ceilings', '3-phase power'] },
      { id: 'unit3-3', name: 'Warehouse C', floor: 1, sqft: 25000, type: 'Warehouse', status: 'vacant', features: ['Loading dock', '20ft ceilings'] },
      { id: 'unit3-4', name: 'Office Suite', floor: 1, sqft: 5000, type: 'Office', status: 'vacant', features: ['Climate controlled', 'Warehouse access'] },
    ],
    propertyExpenses: [
      { id: 'pe10', type: 'Property Tax', amount: 3800, frequency: 'monthly' },
      { id: 'pe11', type: 'Insurance', amount: 2400, frequency: 'monthly' },
      { id: 'pe12', type: 'Mortgage', amount: 9200, frequency: 'monthly' },
      { id: 'pe13', type: 'Security', amount: 1200, frequency: 'monthly' },
    ],
    image: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=400&h=300&fit=crop'
  }
];

const defaultTenants = [
  { id: 'ten1', name: 'Vertex Technologies', contact: 'Sarah Chen', email: 'sarah@vertex.io', phone: '(206) 555-0142', propertyId: 'prop1', unitId: 'unit1-4', status: 'active' },
  { id: 'ten2', name: 'Cascade Legal Group', contact: 'Michael Torres', email: 'mtorres@cascadelegal.com', phone: '(206) 555-0198', propertyId: 'prop1', unitId: 'unit1-2', status: 'active' },
  { id: 'ten3', name: 'Emerald Accounting', contact: 'Jennifer Walsh', email: 'jwalsh@emeraldcpa.com', phone: '(503) 555-0167', propertyId: 'prop2', unitId: 'unit2-3', status: 'active' },
  { id: 'ten4', name: 'Pacific Logistics Co', contact: 'David Kim', email: 'dkim@paclog.com', phone: '(360) 555-0134', propertyId: 'prop3', unitId: 'unit3-1', status: 'active' },
  { id: 'ten5', name: 'Mountain Coffee Roasters', contact: 'Amy Liu', email: 'amy@mountaincoffee.com', phone: '(503) 555-0189', propertyId: 'prop2', unitId: 'unit2-1', status: 'active' }
];

const defaultLeases = [
  { 
    id: 'lease1', 
    tenantId: 'ten1', 
    propertyId: 'prop1', 
    unitId: 'unit1-4', 
    startDate: '2023-01-01', 
    endDate: '2025-12-31', 
    securityDeposit: 17000, 
    rentDueDay: 1,
    lateAfterDay: 5,
    lateChargeType: 'percentage',
    lateChargeAmount: 5,
    rentSchedule: [
      { startDate: '2023-01-01', endDate: '2023-12-31', monthlyRent: 8000 },
      { startDate: '2024-01-01', endDate: '2024-12-31', monthlyRent: 8250 },
      { startDate: '2025-01-01', endDate: '2025-12-31', monthlyRent: 8500 }
    ],
    recurringCharges: [
      { id: 'rc1', type: 'CAM', description: 'Common Area Maintenance', amount: 850 },
      { id: 'rc2', type: 'Utilities', description: 'Estimated Utilities', amount: 200 }
    ],
    status: 'active' 
  },
  { 
    id: 'lease2', 
    tenantId: 'ten2', 
    propertyId: 'prop1', 
    unitId: 'unit1-2', 
    startDate: '2022-06-01', 
    endDate: '2025-05-31', 
    securityDeposit: 12400, 
    rentDueDay: 1,
    lateAfterDay: 5,
    lateChargeType: 'flat',
    lateChargeAmount: 250,
    rentSchedule: [
      { startDate: '2022-06-01', endDate: '2023-05-31', monthlyRent: 5800 },
      { startDate: '2023-06-01', endDate: '2024-05-31', monthlyRent: 6000 },
      { startDate: '2024-06-01', endDate: '2025-05-31', monthlyRent: 6200 }
    ],
    recurringCharges: [
      { id: 'rc3', type: 'CAM', description: 'Common Area Maintenance', amount: 620 }
    ],
    status: 'active' 
  },
  { 
    id: 'lease3', 
    tenantId: 'ten3', 
    propertyId: 'prop2', 
    unitId: 'unit2-3', 
    startDate: '2023-03-01', 
    endDate: '2026-02-28', 
    securityDeposit: 24000, 
    rentDueDay: 1,
    lateAfterDay: 10,
    lateChargeType: 'percentage',
    lateChargeAmount: 3,
    rentSchedule: [
      { startDate: '2023-03-01', endDate: '2024-02-29', monthlyRent: 11500 },
      { startDate: '2024-03-01', endDate: '2025-02-28', monthlyRent: 12000 },
      { startDate: '2025-03-01', endDate: '2026-02-28', monthlyRent: 12500 }
    ],
    recurringCharges: [
      { id: 'rc4', type: 'CAM', description: 'Common Area Maintenance', amount: 1200 },
      { id: 'rc5', type: 'Management', description: 'Property Management Fee', amount: 360 }
    ],
    status: 'active' 
  },
  { 
    id: 'lease4', 
    tenantId: 'ten4', 
    propertyId: 'prop3', 
    unitId: 'unit3-1', 
    startDate: '2021-01-01', 
    endDate: '2025-12-31', 
    securityDeposit: 37000, 
    rentDueDay: 1,
    lateAfterDay: 5,
    lateChargeType: 'percentage',
    lateChargeAmount: 5,
    rentSchedule: [
      { startDate: '2021-01-01', endDate: '2021-12-31', monthlyRent: 17000 },
      { startDate: '2022-01-01', endDate: '2022-12-31', monthlyRent: 17500 },
      { startDate: '2023-01-01', endDate: '2023-12-31', monthlyRent: 18000 },
      { startDate: '2024-01-01', endDate: '2024-12-31', monthlyRent: 18250 },
      { startDate: '2025-01-01', endDate: '2025-12-31', monthlyRent: 18500 }
    ],
    recurringCharges: [
      { id: 'rc6', type: 'CAM', description: 'Common Area Maintenance', amount: 1850 },
      { id: 'rc7', type: 'Utilities', description: 'Pass-through Utilities', amount: 450 }
    ],
    status: 'active' 
  },
  { 
    id: 'lease5', 
    tenantId: 'ten5', 
    propertyId: 'prop2', 
    unitId: 'unit2-1', 
    startDate: '2024-01-01', 
    endDate: '2026-12-31', 
    securityDeposit: 9000, 
    rentDueDay: 1,
    lateAfterDay: 5,
    lateChargeType: 'flat',
    lateChargeAmount: 150,
    rentSchedule: [
      { startDate: '2024-01-01', endDate: '2024-12-31', monthlyRent: 4500 },
      { startDate: '2025-01-01', endDate: '2025-12-31', monthlyRent: 4650 },
      { startDate: '2026-01-01', endDate: '2026-12-31', monthlyRent: 4800 }
    ],
    recurringCharges: [
      { id: 'rc8', type: 'CAM', description: 'Common Area Maintenance', amount: 450 }
    ],
    status: 'active' 
  }
];

const generatePayments = () => {
  const payments = [];
  const months = ['2024-07', '2024-08', '2024-09', '2024-10', '2024-11'];
  defaultLeases.forEach(lease => {
    months.forEach(month => {
      // Find the rent for this month based on rent schedule
      const monthDate = new Date(month + '-15');
      const rentPeriod = lease.rentSchedule?.find(rs => {
        const start = new Date(rs.startDate);
        const end = new Date(rs.endDate);
        return monthDate >= start && monthDate <= end;
      });
      const rentAmount = rentPeriod?.monthlyRent || lease.rentSchedule?.[0]?.monthlyRent || 0;
      
      // Calculate total recurring charges
      const recurringTotal = (lease.recurringCharges || []).reduce((sum, rc) => sum + rc.amount, 0);
      const totalAmount = rentAmount + recurringTotal;
      
      payments.push({
        id: generateId(),
        leaseId: lease.id,
        tenantId: lease.tenantId,
        propertyId: lease.propertyId,
        amount: totalAmount,
        rentAmount: rentAmount,
        recurringCharges: recurringTotal,
        date: `${month}-01`,
        status: Math.random() > 0.1 ? 'paid' : 'pending',
        method: ['ACH', 'Check', 'Wire'][Math.floor(Math.random() * 3)]
      });
    });
  });
  return payments;
};

const generateExpenses = () => {
  const categories = ['Maintenance', 'Utilities', 'Insurance', 'Property Tax', 'Repairs', 'Landscaping', 'Security'];
  const expenses = [];
  defaultProperties.forEach(prop => {
    for (let i = 0; i < 8; i++) {
      expenses.push({
        id: generateId(),
        propertyId: prop.id,
        category: categories[Math.floor(Math.random() * categories.length)],
        description: `${categories[Math.floor(Math.random() * categories.length)]} - ${prop.name}`,
        amount: Math.floor(Math.random() * 5000) + 500,
        date: `2024-${String(Math.floor(Math.random() * 5) + 7).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        vendor: ['ABC Services', 'City Utilities', 'ProMaint Inc', 'SecureGuard'][Math.floor(Math.random() * 4)]
      });
    }
  });
  return expenses;
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// ============================================
// COMPONENTS
// ============================================

// Button Component
const Button = ({ children, variant = 'primary', size = 'md', icon: Icon, loading, disabled, onClick, className = '', type = 'button' }) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500',
    secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-500',
    ghost: 'text-slate-600 hover:bg-slate-100 focus:ring-slate-500',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
    md: 'px-4 py-2 text-sm rounded-lg gap-2',
    lg: 'px-6 py-3 text-base rounded-lg gap-2'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

// Input Component
const Input = ({ label, error, icon: Icon, ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="w-4 h-4 text-slate-400" />
        </div>
      )}
      <input
        {...props}
        className={`w-full px-4 py-2.5 ${Icon ? 'pl-10' : ''} text-slate-900 bg-white border ${error ? 'border-rose-300 focus:ring-rose-500 focus:border-rose-500' : 'border-slate-300 focus:ring-slate-500 focus:border-slate-500'} rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors`}
      />
    </div>
    {error && <p className="text-sm text-rose-600">{error}</p>}
  </div>
);

// Select Component
const Select = ({ label, options, error, ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
    <select
      {...props}
      className={`w-full px-4 py-2.5 text-slate-900 bg-white border ${error ? 'border-rose-300' : 'border-slate-300'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors`}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {error && <p className="text-sm text-rose-600">{error}</p>}
  </div>
);

// Card Component
const Card = ({ children, className = '', hover = false }) => (
  <div className={`bg-white rounded-xl border border-slate-200 ${hover ? 'hover:border-slate-300 hover:shadow-md transition-all duration-200' : ''} ${className}`}>
    {children}
  </div>
);

// Badge Component
const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    danger: 'bg-rose-50 text-rose-700',
    info: 'bg-blue-50 text-blue-700'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-start justify-center p-4 pt-16">
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
        <div className={`relative w-full ${sizes[size]} bg-white rounded-2xl shadow-2xl mb-8`}>
          <div className="flex items-center justify-between px-6 py-4 bg-slate-100 border-b border-slate-200 rounded-t-2xl">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="px-6 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, change, changeType, icon: Icon }) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
        {change && (
          <div className={`mt-2 flex items-center gap-1 text-sm ${changeType === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
            {changeType === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-slate-100 rounded-xl">
        <Icon className="w-6 h-6 text-slate-600" />
      </div>
    </div>
  </Card>
);

// Empty State Component
const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="p-4 bg-slate-100 rounded-2xl mb-4">
      <Icon className="w-8 h-8 text-slate-400" />
    </div>
    <h3 className="text-lg font-medium text-slate-900 mb-1">{title}</h3>
    <p className="text-sm text-slate-500 text-center max-w-sm mb-6">{description}</p>
    {action}
  </div>
);

// ============================================
// LOGIN SCREEN
// ============================================
const LoginScreen = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const demoUsers = [
    { email: 'manager@propwise.com', password: 'demo123', role: 'manager', name: 'Alex Morgan' },
    { email: 'owner@pacific.com', password: 'demo123', role: 'owner', name: 'Pacific Investments LLC', ownerId: 'owner1' }
  ];

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const user = demoUsers.find(u => u.email === email && u.password === password);
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 800);
  };

  const handleDemoLogin = (user) => {
    setEmail(user.email);
    setPassword(user.password);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500 rounded-xl">
              <Building2 className="w-6 h-6 text-slate-900" />
            </div>
            <span className="text-2xl font-semibold text-white tracking-tight">PropWise</span>
          </div>
        </div>
        
        <div className="relative space-y-6">
          <h1 className="text-4xl font-semibold text-white leading-tight">
            Commercial property<br />management, simplified.
          </h1>
          <p className="text-lg text-slate-400 max-w-md">
            Track properties, tenants, leases, and finances in one unified platform designed for professional property managers.
          </p>
        </div>
        
        <div className="relative flex items-center gap-8 text-sm text-slate-500">
          <span>© 2024 PropWise</span>
          <span>Terms</span>
          <span>Privacy</span>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="p-2.5 bg-amber-500 rounded-xl">
              <Building2 className="w-6 h-6 text-slate-900" />
            </div>
            <span className="text-2xl font-semibold text-slate-900 tracking-tight">PropWise</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900">Welcome back</h2>
            <p className="mt-2 text-slate-500">Sign in to access your property portfolio</p>
          </div>

          <div className="space-y-5">
            <Input
              label="Email address"
              type="email"
              icon={Mail}
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 pr-10 text-slate-900 bg-white border border-slate-300 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-lg text-sm text-rose-700">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <Button onClick={handleLogin} loading={isLoading} className="w-full" size="lg">
              Sign in
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-4">Try a demo account:</p>
            <div className="space-y-3">
              {demoUsers.map((user) => (
                <button
                  key={user.email}
                  onClick={() => handleDemoLogin(user)}
                  className="w-full flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-left"
                >
                  <div className={`p-2.5 rounded-xl ${user.role === 'manager' ? 'bg-blue-100' : 'bg-emerald-100'}`}>
                    <User className={`w-5 h-5 ${user.role === 'manager' ? 'text-blue-600' : 'text-emerald-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.role === 'manager' ? 'Property Manager' : 'Property Owner'}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SIDEBAR NAVIGATION
// ============================================
const Sidebar = ({ user, currentView, onNavigate, onLogout }) => {
  const managerNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'properties', label: 'Properties', icon: Building2 },
    { id: 'tenants', label: 'Tenants', icon: Building },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'owners', label: 'Owners', icon: Users },
  ];

  const ownerNavItems = [
    { id: 'owner-dashboard', label: 'Dashboard', icon: Home },
    { id: 'owner-properties', label: 'My Properties', icon: Building2 },
    { id: 'owner-financials', label: 'Financials', icon: TrendingUp },
  ];

  const navItems = user.role === 'owner' ? ownerNavItems : managerNavItems;

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200 flex flex-col z-40">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 rounded-xl">
            <Building2 className="w-5 h-5 text-slate-900" />
          </div>
          <span className="text-xl font-semibold text-slate-900 tracking-tight">PropWise</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              currentView === item.id
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-slate-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">{user.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user.role}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign out
        </button>
      </div>
    </aside>
  );
};

// ============================================
// MANAGER DASHBOARD
// ============================================
const ManagerDashboard = ({ properties, tenants, leases, payments, expenses }) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState('all');

  // Filter data based on selected property
  const filteredPayments = selectedPropertyId === 'all' 
    ? payments 
    : payments.filter(p => p.propertyId === selectedPropertyId);
  
  const filteredExpenses = selectedPropertyId === 'all'
    ? expenses
    : expenses.filter(e => e.propertyId === selectedPropertyId);
  
  const filteredLeases = selectedPropertyId === 'all'
    ? leases
    : leases.filter(l => l.propertyId === selectedPropertyId);
  
  const filteredTenants = selectedPropertyId === 'all'
    ? tenants
    : tenants.filter(t => t.propertyId === selectedPropertyId);
  
  const filteredProperties = selectedPropertyId === 'all'
    ? properties
    : properties.filter(p => p.id === selectedPropertyId);

  const totalRevenue = filteredPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  const netCashFlow = totalRevenue - totalExpenses;
  const totalUnits = filteredProperties.reduce((sum, p) => sum + (p.units?.length || 0), 0);
  const occupiedUnits = filteredTenants.filter(t => t.status === 'active').length;
  const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
  const pendingPayments = filteredPayments.filter(p => p.status === 'pending').length;

  const getUnit = (propertyId, unitId) => {
    const property = properties.find(p => p.id === propertyId);
    return property?.units?.find(u => u.id === unitId);
  };

  // 12-month cash flow data (in real app, this would be calculated from actual data)
  // For demo, we'll scale the data based on property selection
  const baseData = [
    { month: 'Dec', income: 47200, expenses: 11500 },
    { month: 'Jan', income: 48500, expenses: 12000 },
    { month: 'Feb', income: 48500, expenses: 9800 },
    { month: 'Mar', income: 49200, expenses: 14200 },
    { month: 'Apr', income: 49700, expenses: 10500 },
    { month: 'May', income: 49700, expenses: 8900 },
    { month: 'Jun', income: 49700, expenses: 11200 },
    { month: 'Jul', income: 48500, expenses: 12000 },
    { month: 'Aug', income: 49700, expenses: 8500 },
    { month: 'Sep', income: 49700, expenses: 15000 },
    { month: 'Oct', income: 49700, expenses: 9200 },
    { month: 'Nov', income: 49700, expenses: 11000 },
  ];

  // Scale data based on property selection (simplified for demo)
  const scaleFactor = selectedPropertyId === 'all' ? 1 : 
    (filteredProperties[0]?.units?.length || 1) / Math.max(properties.reduce((sum, p) => sum + (p.units?.length || 0), 0), 1);
  
  const cashFlowData = baseData.map(d => ({
    ...d,
    income: Math.round(d.income * scaleFactor),
    expenses: Math.round(d.expenses * scaleFactor),
    net: Math.round((d.income - d.expenses) * scaleFactor)
  }));

  // Current month data (November)
  const currentMonth = cashFlowData[cashFlowData.length - 1];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-slate-500">Overview of your property portfolio</p>
        </div>
        <div className="w-64">
          <select
            value={selectedPropertyId}
            onChange={(e) => setSelectedPropertyId(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          >
            <option value="all">All Properties</option>
            {properties.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Net Cash Flow Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Net Cash Flow</h3>
            <span className="text-xs text-slate-400">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
          <p className={`text-3xl font-bold ${currentMonth.net >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {currentMonth.net >= 0 ? '+' : ''}{formatCurrency(currentMonth.net)}
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm text-slate-600">Income</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">{formatCurrency(currentMonth.income)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-400" />
                <span className="text-sm text-slate-600">Expenses</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">{formatCurrency(currentMonth.expenses)}</span>
            </div>
          </div>
        </Card>

        {/* Occupancy Rate Card */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Occupancy Rate</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{occupancyRate}%</p>
              <div className="mt-2 flex items-center gap-1 text-sm text-emerald-600">
                <ArrowUpRight className="w-4 h-4" />
                <span>2% vs last month</span>
              </div>
            </div>
            <div className="p-3 bg-slate-100 rounded-xl">
              <Building2 className="w-6 h-6 text-slate-600" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${occupancyRate}%` }} />
            </div>
            <p className="text-xs text-slate-500 mt-2">{occupiedUnits} of {totalUnits} units occupied</p>
          </div>
        </Card>
      </div>

      {/* Cash Flow Chart - Full Width */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Cash Flow</h3>
        <p className="text-sm text-slate-500 mb-6">12-month overview of income, expenses, and net cash flow</p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={cashFlowData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip 
                formatter={(value) => formatCurrency(value)} 
                contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }}
                labelStyle={{ fontWeight: 600, marginBottom: 4 }}
              />
              <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Income" />
              <Bar dataKey="expenses" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Expenses" />
              <Line type="monotone" dataKey="net" stroke="#1e293b" strokeWidth={2} dot={{ fill: '#1e293b', strokeWidth: 2, r: 4 }} name="Net Cash Flow" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span className="text-sm text-slate-600">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-slate-400" />
            <span className="text-sm text-slate-600">Expenses</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-900" />
            <span className="text-sm text-slate-600">Net Cash Flow</span>
          </div>
        </div>
      </Card>

      {/* Pending Payments Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-xl">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Payments</p>
              <p className="text-2xl font-bold text-slate-900">{pendingPayments}</p>
            </div>
          </div>
          <button 
            onClick={() => setCurrentView('payments')} 
            className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1"
          >
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Recent Payments</h3>
            <Badge variant="info">{filteredPayments.length} total</Badge>
          </div>
          <div className="space-y-4">
            {filteredPayments.slice(0, 5).map((payment) => {
              const tenant = tenants.find(t => t.id === payment.tenantId);
              return (
                <div key={payment.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{tenant?.name || 'Unknown'}</p>
                      <p className="text-xs text-slate-500">{formatDate(payment.date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">{formatCurrency(payment.amount)}</p>
                    <Badge variant={payment.status === 'paid' ? 'success' : 'warning'}>{payment.status}</Badge>
                  </div>
                </div>
              );
            })}
            {filteredPayments.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">No payments found</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Upcoming Lease Expirations</h3>
          </div>
          <div className="space-y-4">
            {filteredLeases
              .sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
              .slice(0, 5)
              .map((lease) => {
                const tenant = tenants.find(t => t.id === lease.tenantId);
                const property = properties.find(p => p.id === lease.propertyId);
                const unit = getUnit(lease.propertyId, lease.unitId);
                const daysUntilExpiry = Math.ceil((new Date(lease.endDate) - new Date()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={lease.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{tenant?.name || 'Unknown'}</p>
                        <p className="text-xs text-slate-500">{property?.name || 'Unknown'} • {unit?.name || 'Unknown'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">{formatDate(lease.endDate)}</p>
                      <Badge variant={daysUntilExpiry < 90 ? 'warning' : 'default'}>
                        {daysUntilExpiry} days
                      </Badge>
                    </div>
                  </div>
                );
              })}
            {filteredLeases.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">No leases found</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ============================================
// PROPERTIES VIEW
// ============================================
const PropertiesView = ({ properties, setProperties, tenants, owners, leases, setLeases, payments, expenses, setExpenses }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPropertyDetail, setShowPropertyDetail] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingProperty, setDeletingProperty] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null);
  
  // Unit management
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [showDeleteUnitModal, setShowDeleteUnitModal] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [deletingUnit, setDeletingUnit] = useState(null);
  const [unitFormData, setUnitFormData] = useState({
    name: '', floor: '', sqft: '', type: 'Office', status: 'vacant', features: []
  });
  const [newFeature, setNewFeature] = useState('');

  // Lease management
  const [showLeaseModal, setShowLeaseModal] = useState(false);
  const [editingLease, setEditingLease] = useState(null);
  const [selectedTenantId, setSelectedTenantId] = useState(null);
  const [expandedLease, setExpandedLease] = useState(null);
  const [leaseFormData, setLeaseFormData] = useState({
    startDate: '', endDate: '', securityDeposit: '', 
    rentDueDay: '1', lateAfterDay: '5', lateChargeType: 'percentage', lateChargeAmount: '5',
    rentSchedule: [], recurringCharges: [], status: 'active'
  });
  const [editingRentPeriod, setEditingRentPeriod] = useState(null);
  const [rentPeriodForm, setRentPeriodForm] = useState({ startDate: '', endDate: '', monthlyRent: '' });
  const [editingCharge, setEditingCharge] = useState(null);
  const [chargeForm, setChargeForm] = useState({ type: 'CAM', description: '', amount: '' });

  // Property expense management
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenseFormData, setExpenseFormData] = useState({ type: 'Property Tax', amount: '', frequency: 'monthly' });
  
  const [formData, setFormData] = useState({
    name: '', address: '', city: '', state: '', zip: '', type: 'Office',
    buildingClass: 'B', zoning: '', stories: '', sqft: '', lotSize: '',
    parkingSpaces: '', yearBuilt: '', yearRenovated: '', taxId: '',
    owners: [], units: [], propertyExpenses: []
  });

  const filteredProperties = properties.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper functions
  const getOrdinalSuffix = (n) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  const getCurrentRent = (lease) => {
    if (!lease?.rentSchedule?.length) return 0;
    const today = new Date();
    const currentPeriod = lease.rentSchedule.find(rs => {
      const start = new Date(rs.startDate);
      const end = new Date(rs.endDate);
      return today >= start && today <= end;
    });
    return currentPeriod?.monthlyRent || lease.rentSchedule[0]?.monthlyRent || 0;
  };

  const getRentChange = (schedule, index) => {
    if (index === 0) return null;
    const current = parseFloat(schedule[index].monthlyRent) || 0;
    const previous = parseFloat(schedule[index - 1].monthlyRent) || 0;
    if (previous === 0) return null;
    return current - previous;
  };

  const getUnitTenant = (propertyId, unitId) => {
    return tenants.find(t => t.propertyId === propertyId && t.unitId === unitId && t.status === 'active');
  };

  const getOccupiedUnits = (property) => {
    return property.units?.filter(u => getUnitTenant(property.id, u.id)).length || 0;
  };

  const getOwnerNames = (property) => {
    return property.owners?.map(po => {
      const owner = owners.find(o => o.id === po.ownerId);
      return owner ? `${owner.name} (${po.percentage}%)` : 'Unknown';
    }).join(', ') || 'No owners';
  };

  const getPropertyLeases = (propertyId) => {
    return leases.filter(l => l.propertyId === propertyId);
  };

  const getPropertyIncome = (propertyId) => {
    const propLeases = getPropertyLeases(propertyId);
    return propLeases.reduce((sum, lease) => {
      const rent = getCurrentRent(lease);
      const charges = (lease.recurringCharges || []).reduce((s, c) => s + c.amount, 0);
      return sum + rent + charges;
    }, 0);
  };

  const getPropertyExpenses = (property) => {
    return (property.propertyExpenses || []).reduce((sum, e) => sum + e.amount, 0);
  };

  // Property handlers
  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setActiveTab('overview');
    setShowPropertyDetail(true);
  };

  const handleSubmit = () => {
    const propertyData = {
      ...formData,
      stories: parseInt(formData.stories) || 0,
      sqft: parseInt(formData.sqft) || 0,
      lotSize: parseFloat(formData.lotSize) || 0,
      parkingSpaces: parseInt(formData.parkingSpaces) || 0,
      yearBuilt: parseInt(formData.yearBuilt) || null,
      yearRenovated: formData.yearRenovated ? parseInt(formData.yearRenovated) : null,
    };
    
    if (editingProperty) {
      setProperties(properties.map(p => p.id === editingProperty.id ? { ...p, ...propertyData } : p));
    } else {
      setProperties([...properties, { ...propertyData, id: generateId(), units: [], propertyExpenses: [] }]);
    }
    setShowAddModal(false);
    setEditingProperty(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '', address: '', city: '', state: '', zip: '', type: 'Office',
      buildingClass: 'B', zoning: '', stories: '', sqft: '', lotSize: '',
      parkingSpaces: '', yearBuilt: '', yearRenovated: '', taxId: '',
      owners: [], units: [], propertyExpenses: []
    });
  };

  const handleEdit = (property, e) => {
    e?.stopPropagation();
    setFormData({
      ...property,
      stories: property.stories?.toString() || '',
      sqft: property.sqft?.toString() || '',
      lotSize: property.lotSize?.toString() || '',
      parkingSpaces: property.parkingSpaces?.toString() || '',
      yearBuilt: property.yearBuilt?.toString() || '',
      yearRenovated: property.yearRenovated?.toString() || '',
    });
    setEditingProperty(property);
    setShowAddModal(true);
  };

  const handleDelete = (property, e) => {
    e?.stopPropagation();
    const propertyTenants = tenants.filter(t => t.propertyId === property.id);
    if (propertyTenants.length > 0) {
      setDeletingProperty({ ...property, hasTenantsError: true, tenantCount: propertyTenants.length });
    } else {
      setDeletingProperty(property);
    }
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingProperty && !deletingProperty.hasTenantsError) {
      setProperties(properties.filter(p => p.id !== deletingProperty.id));
      if (selectedProperty?.id === deletingProperty.id) {
        setShowPropertyDetail(false);
        setSelectedProperty(null);
      }
    }
    setShowDeleteModal(false);
    setDeletingProperty(null);
  };

  // Owner management in form
  const addOwnerToForm = () => {
    setFormData({ ...formData, owners: [...formData.owners, { ownerId: '', percentage: 0 }] });
  };

  const updateOwnerInForm = (index, field, value) => {
    const newOwners = [...formData.owners];
    newOwners[index] = { ...newOwners[index], [field]: field === 'percentage' ? parseFloat(value) || 0 : value };
    setFormData({ ...formData, owners: newOwners });
  };

  const removeOwnerFromForm = (index) => {
    setFormData({ ...formData, owners: formData.owners.filter((_, i) => i !== index) });
  };

  const totalPercentage = formData.owners.reduce((sum, o) => sum + (o.percentage || 0), 0);

  // Unit management
  const openUnitModal = (unit = null) => {
    if (unit) {
      setEditingUnit(unit);
      setUnitFormData({
        ...unit,
        floor: unit.floor?.toString() || '',
        sqft: unit.sqft?.toString() || '',
        features: unit.features || []
      });
    } else {
      setEditingUnit(null);
      setUnitFormData({ name: '', floor: '', sqft: '', type: 'Office', status: 'vacant', features: [] });
    }
    setShowUnitModal(true);
  };

  const handleUnitSubmit = () => {
    const unitData = {
      ...unitFormData,
      floor: parseInt(unitFormData.floor) || 1,
      sqft: parseInt(unitFormData.sqft) || 0,
    };

    const updatedProperties = properties.map(p => {
      if (p.id === selectedProperty.id) {
        if (editingUnit) {
          return { ...p, units: p.units.map(u => u.id === editingUnit.id ? { ...u, ...unitData } : u) };
        } else {
          return { ...p, units: [...(p.units || []), { ...unitData, id: generateId() }] };
        }
      }
      return p;
    });
    
    setProperties(updatedProperties);
    setSelectedProperty(updatedProperties.find(p => p.id === selectedProperty.id));
    setShowUnitModal(false);
    setEditingUnit(null);
  };

  const handleDeleteUnit = (unitId) => {
    const unitTenant = getUnitTenant(selectedProperty.id, unitId);
    const unit = selectedProperty.units?.find(u => u.id === unitId);
    
    if (unitTenant) {
      setDeletingUnit({ unitId, unitName: unit?.name, hasTenantError: true });
    } else {
      setDeletingUnit({ unitId, unitName: unit?.name });
    }
    setShowDeleteUnitModal(true);
  };

  const confirmDeleteUnit = () => {
    if (deletingUnit && !deletingUnit.hasTenantError) {
      const updatedProperties = properties.map(p => {
        if (p.id === selectedProperty.id) {
          return { ...p, units: p.units.filter(u => u.id !== deletingUnit.unitId) };
        }
        return p;
      });
      setProperties(updatedProperties);
      setSelectedProperty(updatedProperties.find(p => p.id === selectedProperty.id));
    }
    setShowDeleteUnitModal(false);
    setDeletingUnit(null);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setUnitFormData({ ...unitFormData, features: [...unitFormData.features, newFeature.trim()] });
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setUnitFormData({ ...unitFormData, features: unitFormData.features.filter((_, i) => i !== index) });
  };

  // Lease management functions
  const propertyLeases = selectedProperty ? getPropertyLeases(selectedProperty.id) : [];
  const propertyTenants = selectedProperty ? tenants.filter(t => t.propertyId === selectedProperty.id) : [];
  const tenantsWithoutLease = propertyTenants.filter(t => 
    t.status === 'active' && t.unitId && !leases.some(l => l.tenantId === t.id)
  );
  const selectedTenant = tenants.find(t => t.id === selectedTenantId);

  const resetLeaseForm = () => {
    setSelectedTenantId(null);
    setEditingRentPeriod(null);
    setRentPeriodForm({ startDate: '', endDate: '', monthlyRent: '' });
    setEditingCharge(null);
    setChargeForm({ type: 'CAM', description: '', amount: '' });
    setLeaseFormData({
      startDate: '', endDate: '', securityDeposit: '', 
      rentDueDay: '1', lateAfterDay: '5', lateChargeType: 'percentage', lateChargeAmount: '5',
      rentSchedule: [], recurringCharges: [], status: 'active'
    });
  };

  const handleEditLease = (lease) => {
    setSelectedTenantId(lease.tenantId);
    setEditingRentPeriod(null);
    setEditingCharge(null);
    setLeaseFormData({ 
      startDate: lease.startDate || '',
      endDate: lease.endDate || '',
      securityDeposit: lease.securityDeposit?.toString() || '',
      rentDueDay: lease.rentDueDay?.toString() || '1',
      lateAfterDay: lease.lateAfterDay?.toString() || '5',
      lateChargeType: lease.lateChargeType || 'percentage',
      lateChargeAmount: lease.lateChargeAmount?.toString() || '5',
      rentSchedule: lease.rentSchedule || [],
      recurringCharges: lease.recurringCharges || [],
      status: lease.status || 'active'
    });
    setEditingLease(lease);
    setShowLeaseModal(true);
  };

  const handleLeaseSubmit = () => {
    const leaseData = {
      ...leaseFormData,
      tenantId: selectedTenantId,
      propertyId: selectedProperty.id,
      unitId: selectedTenant?.unitId,
      securityDeposit: parseFloat(leaseFormData.securityDeposit) || 0,
      rentDueDay: parseInt(leaseFormData.rentDueDay) || 1,
      lateAfterDay: parseInt(leaseFormData.lateAfterDay) || 5,
      lateChargeAmount: parseFloat(leaseFormData.lateChargeAmount) || 0,
      rentSchedule: leaseFormData.rentSchedule.map(rs => ({
        ...rs, monthlyRent: parseFloat(rs.monthlyRent) || 0
      })),
      recurringCharges: (leaseFormData.recurringCharges || []).map(rc => ({
        ...rc, amount: parseFloat(rc.amount) || 0
      }))
    };

    if (editingLease) {
      setLeases(leases.map(l => l.id === editingLease.id ? { ...l, ...leaseData } : l));
    } else {
      setLeases([...leases, { ...leaseData, id: generateId() }]);
    }
    setShowLeaseModal(false);
    setEditingLease(null);
    resetLeaseForm();
  };

  // Rent period management
  const addRentPeriod = () => {
    const lastPeriod = leaseFormData.rentSchedule[leaseFormData.rentSchedule.length - 1];
    const newStart = lastPeriod 
      ? new Date(new Date(lastPeriod.endDate).getTime() + 86400000).toISOString().split('T')[0]
      : leaseFormData.startDate || new Date().toISOString().split('T')[0];
    const newEnd = new Date(new Date(newStart).setFullYear(new Date(newStart).getFullYear() + 1) - 86400000).toISOString().split('T')[0];
    setRentPeriodForm({ startDate: newStart, endDate: newEnd, monthlyRent: lastPeriod?.monthlyRent?.toString() || '' });
    setEditingRentPeriod('new');
  };

  const editRentPeriod = (index) => {
    const period = leaseFormData.rentSchedule[index];
    setRentPeriodForm({ startDate: period.startDate, endDate: period.endDate, monthlyRent: period.monthlyRent?.toString() || '' });
    setEditingRentPeriod(index);
  };

  const saveRentPeriod = () => {
    if (editingRentPeriod === 'new') {
      setLeaseFormData({
        ...leaseFormData,
        rentSchedule: [...leaseFormData.rentSchedule, { ...rentPeriodForm, monthlyRent: parseFloat(rentPeriodForm.monthlyRent) || 0 }]
      });
    } else {
      const newSchedule = [...leaseFormData.rentSchedule];
      newSchedule[editingRentPeriod] = { ...rentPeriodForm, monthlyRent: parseFloat(rentPeriodForm.monthlyRent) || 0 };
      setLeaseFormData({ ...leaseFormData, rentSchedule: newSchedule });
    }
    setEditingRentPeriod(null);
    setRentPeriodForm({ startDate: '', endDate: '', monthlyRent: '' });
  };

  const cancelRentPeriod = () => {
    setEditingRentPeriod(null);
    setRentPeriodForm({ startDate: '', endDate: '', monthlyRent: '' });
  };

  const removeRentPeriod = (index) => {
    setLeaseFormData({ ...leaseFormData, rentSchedule: leaseFormData.rentSchedule.filter((_, i) => i !== index) });
  };

  // Recurring charges management
  const addRecurringCharge = () => {
    setChargeForm({ type: 'CAM', description: '', amount: '' });
    setEditingCharge('new');
  };

  const editRecurringCharge = (index) => {
    const charge = leaseFormData.recurringCharges[index];
    setChargeForm({ type: charge.type, description: charge.description, amount: charge.amount?.toString() || '' });
    setEditingCharge(index);
  };

  const saveRecurringCharge = () => {
    const chargeData = { 
      ...chargeForm, 
      id: editingCharge === 'new' ? generateId() : leaseFormData.recurringCharges[editingCharge]?.id,
      amount: parseFloat(chargeForm.amount) || 0 
    };
    
    if (editingCharge === 'new') {
      setLeaseFormData({ ...leaseFormData, recurringCharges: [...(leaseFormData.recurringCharges || []), chargeData] });
    } else {
      const newCharges = [...(leaseFormData.recurringCharges || [])];
      newCharges[editingCharge] = chargeData;
      setLeaseFormData({ ...leaseFormData, recurringCharges: newCharges });
    }
    setEditingCharge(null);
    setChargeForm({ type: 'CAM', description: '', amount: '' });
  };

  const cancelRecurringCharge = () => {
    setEditingCharge(null);
    setChargeForm({ type: 'CAM', description: '', amount: '' });
  };

  const removeRecurringCharge = (index) => {
    setLeaseFormData({ ...leaseFormData, recurringCharges: (leaseFormData.recurringCharges || []).filter((_, i) => i !== index) });
  };

  // Property expense management
  const openExpenseModal = (expense = null) => {
    if (expense) {
      setEditingExpense(expense);
      setExpenseFormData({ type: expense.type, amount: expense.amount?.toString() || '', frequency: expense.frequency || 'monthly' });
    } else {
      setEditingExpense(null);
      setExpenseFormData({ type: 'Property Tax', amount: '', frequency: 'monthly' });
    }
    setShowExpenseModal(true);
  };

  const handleExpenseSubmit = () => {
    const expenseData = {
      ...expenseFormData,
      id: editingExpense?.id || generateId(),
      amount: parseFloat(expenseFormData.amount) || 0
    };

    const updatedProperties = properties.map(p => {
      if (p.id === selectedProperty.id) {
        const currentExpenses = p.propertyExpenses || [];
        if (editingExpense) {
          return { ...p, propertyExpenses: currentExpenses.map(e => e.id === editingExpense.id ? expenseData : e) };
        } else {
          return { ...p, propertyExpenses: [...currentExpenses, expenseData] };
        }
      }
      return p;
    });

    setProperties(updatedProperties);
    setSelectedProperty(updatedProperties.find(p => p.id === selectedProperty.id));
    setShowExpenseModal(false);
    setEditingExpense(null);
  };

  const handleDeleteExpense = (expenseId) => {
    const updatedProperties = properties.map(p => {
      if (p.id === selectedProperty.id) {
        return { ...p, propertyExpenses: (p.propertyExpenses || []).filter(e => e.id !== expenseId) };
      }
      return p;
    });
    setProperties(updatedProperties);
    setSelectedProperty(updatedProperties.find(p => p.id === selectedProperty.id));
  };

  // Tab components
  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Property Details */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Property Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
          <div>
            <p className="text-xs text-slate-500">Type</p>
            <p className="text-sm font-medium text-slate-900">{selectedProperty.type}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Building Class</p>
            <p className="text-sm font-medium text-slate-900">Class {selectedProperty.buildingClass}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Total Sq Ft</p>
            <p className="text-sm font-medium text-slate-900">{selectedProperty.sqft?.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Stories</p>
            <p className="text-sm font-medium text-slate-900">{selectedProperty.stories}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Parking Spaces</p>
            <p className="text-sm font-medium text-slate-900">{selectedProperty.parkingSpaces || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Lot Size</p>
            <p className="text-sm font-medium text-slate-900">{selectedProperty.lotSize ? `${selectedProperty.lotSize} acres` : 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Year Built</p>
            <p className="text-sm font-medium text-slate-900">{selectedProperty.yearBuilt || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Zoning</p>
            <p className="text-sm font-medium text-slate-900">{selectedProperty.zoning || 'N/A'}</p>
          </div>
        </div>
        <div className="mt-3 p-3 bg-slate-50 rounded-lg">
          <p className="text-xs text-slate-500 mb-1">Owners</p>
          <p className="text-sm text-slate-700">{getOwnerNames(selectedProperty)}</p>
        </div>
      </div>

      {/* Units */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-900">Units ({selectedProperty.units?.length || 0})</h3>
          <Button size="sm" icon={Plus} onClick={() => openUnitModal()}>Add Unit</Button>
        </div>
        
        {selectedProperty.units?.length > 0 ? (
          <div className="border border-slate-200 rounded-lg divide-y divide-slate-100">
            {selectedProperty.units.map((unit) => {
              const tenant = getUnitTenant(selectedProperty.id, unit.id);
              return (
                <div key={unit.id} className="px-4 py-3 flex items-center gap-4 hover:bg-slate-50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-slate-900">{unit.name}</span>
                      <Badge variant={tenant ? 'success' : 'default'}>
                        {tenant ? 'Occupied' : unit.status}
                      </Badge>
                      <span className="text-xs text-slate-500">{unit.type}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-xs text-slate-500">
                      <span>Floor {unit.floor}</span>
                      <span>{unit.sqft?.toLocaleString()} sq ft</span>
                      {tenant && <span className="text-slate-700 font-medium">{tenant.name}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => openUnitModal(unit)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDeleteUnit(unit.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-slate-50 rounded-lg text-sm text-slate-500">
            No units added yet
          </div>
        )}
      </div>
    </div>
  );

  const LeasesTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{propertyLeases.length} lease(s) for this property</p>
        <Button size="sm" icon={Plus} onClick={() => { resetLeaseForm(); setShowLeaseModal(true); }}>New Lease</Button>
      </div>

      {propertyLeases.length > 0 ? (
        <div className="border border-slate-200 rounded-lg divide-y divide-slate-100">
          {propertyLeases.map((lease) => {
            const tenant = tenants.find(t => t.id === lease.tenantId);
            const unit = selectedProperty.units?.find(u => u.id === lease.unitId);
            const daysUntilExpiry = Math.ceil((new Date(lease.endDate) - new Date()) / (1000 * 60 * 60 * 24));
            const currentRent = getCurrentRent(lease);
            const recurringTotal = (lease.recurringCharges || []).reduce((sum, rc) => sum + rc.amount, 0);
            const totalMonthly = currentRent + recurringTotal;
            const isExpanded = expandedLease === lease.id;

            return (
              <div key={lease.id}>
                <div className="p-4 hover:bg-slate-50">
                  <div className="flex items-start gap-3">
                    <button onClick={() => setExpandedLease(isExpanded ? null : lease.id)} className="mt-0.5 p-1 hover:bg-slate-200 rounded">
                      <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{tenant?.name || 'Unknown'}</span>
                        <Badge variant={daysUntilExpiry < 90 ? 'warning' : 'success'}>
                          {daysUntilExpiry < 90 ? `${daysUntilExpiry} days` : 'Active'}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{unit?.name} • {formatDate(lease.startDate)} - {formatDate(lease.endDate)}</p>
                      <p className="text-sm text-slate-600 mt-1">
                        <span className="font-medium">{formatCurrency(totalMonthly)}</span>/month
                      </p>
                    </div>
                    <button onClick={() => handleEditLease(lease)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4">
                    <div className="ml-8 p-4 border border-slate-200 rounded-lg space-y-4">
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-slate-500">Security Deposit</p>
                          <p className="text-sm font-medium">{formatCurrency(lease.securityDeposit)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Rent Due</p>
                          <p className="text-sm font-medium">{lease.rentDueDay}{getOrdinalSuffix(lease.rentDueDay)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Late After</p>
                          <p className="text-sm font-medium">{lease.lateAfterDay}{getOrdinalSuffix(lease.lateAfterDay)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Late Charge</p>
                          <p className="text-sm font-medium">
                            {lease.lateChargeType === 'percentage' ? `${lease.lateChargeAmount}%` : formatCurrency(lease.lateChargeAmount)}
                          </p>
                        </div>
                      </div>

                      {lease.rentSchedule?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Rent Schedule</p>
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-slate-100">
                                <th className="text-left py-1.5 text-xs font-medium text-slate-400">Term</th>
                                <th className="text-right py-1.5 text-xs font-medium text-slate-400 w-24">Rent</th>
                                <th className="text-right py-1.5 text-xs font-medium text-slate-400 w-20">Change</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {lease.rentSchedule.map((period, idx) => {
                                const today = new Date();
                                const isCurrent = today >= new Date(period.startDate) && today <= new Date(period.endDate);
                                const change = getRentChange(lease.rentSchedule, idx);
                                return (
                                  <tr key={idx} className={isCurrent ? 'bg-emerald-50' : ''}>
                                    <td className="py-1.5 text-slate-600">
                                      {formatDate(period.startDate)} - {formatDate(period.endDate)}
                                      {isCurrent && <Badge variant="success" className="ml-2">Current</Badge>}
                                    </td>
                                    <td className="py-1.5 text-right">
                                      <span className="font-medium tabular-nums">{formatCurrency(period.monthlyRent)}</span>
                                    </td>
                                    <td className="py-1.5 text-right">
                                      <span className={`text-xs tabular-nums ${change !== null ? (change >= 0 ? 'text-emerald-600' : 'text-rose-600') : 'text-slate-300'}`}>
                                        {change !== null ? `${change >= 0 ? '+' : ''}${formatCurrency(change)}` : '—'}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {(lease.recurringCharges || []).length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Recurring Charges</p>
                          <div className="space-y-1">
                            {lease.recurringCharges.map((charge, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span className="text-slate-600">{charge.type}: {charge.description}</span>
                                <span className="font-medium tabular-nums">{formatCurrency(charge.amount)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          title="No leases"
          description="Create a lease for tenants in this property"
          action={<Button size="sm" icon={Plus} onClick={() => { resetLeaseForm(); setShowLeaseModal(true); }}>New Lease</Button>}
        />
      )}
    </div>
  );

  const FinancialsTab = () => {
    const monthlyIncome = getPropertyIncome(selectedProperty.id);
    const monthlyExpenses = getPropertyExpenses(selectedProperty);
    const netCashFlow = monthlyIncome - monthlyExpenses;

    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-xs font-medium text-emerald-600">Monthly Income</p>
            <p className="text-xl font-semibold text-emerald-700 mt-1">{formatCurrency(monthlyIncome)}</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-xs font-medium text-slate-600">Monthly Expenses</p>
            <p className="text-xl font-semibold text-slate-700 mt-1">{formatCurrency(monthlyExpenses)}</p>
          </div>
          <div className={`p-4 border rounded-lg ${netCashFlow >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
            <p className={`text-xs font-medium ${netCashFlow >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>Net Cash Flow</p>
            <p className={`text-xl font-semibold mt-1 ${netCashFlow >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{formatCurrency(netCashFlow)}</p>
          </div>
        </div>

        {/* Property Expenses */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900">Property Expenses</h3>
            <Button size="sm" icon={Plus} onClick={() => openExpenseModal()}>Add Expense</Button>
          </div>

          {(selectedProperty.propertyExpenses || []).length > 0 ? (
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-2 text-xs font-medium text-slate-500">Type</th>
                    <th className="text-left px-4 py-2 text-xs font-medium text-slate-500">Frequency</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-slate-500">Amount</th>
                    <th className="w-20 px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedProperty.propertyExpenses.map((expense) => (
                    <tr key={expense.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{expense.type}</td>
                      <td className="px-4 py-3 text-slate-600 capitalize">{expense.frequency}</td>
                      <td className="px-4 py-3 text-right tabular-nums font-medium text-slate-900">{formatCurrency(expense.amount)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openExpenseModal(expense)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteExpense(expense.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50">
                    <td colSpan="2" className="px-4 py-3 text-sm font-medium text-slate-700">Total Monthly Expenses</td>
                    <td className="px-4 py-3 text-right tabular-nums font-semibold text-slate-900">{formatCurrency(monthlyExpenses)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 bg-slate-50 rounded-lg text-sm text-slate-500">
              No property expenses configured
            </div>
          )}
        </div>

        {/* Income Breakdown */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Income Breakdown</h3>
          {propertyLeases.length > 0 ? (
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-2 text-xs font-medium text-slate-500">Tenant</th>
                    <th className="text-left px-4 py-2 text-xs font-medium text-slate-500">Unit</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-slate-500">Rent</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-slate-500">Charges</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-slate-500">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {propertyLeases.map((lease) => {
                    const tenant = tenants.find(t => t.id === lease.tenantId);
                    const unit = selectedProperty.units?.find(u => u.id === lease.unitId);
                    const rent = getCurrentRent(lease);
                    const charges = (lease.recurringCharges || []).reduce((sum, c) => sum + c.amount, 0);
                    return (
                      <tr key={lease.id}>
                        <td className="px-4 py-3 font-medium text-slate-900">{tenant?.name}</td>
                        <td className="px-4 py-3 text-slate-600">{unit?.name}</td>
                        <td className="px-4 py-3 text-right tabular-nums">{formatCurrency(rent)}</td>
                        <td className="px-4 py-3 text-right tabular-nums">{formatCurrency(charges)}</td>
                        <td className="px-4 py-3 text-right tabular-nums font-medium">{formatCurrency(rent + charges)}</td>
                      </tr>
                    );
                  })}
                  <tr className="bg-slate-50">
                    <td colSpan="4" className="px-4 py-3 text-sm font-medium text-slate-700">Total Monthly Income</td>
                    <td className="px-4 py-3 text-right tabular-nums font-semibold text-slate-900">{formatCurrency(monthlyIncome)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 bg-slate-50 rounded-lg text-sm text-slate-500">
              No leases generating income
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Properties</h1>
          <p className="mt-1 text-slate-500">{properties.length} properties in your portfolio</p>
        </div>
        <Button icon={Plus} onClick={() => { resetForm(); setShowAddModal(true); }}>Add Property</Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-md">
          <Input
            icon={Search}
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <div className="divide-y divide-slate-100">
          {filteredProperties.map((property) => {
            const occupiedUnits = getOccupiedUnits(property);
            const totalUnits = property.units?.length || 0;
            
            return (
              <div 
                key={property.id} 
                className="p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => handlePropertyClick(property)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-slate-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-semibold text-slate-900">{property.name}</h3>
                      <Badge variant="default">{property.type}</Badge>
                      {property.buildingClass && (
                        <span className="text-xs font-medium text-slate-500">Class {property.buildingClass}</span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {property.address}, {property.city}, {property.state} {property.zip}
                    </p>
                    <div className="mt-2 flex items-center gap-6 text-sm">
                      <span className="text-slate-600">
                        <span className="font-medium">{occupiedUnits}</span>
                        <span className="text-slate-400">/{totalUnits} units</span>
                      </span>
                      <span className="text-slate-600">
                        <span className="font-medium">{property.sqft?.toLocaleString()}</span>
                        <span className="text-slate-400"> sq ft</span>
                      </span>
                      {property.stories && (
                        <span className="text-slate-600">
                          <span className="font-medium">{property.stories}</span>
                          <span className="text-slate-400"> {property.stories === 1 ? 'story' : 'stories'}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => handleEdit(property, e)}
                      title="Edit property"
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(property, e)}
                      title="Delete property"
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {filteredProperties.length === 0 && (
        <EmptyState
          icon={Building2}
          title="No properties found"
          description={searchQuery ? "Try adjusting your search terms" : "Add your first property to get started"}
          action={!searchQuery && <Button icon={Plus} onClick={() => { resetForm(); setShowAddModal(true); }}>Add Property</Button>}
        />
      )}

      {/* Property Detail Modal */}
      <Modal 
        isOpen={showPropertyDetail} 
        onClose={() => { setShowPropertyDetail(false); setSelectedProperty(null); setExpandedLease(null); }} 
        title={selectedProperty?.name || 'Property Details'} 
        size="xl"
      >
        {selectedProperty && (
          <div className="space-y-4">
            <p className="text-sm text-slate-500">
              {selectedProperty.address}, {selectedProperty.city}, {selectedProperty.state} {selectedProperty.zip}
            </p>

            {/* Tabs */}
            <div className="border-b border-slate-200">
              <nav className="flex gap-6">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'leases', label: 'Leases' },
                  { id: 'financials', label: 'Financials' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-slate-900 text-slate-900'
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="max-h-[60vh] overflow-y-auto pr-2">
              {activeTab === 'overview' && <OverviewTab />}
              {activeTab === 'leases' && <LeasesTab />}
              {activeTab === 'financials' && <FinancialsTab />}
            </div>
          </div>
        )}
      </Modal>

      {/* Add/Edit Property Modal */}
      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); setEditingProperty(null); }} title={editingProperty ? 'Edit Property' : 'Add Property'} size="xl">
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input label="Property Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Harbor View Plaza" />
              </div>
              <Select label="Property Type" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} options={[
                { value: 'Office', label: 'Office' },
                { value: 'Retail', label: 'Retail' },
                { value: 'Industrial', label: 'Industrial' },
                { value: 'Mixed Use', label: 'Mixed Use' },
                { value: 'Warehouse', label: 'Warehouse' },
                { value: 'Medical', label: 'Medical' },
                { value: 'Flex', label: 'Flex Space' }
              ]} />
              <Select label="Building Class" value={formData.buildingClass} onChange={(e) => setFormData({ ...formData, buildingClass: e.target.value })} options={[
                { value: 'A', label: 'Class A' },
                { value: 'B', label: 'Class B' },
                { value: 'C', label: 'Class C' }
              ]} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Location</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input label="Street Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="123 Main Street" />
              </div>
              <Input label="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} placeholder="Seattle" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="State" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} placeholder="WA" />
                <Input label="ZIP" value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} placeholder="98101" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Building Details</h3>
            <div className="grid grid-cols-3 gap-4">
              <Input label="Total Sq Ft" type="number" value={formData.sqft} onChange={(e) => setFormData({ ...formData, sqft: e.target.value })} placeholder="48000" />
              <Input label="Stories" type="number" value={formData.stories} onChange={(e) => setFormData({ ...formData, stories: e.target.value })} placeholder="8" />
              <Input label="Parking Spaces" type="number" value={formData.parkingSpaces} onChange={(e) => setFormData({ ...formData, parkingSpaces: e.target.value })} placeholder="120" />
              <Input label="Lot Size (acres)" type="number" step="0.01" value={formData.lotSize} onChange={(e) => setFormData({ ...formData, lotSize: e.target.value })} placeholder="0.75" />
              <Input label="Year Built" type="number" value={formData.yearBuilt} onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })} placeholder="2018" />
              <Input label="Year Renovated" type="number" value={formData.yearRenovated} onChange={(e) => setFormData({ ...formData, yearRenovated: e.target.value })} placeholder="2022" />
              <Input label="Zoning" value={formData.zoning} onChange={(e) => setFormData({ ...formData, zoning: e.target.value })} placeholder="C-2" />
              <Input label="Tax ID" value={formData.taxId} onChange={(e) => setFormData({ ...formData, taxId: e.target.value })} placeholder="KC-2024-00142" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900">Ownership</h3>
              <Button size="sm" icon={Plus} onClick={addOwnerToForm}>Add Owner</Button>
            </div>
            
            {formData.owners.length === 0 ? (
              <div className="text-center py-4 bg-slate-50 rounded-lg text-sm text-slate-500">No owners added yet</div>
            ) : (
              <div className="space-y-2">
                {formData.owners.map((ownerEntry, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                    <select
                      value={ownerEntry.ownerId}
                      onChange={(e) => updateOwnerInForm(index, 'ownerId', e.target.value)}
                      className="flex-1 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                      <option value="">Select owner...</option>
                      {owners.map(o => (<option key={o.id} value={o.id}>{o.name}</option>))}
                    </select>
                    <div className="w-24 relative">
                      <input type="number" min="0" max="100" value={ownerEntry.percentage} onChange={(e) => updateOwnerInForm(index, 'percentage', e.target.value)} className="w-full px-3 py-2 pr-7 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500" />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">%</span>
                    </div>
                    <button onClick={() => removeOwnerFromForm(index)} className="p-1.5 text-slate-400 hover:text-rose-500 rounded"><X className="w-4 h-4" /></button>
                  </div>
                ))}
                <p className={`text-xs font-medium ${totalPercentage === 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  Total: {totalPercentage}% {totalPercentage !== 100 && '(should equal 100%)'}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-200">
          <Button variant="secondary" onClick={() => { setShowAddModal(false); setEditingProperty(null); }}>Cancel</Button>
          <Button onClick={handleSubmit}>{editingProperty ? 'Save Changes' : 'Add Property'}</Button>
        </div>
      </Modal>

      {/* Add/Edit Unit Modal */}
      <Modal isOpen={showUnitModal} onClose={() => { setShowUnitModal(false); setEditingUnit(null); }} title={editingUnit ? 'Edit Unit' : 'Add Unit'}>
        <div className="space-y-4">
          <Input label="Unit Name/Number" value={unitFormData.name} onChange={(e) => setUnitFormData({ ...unitFormData, name: e.target.value })} placeholder="Suite 100" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Floor" type="number" value={unitFormData.floor} onChange={(e) => setUnitFormData({ ...unitFormData, floor: e.target.value })} placeholder="1" />
            <Input label="Square Footage" type="number" value={unitFormData.sqft} onChange={(e) => setUnitFormData({ ...unitFormData, sqft: e.target.value })} placeholder="2400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Unit Type" value={unitFormData.type} onChange={(e) => setUnitFormData({ ...unitFormData, type: e.target.value })} options={[
              { value: 'Office', label: 'Office' }, { value: 'Retail', label: 'Retail' }, { value: 'Warehouse', label: 'Warehouse' },
              { value: 'Storage', label: 'Storage' }, { value: 'Medical', label: 'Medical' }, { value: 'Restaurant', label: 'Restaurant' }, { value: 'Flex', label: 'Flex Space' }
            ]} />
            <Select label="Status" value={unitFormData.status} onChange={(e) => setUnitFormData({ ...unitFormData, status: e.target.value })} options={[
              { value: 'vacant', label: 'Vacant' }, { value: 'occupied', label: 'Occupied' }, { value: 'renovation', label: 'Under Renovation' }, { value: 'unavailable', label: 'Unavailable' }
            ]} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Features/Amenities</label>
            <div className="flex gap-2 mb-2">
              <input type="text" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addFeature()} placeholder="Add a feature..." className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500" />
              <Button variant="secondary" size="sm" onClick={addFeature}>Add</Button>
            </div>
            {unitFormData.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {unitFormData.features.map((feature, index) => (
                  <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-sm">
                    {feature}
                    <button onClick={() => removeFeature(index)} className="text-slate-400 hover:text-slate-600"><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button variant="secondary" onClick={() => { setShowUnitModal(false); setEditingUnit(null); }}>Cancel</Button>
            <Button onClick={handleUnitSubmit}>{editingUnit ? 'Save Changes' : 'Add Unit'}</Button>
          </div>
        </div>
      </Modal>

      {/* Add/Edit Lease Modal */}
      <Modal isOpen={showLeaseModal} onClose={() => { setShowLeaseModal(false); setEditingLease(null); resetLeaseForm(); }} title={editingLease ? 'Edit Lease' : 'New Lease'} size="lg">
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {!editingLease && !selectedTenantId ? (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Select Tenant</h3>
              {tenantsWithoutLease.length === 0 ? (
                <div className="text-center py-8 bg-slate-50 rounded-lg">
                  <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-600 font-medium">No available tenants</p>
                  <p className="text-xs text-slate-500 mt-1">All tenants in this property already have leases</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {tenantsWithoutLease.map(tenant => {
                    const unit = selectedProperty.units?.find(u => u.id === tenant.unitId);
                    return (
                      <button key={tenant.id} onClick={() => setSelectedTenantId(tenant.id)} className="w-full p-3 text-left bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                        <div className="font-medium text-slate-900">{tenant.name}</div>
                        <div className="text-sm text-slate-500">{unit?.name}</div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Tenant Info Header */}
              <div className="flex items-center gap-3 p-3 bg-slate-100 rounded-lg">
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{selectedTenant?.name}</p>
                  <p className="text-xs text-slate-500">{selectedProperty.units?.find(u => u.id === selectedTenant?.unitId)?.name}</p>
                </div>
                {!editingLease && <button onClick={() => setSelectedTenantId(null)} className="text-xs text-slate-500 hover:text-slate-700">Change</button>}
              </div>

              {/* Lease Dates */}
              <div className="grid grid-cols-2 gap-4">
                <Input label="Start Date" type="date" value={leaseFormData.startDate} onChange={(e) => setLeaseFormData({ ...leaseFormData, startDate: e.target.value })} />
                <Input label="End Date" type="date" value={leaseFormData.endDate} onChange={(e) => setLeaseFormData({ ...leaseFormData, endDate: e.target.value })} />
              </div>

              {/* Terms */}
              <div className="grid grid-cols-2 gap-4">
                <Input label="Security Deposit" type="number" icon={DollarSign} value={leaseFormData.securityDeposit} onChange={(e) => setLeaseFormData({ ...leaseFormData, securityDeposit: e.target.value })} />
                <div className="grid grid-cols-2 gap-2">
                  <Input label="Rent Due Day" type="number" min="1" max="28" value={leaseFormData.rentDueDay} onChange={(e) => setLeaseFormData({ ...leaseFormData, rentDueDay: e.target.value })} />
                  <Input label="Late After Day" type="number" min="1" max="28" value={leaseFormData.lateAfterDay} onChange={(e) => setLeaseFormData({ ...leaseFormData, lateAfterDay: e.target.value })} />
                </div>
              </div>

              {/* Late Charge */}
              <div className="grid grid-cols-2 gap-4">
                <Select label="Late Charge Type" value={leaseFormData.lateChargeType} onChange={(e) => setLeaseFormData({ ...leaseFormData, lateChargeType: e.target.value })} options={[
                  { value: 'percentage', label: 'Percentage of Rent' }, { value: 'flat', label: 'Flat Fee' }
                ]} />
                <Input label={leaseFormData.lateChargeType === 'percentage' ? 'Percentage' : 'Amount'} type="number" value={leaseFormData.lateChargeAmount} onChange={(e) => setLeaseFormData({ ...leaseFormData, lateChargeAmount: e.target.value })} />
              </div>

              {/* Rent Schedule */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-900">Rent Schedule</h3>
                  <Button size="sm" icon={Plus} onClick={addRentPeriod} disabled={editingRentPeriod !== null}>Add Period</Button>
                </div>
                
                {leaseFormData.rentSchedule.length === 0 && editingRentPeriod === null ? (
                  <div className="text-center py-6 bg-slate-50 rounded-lg text-sm text-slate-500">No rent periods added yet</div>
                ) : (
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm table-fixed">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="text-left px-3 py-2 text-xs font-medium text-slate-500">Lease Term</th>
                          <th className="text-right px-3 py-2 text-xs font-medium text-slate-500 w-28">Rent</th>
                          <th className="text-right px-3 py-2 text-xs font-medium text-slate-500 w-24">Change</th>
                          <th className="w-20 px-3 py-2"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {leaseFormData.rentSchedule.map((period, index) => {
                          const isEditing = editingRentPeriod === index;
                          const rentChange = getRentChange(leaseFormData.rentSchedule, index);
                          
                          if (isEditing) {
                            return (
                              <tr key={index} className="bg-amber-50">
                                <td className="px-3 py-2.5">
                                  <div className="flex items-center gap-2">
                                    <input type="date" value={rentPeriodForm.startDate} onChange={(e) => setRentPeriodForm({ ...rentPeriodForm, startDate: e.target.value })} className="px-2 py-1 text-sm bg-white border border-slate-300 rounded" />
                                    <span className="text-slate-400">-</span>
                                    <input type="date" value={rentPeriodForm.endDate} onChange={(e) => setRentPeriodForm({ ...rentPeriodForm, endDate: e.target.value })} className="px-2 py-1 text-sm bg-white border border-slate-300 rounded" />
                                  </div>
                                </td>
                                <td className="px-3 py-2.5" colSpan={2}>
                                  <div className="relative">
                                    <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                    <input type="number" value={rentPeriodForm.monthlyRent} onChange={(e) => setRentPeriodForm({ ...rentPeriodForm, monthlyRent: e.target.value })} className="w-full pl-7 pr-2 py-1 text-sm text-right bg-white border border-slate-300 rounded" />
                                  </div>
                                </td>
                                <td className="px-3 py-2.5 text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <button onClick={saveRentPeriod} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"><Check className="w-3.5 h-3.5" /></button>
                                    <button onClick={cancelRentPeriod} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded"><X className="w-3.5 h-3.5" /></button>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                          
                          return (
                            <tr key={index} className="hover:bg-slate-50">
                              <td className="px-3 py-2.5 text-slate-600">{formatDate(period.startDate)} - {formatDate(period.endDate)}</td>
                              <td className="px-3 py-2.5 text-right">
                                <span className="font-medium text-slate-900 tabular-nums">{formatCurrency(period.monthlyRent)}</span>
                              </td>
                              <td className="px-3 py-2.5 text-right">
                                <span className={`text-xs tabular-nums ${rentChange !== null ? (rentChange >= 0 ? 'text-emerald-600' : 'text-rose-600') : 'text-slate-300'}`}>
                                  {rentChange !== null ? `${rentChange >= 0 ? '+' : ''}${formatCurrency(rentChange)}` : '—'}
                                </span>
                              </td>
                              <td className="px-3 py-2.5 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button onClick={() => editRentPeriod(index)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded"><Edit2 className="w-3.5 h-3.5" /></button>
                                  <button onClick={() => removeRentPeriod(index)} className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                        {editingRentPeriod === 'new' && (
                          <tr className="bg-amber-50">
                            <td className="px-3 py-2.5">
                              <div className="flex items-center gap-2">
                                <input type="date" value={rentPeriodForm.startDate} onChange={(e) => setRentPeriodForm({ ...rentPeriodForm, startDate: e.target.value })} className="px-2 py-1 text-sm bg-white border border-slate-300 rounded" />
                                <span className="text-slate-400">-</span>
                                <input type="date" value={rentPeriodForm.endDate} onChange={(e) => setRentPeriodForm({ ...rentPeriodForm, endDate: e.target.value })} className="px-2 py-1 text-sm bg-white border border-slate-300 rounded" />
                              </div>
                            </td>
                            <td className="px-3 py-2.5" colSpan={2}>
                              <div className="relative">
                                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                <input type="number" value={rentPeriodForm.monthlyRent} onChange={(e) => setRentPeriodForm({ ...rentPeriodForm, monthlyRent: e.target.value })} className="w-full pl-7 pr-2 py-1 text-sm text-right bg-white border border-slate-300 rounded" />
                              </div>
                            </td>
                            <td className="px-3 py-2.5 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button onClick={saveRentPeriod} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"><Check className="w-3.5 h-3.5" /></button>
                                <button onClick={cancelRentPeriod} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded"><X className="w-3.5 h-3.5" /></button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Recurring Charges */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-900">Recurring Monthly Charges</h3>
                  <Button size="sm" icon={Plus} onClick={addRecurringCharge} disabled={editingCharge !== null}>Add Charge</Button>
                </div>
                
                {(leaseFormData.recurringCharges || []).length === 0 && editingCharge === null ? (
                  <div className="text-center py-6 bg-slate-50 rounded-lg text-sm text-slate-500">No recurring charges</div>
                ) : (
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm table-fixed">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="text-left px-3 py-2 text-xs font-medium text-slate-500 w-28">Type</th>
                          <th className="text-left px-3 py-2 text-xs font-medium text-slate-500">Description</th>
                          <th className="text-right px-3 py-2 text-xs font-medium text-slate-500 w-28">Amount</th>
                          <th className="w-20 px-3 py-2"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {(leaseFormData.recurringCharges || []).map((charge, index) => {
                          const isEditing = editingCharge === index;
                          
                          if (isEditing) {
                            return (
                              <tr key={index} className="bg-amber-50">
                                <td className="px-3 py-2.5">
                                  <select value={chargeForm.type} onChange={(e) => setChargeForm({ ...chargeForm, type: e.target.value })} className="w-full px-2 py-1 text-sm bg-white border border-slate-300 rounded">
                                    <option value="CAM">CAM</option><option value="Utilities">Utilities</option><option value="Maintenance">Maintenance</option>
                                    <option value="Management">Management</option><option value="Insurance">Insurance</option><option value="Other">Other</option>
                                  </select>
                                </td>
                                <td className="px-3 py-2.5">
                                  <input type="text" value={chargeForm.description} onChange={(e) => setChargeForm({ ...chargeForm, description: e.target.value })} placeholder="Description" className="w-full px-2 py-1 text-sm bg-white border border-slate-300 rounded" />
                                </td>
                                <td className="px-3 py-2.5">
                                  <div className="relative">
                                    <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                    <input type="number" value={chargeForm.amount} onChange={(e) => setChargeForm({ ...chargeForm, amount: e.target.value })} className="w-full pl-7 pr-2 py-1 text-sm text-right bg-white border border-slate-300 rounded" />
                                  </div>
                                </td>
                                <td className="px-3 py-2.5 text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <button onClick={saveRecurringCharge} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"><Check className="w-3.5 h-3.5" /></button>
                                    <button onClick={cancelRecurringCharge} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded"><X className="w-3.5 h-3.5" /></button>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                          
                          return (
                            <tr key={index} className="hover:bg-slate-50">
                              <td className="px-3 py-2.5"><Badge variant="default">{charge.type}</Badge></td>
                              <td className="px-3 py-2.5 text-slate-600">{charge.description}</td>
                              <td className="px-3 py-2.5 text-right tabular-nums font-medium text-slate-900">{formatCurrency(charge.amount)}</td>
                              <td className="px-3 py-2.5 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button onClick={() => editRecurringCharge(index)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded"><Edit2 className="w-3.5 h-3.5" /></button>
                                  <button onClick={() => removeRecurringCharge(index)} className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                        {editingCharge === 'new' && (
                          <tr className="bg-amber-50">
                            <td className="px-3 py-2.5">
                              <select value={chargeForm.type} onChange={(e) => setChargeForm({ ...chargeForm, type: e.target.value })} className="w-full px-2 py-1 text-sm bg-white border border-slate-300 rounded">
                                <option value="CAM">CAM</option><option value="Utilities">Utilities</option><option value="Maintenance">Maintenance</option>
                                <option value="Management">Management</option><option value="Insurance">Insurance</option><option value="Other">Other</option>
                              </select>
                            </td>
                            <td className="px-3 py-2.5">
                              <input type="text" value={chargeForm.description} onChange={(e) => setChargeForm({ ...chargeForm, description: e.target.value })} placeholder="Description" className="w-full px-2 py-1 text-sm bg-white border border-slate-300 rounded" />
                            </td>
                            <td className="px-3 py-2.5">
                              <div className="relative">
                                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                <input type="number" value={chargeForm.amount} onChange={(e) => setChargeForm({ ...chargeForm, amount: e.target.value })} className="w-full pl-7 pr-2 py-1 text-sm text-right bg-white border border-slate-300 rounded" />
                              </div>
                            </td>
                            <td className="px-3 py-2.5 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button onClick={saveRecurringCharge} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"><Check className="w-3.5 h-3.5" /></button>
                                <button onClick={cancelRecurringCharge} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded"><X className="w-3.5 h-3.5" /></button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {(editingLease || selectedTenantId) && (
          <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-200">
            <Button variant="secondary" onClick={() => { setShowLeaseModal(false); setEditingLease(null); resetLeaseForm(); }}>Cancel</Button>
            <Button onClick={handleLeaseSubmit}>{editingLease ? 'Save Changes' : 'Create Lease'}</Button>
          </div>
        )}
      </Modal>

      {/* Add/Edit Property Expense Modal */}
      <Modal isOpen={showExpenseModal} onClose={() => { setShowExpenseModal(false); setEditingExpense(null); }} title={editingExpense ? 'Edit Expense' : 'Add Property Expense'}>
        <div className="space-y-4">
          <Select label="Expense Type" value={expenseFormData.type} onChange={(e) => setExpenseFormData({ ...expenseFormData, type: e.target.value })} options={[
            { value: 'Property Tax', label: 'Property Tax' },
            { value: 'Insurance', label: 'Insurance' },
            { value: 'Mortgage', label: 'Mortgage/Loan Payment' },
            { value: 'Property Management', label: 'Property Management' },
            { value: 'Utilities', label: 'Common Area Utilities' },
            { value: 'Maintenance', label: 'Maintenance Reserve' },
            { value: 'Landscaping', label: 'Landscaping' },
            { value: 'Security', label: 'Security' },
            { value: 'Other', label: 'Other' }
          ]} />
          <Input label="Monthly Amount" type="number" icon={DollarSign} value={expenseFormData.amount} onChange={(e) => setExpenseFormData({ ...expenseFormData, amount: e.target.value })} />
          
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button variant="secondary" onClick={() => { setShowExpenseModal(false); setEditingExpense(null); }}>Cancel</Button>
            <Button onClick={handleExpenseSubmit}>{editingExpense ? 'Save Changes' : 'Add Expense'}</Button>
          </div>
        </div>
      </Modal>

      {/* Delete Property Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => { setShowDeleteModal(false); setDeletingProperty(null); }} title="Delete Property" size="sm">
        <div className="space-y-4">
          {deletingProperty?.hasTenantsError ? (
            <>
              <div className="flex items-center gap-3 p-3 bg-rose-50 border border-rose-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <p className="text-sm text-rose-700">Cannot delete <span className="font-semibold">{deletingProperty.name}</span>. It has {deletingProperty.tenantCount} active tenant(s).</p>
              </div>
              <div className="flex justify-end">
                <Button variant="secondary" onClick={() => { setShowDeleteModal(false); setDeletingProperty(null); }}>Close</Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-slate-600">Are you sure you want to delete <span className="font-semibold text-slate-900">{deletingProperty?.name}</span>? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => { setShowDeleteModal(false); setDeletingProperty(null); }}>Cancel</Button>
                <Button variant="danger" onClick={confirmDelete}>Delete Property</Button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Delete Unit Confirmation Modal */}
      <Modal isOpen={showDeleteUnitModal} onClose={() => { setShowDeleteUnitModal(false); setDeletingUnit(null); }} title="Delete Unit" size="sm">
        <div className="space-y-4">
          {deletingUnit?.hasTenantError ? (
            <>
              <div className="flex items-center gap-3 p-3 bg-rose-50 border border-rose-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <p className="text-sm text-rose-700">Cannot delete <span className="font-semibold">{deletingUnit.unitName}</span>. It has an active tenant.</p>
              </div>
              <div className="flex justify-end">
                <Button variant="secondary" onClick={() => { setShowDeleteUnitModal(false); setDeletingUnit(null); }}>Close</Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-slate-600">Are you sure you want to delete <span className="font-semibold text-slate-900">{deletingUnit?.unitName}</span>? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => { setShowDeleteUnitModal(false); setDeletingUnit(null); }}>Cancel</Button>
                <Button variant="danger" onClick={confirmDeleteUnit}>Delete Unit</Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

// ============================================
// OWNERS VIEW
// ============================================
const OwnersView = ({ owners, setOwners, properties }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingOwner, setEditingOwner] = useState(null);
  const [deletingOwner, setDeletingOwner] = useState(null);
  const [formData, setFormData] = useState({
    name: '', contact: '', email: '', phone: '', type: 'LLC'
  });

  const filteredOwners = owners.filter(o =>
    o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    if (editingOwner) {
      setOwners(owners.map(o => o.id === editingOwner.id ? { ...o, ...formData } : o));
    } else {
      setOwners([...owners, { ...formData, id: generateId() }]);
    }
    setShowAddModal(false);
    setEditingOwner(null);
    setFormData({ name: '', contact: '', email: '', phone: '', type: 'LLC' });
  };

  const handleEdit = (owner) => {
    setFormData(owner);
    setEditingOwner(owner);
    setShowAddModal(true);
  };

  const handleDelete = (owner) => {
    const ownerProperties = properties.filter(p => p.owners?.some(o => o.ownerId === owner.id));
    if (ownerProperties.length > 0) {
      setDeletingOwner({ ...owner, hasPropertiesError: true, propertyCount: ownerProperties.length });
      setShowDeleteModal(true);
      return;
    }
    setDeletingOwner(owner);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingOwner && !deletingOwner.hasPropertiesError) {
      setOwners(owners.filter(o => o.id !== deletingOwner.id));
    }
    setShowDeleteModal(false);
    setDeletingOwner(null);
  };

  const getOwnerProperties = (ownerId) => {
    return properties.filter(p => p.owners?.some(o => o.ownerId === ownerId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Owners</h1>
          <p className="mt-1 text-slate-500">{owners.length} property owners</p>
        </div>
        <Button icon={Plus} onClick={() => setShowAddModal(true)}>Add Owner</Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-md">
          <Input
            icon={Search}
            placeholder="Search owners..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <div className="divide-y divide-slate-100">
          {filteredOwners.map((owner) => {
            const ownerProperties = getOwnerProperties(owner.id);
            
            return (
              <div key={owner.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-slate-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-semibold text-slate-900">{owner.name}</h3>
                      <Badge variant="default">{owner.type}</Badge>
                    </div>
                    <p className="mt-0.5 text-sm text-slate-500">{owner.contact}</p>
                    <div className="mt-2 flex items-center gap-6 text-sm">
                      <span className="text-slate-600 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {owner.email}
                      </span>
                      <span className="text-slate-600 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {owner.phone}
                      </span>
                      <span className="text-slate-600">
                        <span className="font-medium">{ownerProperties.length}</span>
                        <span className="text-slate-400"> {ownerProperties.length === 1 ? 'property' : 'properties'}</span>
                      </span>
                    </div>
                    {ownerProperties.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {ownerProperties.slice(0, 3).map(p => {
                          const ownership = p.owners.find(o => o.ownerId === owner.id);
                          return (
                            <span key={p.id} className="inline-flex items-center px-2 py-0.5 bg-slate-100 rounded text-xs text-slate-600">
                              {p.name} <span className="ml-1 text-slate-400">({ownership?.percentage}%)</span>
                            </span>
                          );
                        })}
                        {ownerProperties.length > 3 && (
                          <span className="text-xs text-slate-400">+{ownerProperties.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(owner)}
                      title="Edit owner"
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(owner)}
                      title="Delete owner"
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {filteredOwners.length === 0 && (
        <EmptyState
          icon={Users}
          title="No owners found"
          description={searchQuery ? "Try adjusting your search terms" : "Add your first owner to get started"}
          action={!searchQuery && <Button icon={Plus} onClick={() => setShowAddModal(true)}>Add Owner</Button>}
        />
      )}

      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); setEditingOwner(null); }} title={editingOwner ? 'Edit Owner' : 'Add Owner'}>
        <div className="space-y-4">
          <Input label="Owner Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Pacific Investments LLC" />
          <Select label="Owner Type" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} options={[
            { value: 'Individual', label: 'Individual' },
            { value: 'LLC', label: 'LLC' },
            { value: 'Corporation', label: 'Corporation' },
            { value: 'Partnership', label: 'Partnership' },
            { value: 'Trust', label: 'Trust' },
            { value: 'REIT', label: 'REIT' }
          ]} />
          <Input label="Primary Contact" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} placeholder="John Smith" />
          <Input label="Email" type="email" icon={Mail} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@company.com" />
          <Input label="Phone" icon={Phone} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="(555) 555-5555" />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button variant="secondary" onClick={() => { setShowAddModal(false); setEditingOwner(null); }}>Cancel</Button>
            <Button onClick={handleSubmit}>{editingOwner ? 'Save Changes' : 'Add Owner'}</Button>
          </div>
        </div>
      </Modal>

      {/* Delete Owner Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => { setShowDeleteModal(false); setDeletingOwner(null); }} title="Delete Owner" size="sm">
        <div className="space-y-4">
          {deletingOwner?.hasPropertiesError ? (
            <>
              <div className="flex items-center gap-3 p-3 bg-rose-50 border border-rose-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <p className="text-sm text-rose-700">
                  Cannot delete <span className="font-semibold">{deletingOwner.name}</span>. They are associated with {deletingOwner.propertyCount} property(ies).
                </p>
              </div>
              <div className="flex justify-end">
                <Button variant="secondary" onClick={() => { setShowDeleteModal(false); setDeletingOwner(null); }}>Close</Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-slate-600">
                Are you sure you want to delete <span className="font-semibold text-slate-900">{deletingOwner?.name}</span>? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => { setShowDeleteModal(false); setDeletingOwner(null); }}>Cancel</Button>
                <Button variant="danger" onClick={confirmDelete}>Delete Owner</Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

// ============================================
// TENANTS VIEW
// ============================================
const TenantsView = ({ tenants, setTenants, properties }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);
  const [formData, setFormData] = useState({
    name: '', contact: '', email: '', phone: '', propertyId: '', unitId: '', status: 'active'
  });

  const filteredTenants = tenants.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    if (editingTenant) {
      setTenants(tenants.map(t => t.id === editingTenant.id ? { ...t, ...formData } : t));
    } else {
      setTenants([...tenants, { ...formData, id: generateId() }]);
    }
    setShowAddModal(false);
    setEditingTenant(null);
    setFormData({ name: '', contact: '', email: '', phone: '', propertyId: '', unitId: '', status: 'active' });
  };

  const handleEdit = (tenant) => {
    setFormData(tenant);
    setEditingTenant(tenant);
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this tenant?')) {
      setTenants(tenants.filter(t => t.id !== id));
    }
  };

  const getUnit = (propertyId, unitId) => {
    const property = properties.find(p => p.id === propertyId);
    return property?.units?.find(u => u.id === unitId);
  };

  const getAvailableUnits = (propertyId) => {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return [];
    
    return property.units?.filter(u => {
      // Unit is available if no active tenant or if editing current tenant's unit
      const tenant = tenants.find(t => t.propertyId === propertyId && t.unitId === u.id && t.status === 'active');
      return !tenant || (editingTenant && tenant.id === editingTenant.id);
    }) || [];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Tenants</h1>
          <p className="mt-1 text-slate-500">{tenants.length} tenants across all properties</p>
        </div>
        <Button icon={Plus} onClick={() => setShowAddModal(true)}>Add Tenant</Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-md">
          <Input
            icon={Search}
            placeholder="Search tenants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Tenant</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Property / Unit</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Contact</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTenants.map((tenant) => {
                const property = properties.find(p => p.id === tenant.propertyId);
                const unit = getUnit(tenant.propertyId, tenant.unitId);
                return (
                  <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                          <Building className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{tenant.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900">{property?.name || 'Unknown'}</p>
                      <p className="text-xs text-slate-500">{unit?.name || 'Unknown unit'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900">{tenant.contact}</p>
                      <p className="text-xs text-slate-500">{tenant.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={tenant.status === 'active' ? 'success' : 'default'}>{tenant.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEdit(tenant)}
                          title="Edit tenant"
                          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(tenant.id)}
                          title="Delete tenant"
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredTenants.length === 0 && (
        <EmptyState
          icon={Users}
          title="No tenants found"
          description={searchQuery ? "Try adjusting your search terms" : "Add your first tenant to get started"}
          action={!searchQuery && <Button icon={Plus} onClick={() => setShowAddModal(true)}>Add Tenant</Button>}
        />
      )}

      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); setEditingTenant(null); }} title={editingTenant ? 'Edit Tenant' : 'Add Tenant'}>
        <div className="space-y-4">
          <Input label="Company Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Acme Corporation" />
          <Input label="Primary Contact" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} placeholder="John Smith" />
          <Input label="Email" type="email" icon={Mail} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@acme.com" />
          <Input label="Phone" icon={Phone} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="(555) 555-5555" />
          <Select 
            label="Property" 
            value={formData.propertyId} 
            onChange={(e) => setFormData({ ...formData, propertyId: e.target.value, unitId: '' })} 
            options={[
              { value: '', label: 'Select a property' },
              ...properties.map(p => ({ value: p.id, label: p.name }))
            ]} 
          />
          <Select 
            label="Unit" 
            value={formData.unitId} 
            onChange={(e) => setFormData({ ...formData, unitId: e.target.value })} 
            options={[
              { value: '', label: formData.propertyId ? 'Select a unit' : 'Select property first' },
              ...getAvailableUnits(formData.propertyId).map(u => ({ 
                value: u.id, 
                label: `${u.name} (${u.sqft?.toLocaleString()} sq ft)` 
              }))
            ]} 
          />
          <Select 
            label="Status" 
            value={formData.status} 
            onChange={(e) => setFormData({ ...formData, status: e.target.value })} 
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]} 
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button variant="secondary" onClick={() => { setShowAddModal(false); setEditingTenant(null); }}>Cancel</Button>
            <Button onClick={handleSubmit}>{editingTenant ? 'Save Changes' : 'Add Tenant'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ============================================
// LEASES VIEW
// ============================================
const LeasesView = ({ leases, setLeases, tenants, properties }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLease, setEditingLease] = useState(null);
  const [expandedLease, setExpandedLease] = useState(null);
  const [selectedTenantId, setSelectedTenantId] = useState(null);
  const [formData, setFormData] = useState({
    startDate: '', 
    endDate: '', 
    securityDeposit: '', 
    rentDueDay: '1',
    lateAfterDay: '5',
    lateChargeType: 'percentage',
    lateChargeAmount: '5',
    rentSchedule: [],
    recurringCharges: [],
    status: 'active'
  });

  const resetForm = () => {
    setSelectedTenantId(null);
    setEditingRentPeriod(null);
    setRentPeriodForm({ startDate: '', endDate: '', monthlyRent: '' });
    setEditingCharge(null);
    setChargeForm({ type: 'CAM', description: '', amount: '' });
    setFormData({
      startDate: '', 
      endDate: '', 
      securityDeposit: '', 
      rentDueDay: '1',
      lateAfterDay: '5',
      lateChargeType: 'percentage',
      lateChargeAmount: '5',
      rentSchedule: [],
      recurringCharges: [],
      status: 'active'
    });
  };

  // Get tenants that don't already have a lease
  const tenantsWithoutLease = tenants.filter(t => 
    t.status === 'active' && !leases.some(l => l.tenantId === t.id)
  );

  const selectedTenant = tenants.find(t => t.id === selectedTenantId);
  const selectedProperty = selectedTenant ? properties.find(p => p.id === selectedTenant.propertyId) : null;
  const selectedUnit = selectedProperty?.units?.find(u => u.id === selectedTenant?.unitId);

  const handleSubmit = () => {
    const leaseData = {
      ...formData,
      tenantId: selectedTenantId,
      propertyId: selectedTenant?.propertyId,
      unitId: selectedTenant?.unitId,
      securityDeposit: parseFloat(formData.securityDeposit) || 0,
      rentDueDay: parseInt(formData.rentDueDay) || 1,
      lateAfterDay: parseInt(formData.lateAfterDay) || 5,
      lateChargeAmount: parseFloat(formData.lateChargeAmount) || 0,
      rentSchedule: formData.rentSchedule.map(rs => ({
        ...rs,
        monthlyRent: parseFloat(rs.monthlyRent) || 0
      })),
      recurringCharges: (formData.recurringCharges || []).map(rc => ({
        ...rc,
        amount: parseFloat(rc.amount) || 0
      }))
    };

    if (editingLease) {
      setLeases(leases.map(l => l.id === editingLease.id ? { ...l, ...leaseData } : l));
    } else {
      setLeases([...leases, { ...leaseData, id: generateId() }]);
    }
    setShowAddModal(false);
    setEditingLease(null);
    resetForm();
  };

  const handleEdit = (lease) => {
    setSelectedTenantId(lease.tenantId);
    setEditingRentPeriod(null);
    setRentPeriodForm({ startDate: '', endDate: '', monthlyRent: '' });
    setEditingCharge(null);
    setChargeForm({ type: 'CAM', description: '', amount: '' });
    setFormData({ 
      startDate: lease.startDate || '',
      endDate: lease.endDate || '',
      securityDeposit: lease.securityDeposit?.toString() || '',
      rentDueDay: lease.rentDueDay?.toString() || '1',
      lateAfterDay: lease.lateAfterDay?.toString() || '5',
      lateChargeType: lease.lateChargeType || 'percentage',
      lateChargeAmount: lease.lateChargeAmount?.toString() || '5',
      rentSchedule: lease.rentSchedule || [],
      recurringCharges: lease.recurringCharges || [],
      status: lease.status || 'active'
    });
    setEditingLease(lease);
    setShowAddModal(true);
  };

  const getUnit = (propertyId, unitId) => {
    const property = properties.find(p => p.id === propertyId);
    return property?.units?.find(u => u.id === unitId);
  };

  // Get current monthly rent based on today's date
  const getCurrentRent = (lease) => {
    const today = new Date();
    const currentPeriod = lease.rentSchedule?.find(rs => {
      const start = new Date(rs.startDate);
      const end = new Date(rs.endDate);
      return today >= start && today <= end;
    });
    return currentPeriod?.monthlyRent || lease.rentSchedule?.[0]?.monthlyRent || 0;
  };

  // Rent schedule management
  const [editingRentPeriod, setEditingRentPeriod] = useState(null);
  const [rentPeriodForm, setRentPeriodForm] = useState({ startDate: '', endDate: '', monthlyRent: '' });
  
  // Recurring charges management
  const [editingCharge, setEditingCharge] = useState(null);
  const [chargeForm, setChargeForm] = useState({ type: 'CAM', description: '', amount: '' });

  const addRentPeriod = () => {
    const lastPeriod = formData.rentSchedule[formData.rentSchedule.length - 1];
    const newStart = lastPeriod 
      ? new Date(new Date(lastPeriod.endDate).getTime() + 86400000).toISOString().split('T')[0]
      : formData.startDate || new Date().toISOString().split('T')[0];
    
    const newEnd = new Date(new Date(newStart).setFullYear(new Date(newStart).getFullYear() + 1) - 86400000).toISOString().split('T')[0];
    const lastRent = lastPeriod?.monthlyRent?.toString() || '';
    
    setRentPeriodForm({ startDate: newStart, endDate: newEnd, monthlyRent: lastRent });
    setEditingRentPeriod('new');
  };

  const editRentPeriod = (index) => {
    const period = formData.rentSchedule[index];
    setRentPeriodForm({ 
      startDate: period.startDate, 
      endDate: period.endDate, 
      monthlyRent: period.monthlyRent?.toString() || '' 
    });
    setEditingRentPeriod(index);
  };

  const saveRentPeriod = () => {
    if (editingRentPeriod === 'new') {
      setFormData({
        ...formData,
        rentSchedule: [...formData.rentSchedule, { ...rentPeriodForm, monthlyRent: parseFloat(rentPeriodForm.monthlyRent) || 0 }]
      });
    } else {
      const newSchedule = [...formData.rentSchedule];
      newSchedule[editingRentPeriod] = { ...rentPeriodForm, monthlyRent: parseFloat(rentPeriodForm.monthlyRent) || 0 };
      setFormData({ ...formData, rentSchedule: newSchedule });
    }
    setEditingRentPeriod(null);
    setRentPeriodForm({ startDate: '', endDate: '', monthlyRent: '' });
  };

  const cancelRentPeriod = () => {
    setEditingRentPeriod(null);
    setRentPeriodForm({ startDate: '', endDate: '', monthlyRent: '' });
  };

  const removeRentPeriod = (index) => {
    setFormData({
      ...formData,
      rentSchedule: formData.rentSchedule.filter((_, i) => i !== index)
    });
  };

  // Recurring charges functions
  const addRecurringCharge = () => {
    setChargeForm({ type: 'CAM', description: '', amount: '' });
    setEditingCharge('new');
  };

  const editRecurringCharge = (index) => {
    const charge = formData.recurringCharges[index];
    setChargeForm({ 
      type: charge.type, 
      description: charge.description, 
      amount: charge.amount?.toString() || '' 
    });
    setEditingCharge(index);
  };

  const saveRecurringCharge = () => {
    const chargeData = { 
      ...chargeForm, 
      id: editingCharge === 'new' ? generateId() : formData.recurringCharges[editingCharge]?.id,
      amount: parseFloat(chargeForm.amount) || 0 
    };
    
    if (editingCharge === 'new') {
      setFormData({
        ...formData,
        recurringCharges: [...(formData.recurringCharges || []), chargeData]
      });
    } else {
      const newCharges = [...(formData.recurringCharges || [])];
      newCharges[editingCharge] = chargeData;
      setFormData({ ...formData, recurringCharges: newCharges });
    }
    setEditingCharge(null);
    setChargeForm({ type: 'CAM', description: '', amount: '' });
  };

  const cancelRecurringCharge = () => {
    setEditingCharge(null);
    setChargeForm({ type: 'CAM', description: '', amount: '' });
  };

  const removeRecurringCharge = (index) => {
    setFormData({
      ...formData,
      recurringCharges: (formData.recurringCharges || []).filter((_, i) => i !== index)
    });
  };

  // Calculate rent change from previous period (in dollars)
  const getRentChange = (schedule, index) => {
    if (index === 0) return null;
    const current = parseFloat(schedule[index].monthlyRent) || 0;
    const previous = parseFloat(schedule[index - 1].monthlyRent) || 0;
    if (previous === 0) return null;
    const change = current - previous;
    return change;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Leases</h1>
          <p className="mt-1 text-slate-500">{leases.length} active lease agreements</p>
        </div>
        <Button icon={Plus} onClick={() => { resetForm(); setShowAddModal(true); }}>New Lease</Button>
      </div>

      <Card>
        <div className="divide-y divide-slate-100">
          {leases.map((lease) => {
            const tenant = tenants.find(t => t.id === lease.tenantId);
            const property = properties.find(p => p.id === lease.propertyId);
            const unit = getUnit(lease.propertyId, lease.unitId);
            const daysUntilExpiry = Math.ceil((new Date(lease.endDate) - new Date()) / (1000 * 60 * 60 * 24));
            const currentRent = getCurrentRent(lease);
            const recurringTotal = (lease.recurringCharges || []).reduce((sum, rc) => sum + rc.amount, 0);
            const totalMonthly = currentRent + recurringTotal;
            const isExpanded = expandedLease === lease.id;

            return (
              <div key={lease.id}>
                <div className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => setExpandedLease(isExpanded ? null : lease.id)}
                      className="mt-1 p-1 hover:bg-slate-200 rounded transition-colors"
                    >
                      <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="text-base font-semibold text-slate-900">{tenant?.name || 'Unknown Tenant'}</h3>
                        <Badge variant={daysUntilExpiry < 90 ? 'warning' : 'success'}>
                          {daysUntilExpiry < 90 ? `${daysUntilExpiry} days left` : 'Active'}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-sm text-slate-500">
                        {property?.name || 'Unknown'} • {unit?.name || 'Unknown unit'}
                      </p>
                      <div className="mt-2 flex items-center gap-6 text-sm">
                        <span className="text-slate-600">
                          <span className="font-medium">{formatCurrency(totalMonthly)}</span>
                          <span className="text-slate-400">/month</span>
                          {recurringTotal > 0 && (
                            <span className="text-slate-400 text-xs ml-1">(rent + charges)</span>
                          )}
                        </span>
                        <span className="text-slate-600">
                          {formatDate(lease.startDate)} - {formatDate(lease.endDate)}
                        </span>
                        <span className="text-slate-600">
                          Due: <span className="font-medium">{lease.rentDueDay || 1}{getOrdinalSuffix(lease.rentDueDay || 1)}</span>
                          <span className="text-slate-400"> • Late: {lease.lateAfterDay || 5}{getOrdinalSuffix(lease.lateAfterDay || 5)}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(lease)}
                        title="Edit lease"
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Lease Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 bg-white">
                    <div className="ml-9 border border-slate-200 rounded-lg bg-white overflow-hidden">
                      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                        <h4 className="text-sm font-semibold text-slate-700">Lease Abstract</h4>
                      </div>
                      
                      <div className="p-4 space-y-4">
                        {/* Key Terms */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-slate-500">Security Deposit</p>
                            <p className="text-sm font-medium text-slate-900">{formatCurrency(lease.securityDeposit)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Rent Due</p>
                            <p className="text-sm font-medium text-slate-900">{lease.rentDueDay || 1}{getOrdinalSuffix(lease.rentDueDay || 1)} of month</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Late After</p>
                            <p className="text-sm font-medium text-slate-900">{lease.lateAfterDay || 5}{getOrdinalSuffix(lease.lateAfterDay || 5)} of month</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Late Charge</p>
                            <p className="text-sm font-medium text-slate-900">
                              {lease.lateChargeType === 'percentage' 
                                ? `${lease.lateChargeAmount}% of rent`
                                : formatCurrency(lease.lateChargeAmount)}
                            </p>
                          </div>
                        </div>

                        {/* Rent Schedule */}
                        <div>
                          <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Rent Schedule</h5>
                          <div className="border border-slate-200 rounded-lg overflow-hidden">
                            <table className="w-full text-sm table-fixed">
                              <thead>
                                <tr className="bg-slate-50">
                                  <th className="text-left px-3 py-2 text-xs font-medium text-slate-500">Lease Term</th>
                                  <th className="text-right px-3 py-2 text-xs font-medium text-slate-500 w-28">Rent</th>
                                  <th className="text-right px-3 py-2 text-xs font-medium text-slate-500 w-24">Change</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {lease.rentSchedule?.map((period, idx) => {
                                  const today = new Date();
                                  const start = new Date(period.startDate);
                                  const end = new Date(period.endDate);
                                  const isCurrent = today >= start && today <= end;
                                  const rentChange = getRentChange(lease.rentSchedule, idx);
                                  return (
                                    <tr key={idx} className={isCurrent ? 'bg-emerald-50' : ''}>
                                      <td className="px-3 py-2">
                                        <span className={isCurrent ? 'font-medium text-emerald-700' : 'text-slate-600'}>
                                          {formatDate(period.startDate)} - {formatDate(period.endDate)}
                                        </span>
                                        {isCurrent && <Badge variant="success" className="ml-2">Current</Badge>}
                                      </td>
                                      <td className="px-3 py-2 text-right">
                                        <span className="font-medium text-slate-900 tabular-nums">{formatCurrency(period.monthlyRent)}</span>
                                      </td>
                                      <td className="px-3 py-2 text-right">
                                        <span className={`text-xs tabular-nums ${rentChange !== null ? (rentChange >= 0 ? 'text-emerald-600' : 'text-rose-600') : 'text-slate-300'}`}>
                                          {rentChange !== null ? `${rentChange >= 0 ? '+' : ''}${formatCurrency(rentChange)}` : '—'}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Recurring Charges */}
                        {(lease.recurringCharges || []).length > 0 && (
                          <div>
                            <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Recurring Monthly Charges</h5>
                            <div className="border border-slate-200 rounded-lg overflow-hidden">
                              <table className="w-full text-sm table-fixed">
                                <thead>
                                  <tr className="bg-slate-50">
                                    <th className="text-left px-3 py-2 text-xs font-medium text-slate-500 w-28">Type</th>
                                    <th className="text-left px-3 py-2 text-xs font-medium text-slate-500">Description</th>
                                    <th className="text-right px-3 py-2 text-xs font-medium text-slate-500 w-28">Amount</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                  {lease.recurringCharges.map((charge, idx) => (
                                    <tr key={idx}>
                                      <td className="px-3 py-2">
                                        <Badge variant="default">{charge.type}</Badge>
                                      </td>
                                      <td className="px-3 py-2 text-slate-600">{charge.description}</td>
                                      <td className="px-3 py-2 text-right tabular-nums font-medium text-slate-900">
                                        {formatCurrency(charge.amount)}
                                      </td>
                                    </tr>
                                  ))}
                                  <tr className="bg-slate-50">
                                    <td colSpan="2" className="px-3 py-2 text-xs font-medium text-slate-500 text-right">
                                      Total Recurring Charges
                                    </td>
                                    <td className="px-3 py-2 text-right tabular-nums font-semibold text-slate-900">
                                      {formatCurrency(recurringTotal)}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Monthly Summary */}
                        <div className="bg-slate-50 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">Total Monthly Charges</span>
                            <span className="text-lg font-semibold text-slate-900">{formatCurrency(totalMonthly)}</span>
                          </div>
                          <div className="mt-1 text-xs text-slate-500">
                            Rent ({formatCurrency(currentRent)}) + Recurring Charges ({formatCurrency(recurringTotal)})
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {leases.length === 0 && (
        <EmptyState
          icon={FileText}
          title="No leases found"
          description="Create your first lease to get started"
          action={<Button icon={Plus} onClick={() => { resetForm(); setShowAddModal(true); }}>New Lease</Button>}
        />
      )}

      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); setEditingLease(null); resetForm(); }} title={editingLease ? 'Edit Lease' : 'New Lease'} size="lg">
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {/* Fixed Tenant/Property/Unit Info */}
          {!editingLease && !selectedTenantId ? (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Select Tenant</h3>
              {tenantsWithoutLease.length === 0 ? (
                <div className="text-center py-8 bg-slate-50 rounded-lg">
                  <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-600 font-medium">No available tenants</p>
                  <p className="text-xs text-slate-500 mt-1">All active tenants already have leases, or there are no tenants assigned to units.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {tenantsWithoutLease.map(tenant => {
                    const property = properties.find(p => p.id === tenant.propertyId);
                    const unit = property?.units?.find(u => u.id === tenant.unitId);
                    return (
                      <button
                        key={tenant.id}
                        onClick={() => setSelectedTenantId(tenant.id)}
                        className="w-full flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-left"
                      >
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-slate-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{tenant.name}</p>
                          <p className="text-xs text-slate-500">{property?.name || 'Unknown'} • {unit?.name || 'Unknown unit'}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Fixed Info Header */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-slate-900">{selectedTenant?.name}</h3>
                    <p className="text-sm text-slate-500">{selectedTenant?.contactName} • {selectedTenant?.email}</p>
                  </div>
                  {!editingLease && (
                    <button
                      onClick={() => setSelectedTenantId(null)}
                      className="text-sm text-slate-500 hover:text-slate-700"
                    >
                      Change
                    </button>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{selectedProperty?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{selectedUnit?.name} ({selectedUnit?.sqft?.toLocaleString()} sq ft)</span>
                  </div>
                </div>
              </div>

              {/* Lease Term */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Lease Term</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Input label="Start Date" type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
                  <Input label="End Date" type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
                  <Input label="Security Deposit" type="number" icon={DollarSign} value={formData.securityDeposit} onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })} placeholder="10000" />
                </div>
              </div>

              {/* Payment Terms */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Payment Terms</h3>
                <div className="grid grid-cols-4 gap-4">
                  <Input label="Rent Due Day" type="number" min="1" max="31" value={formData.rentDueDay} onChange={(e) => setFormData({ ...formData, rentDueDay: e.target.value })} placeholder="1" />
                  <Input label="Late After Day" type="number" min="1" max="31" value={formData.lateAfterDay} onChange={(e) => setFormData({ ...formData, lateAfterDay: e.target.value })} placeholder="5" />
                  <Select label="Late Charge Type" value={formData.lateChargeType} onChange={(e) => setFormData({ ...formData, lateChargeType: e.target.value })} options={[
                    { value: 'percentage', label: 'Percentage of Rent' },
                    { value: 'flat', label: 'Flat Amount' }
                  ]} />
                  <Input 
                    label={formData.lateChargeType === 'percentage' ? 'Late Charge %' : 'Late Charge Amount'} 
                    type="number" 
                    icon={formData.lateChargeType === 'flat' ? DollarSign : null}
                    value={formData.lateChargeAmount} 
                    onChange={(e) => setFormData({ ...formData, lateChargeAmount: e.target.value })} 
                    placeholder={formData.lateChargeType === 'percentage' ? '5' : '250'} 
                  />
                </div>
              </div>

              {/* Rent Schedule */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-900">Rent Schedule</h3>
                  <Button size="sm" icon={Plus} onClick={addRentPeriod} disabled={editingRentPeriod !== null}>Add Period</Button>
                </div>
                
                {formData.rentSchedule.length === 0 && editingRentPeriod === null ? (
                  <div className="text-center py-6 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-500">No rent periods added yet. Click "Add Period" to define the rent schedule.</p>
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm table-fixed">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="text-left px-3 py-2 text-xs font-medium text-slate-500">Lease Term</th>
                          <th className="text-right px-3 py-2 text-xs font-medium text-slate-500 w-28">Rent</th>
                          <th className="text-right px-3 py-2 text-xs font-medium text-slate-500 w-24">Change</th>
                          <th className="w-20 px-3 py-2"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {formData.rentSchedule.map((period, index) => {
                          const rentChange = getRentChange(formData.rentSchedule, index);
                          const isEditing = editingRentPeriod === index;
                          
                          if (isEditing) {
                            return (
                              <tr key={index} className="bg-amber-50">
                                <td className="px-3 py-2.5">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="date"
                                      value={rentPeriodForm.startDate}
                                      onChange={(e) => setRentPeriodForm({ ...rentPeriodForm, startDate: e.target.value })}
                                      className="px-2 py-1 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                    <span className="text-slate-400">-</span>
                                    <input
                                      type="date"
                                      value={rentPeriodForm.endDate}
                                      onChange={(e) => setRentPeriodForm({ ...rentPeriodForm, endDate: e.target.value })}
                                      className="px-2 py-1 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                  </div>
                                </td>
                                <td className="px-3 py-2.5" colSpan={2}>
                                  <div className="relative">
                                    <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                    <input
                                      type="number"
                                      value={rentPeriodForm.monthlyRent}
                                      onChange={(e) => setRentPeriodForm({ ...rentPeriodForm, monthlyRent: e.target.value })}
                                      placeholder="5000"
                                      className="w-full pl-7 pr-2 py-1 text-sm text-right bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                  </div>
                                </td>
                                <td className="px-3 py-2.5 text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <button
                                      onClick={saveRentPeriod}
                                      className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
                                      title="Save"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={cancelRentPeriod}
                                      className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                                      title="Cancel"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                          
                          return (
                            <tr key={index} className="hover:bg-slate-50">
                              <td className="px-3 py-2.5 text-slate-600">
                                {formatDate(period.startDate)} - {formatDate(period.endDate)}
                              </td>
                              <td className="px-3 py-2.5 text-right">
                                <span className="font-medium text-slate-900 tabular-nums">{formatCurrency(period.monthlyRent)}</span>
                              </td>
                              <td className="px-3 py-2.5 text-right">
                                <span className={`text-xs tabular-nums ${rentChange !== null ? (rentChange >= 0 ? 'text-emerald-600' : 'text-rose-600') : 'text-slate-300'}`}>
                                  {rentChange !== null ? `${rentChange >= 0 ? '+' : ''}${formatCurrency(rentChange)}` : '—'}
                                </span>
                              </td>
                              <td className="px-3 py-2.5 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    onClick={() => editRentPeriod(index)}
                                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                                    title="Edit period"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => removeRentPeriod(index)}
                                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded transition-colors"
                                    title="Delete period"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                        {/* New period row */}
                        {editingRentPeriod === 'new' && (
                          <tr className="bg-amber-50">
                            <td className="px-3 py-2.5">
                              <div className="flex items-center gap-2">
                                <input
                                  type="date"
                                  value={rentPeriodForm.startDate}
                                  onChange={(e) => setRentPeriodForm({ ...rentPeriodForm, startDate: e.target.value })}
                                  className="px-2 py-1 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                                <span className="text-slate-400">-</span>
                                <input
                                  type="date"
                                  value={rentPeriodForm.endDate}
                                  onChange={(e) => setRentPeriodForm({ ...rentPeriodForm, endDate: e.target.value })}
                                  className="px-2 py-1 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                              </div>
                            </td>
                            <td className="px-3 py-2.5" colSpan={2}>
                              <div className="relative">
                                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                <input
                                  type="number"
                                  value={rentPeriodForm.monthlyRent}
                                  onChange={(e) => setRentPeriodForm({ ...rentPeriodForm, monthlyRent: e.target.value })}
                                  placeholder="5000"
                                  className="w-full pl-7 pr-2 py-1 text-sm text-right bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                              </div>
                            </td>
                            <td className="px-3 py-2.5 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={saveRentPeriod}
                                  className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
                                  title="Save"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={cancelRentPeriod}
                                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                                  title="Cancel"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Recurring Charges */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-900">Recurring Monthly Charges</h3>
                  <Button size="sm" icon={Plus} onClick={addRecurringCharge} disabled={editingCharge !== null}>Add Charge</Button>
                </div>
                
                {(formData.recurringCharges || []).length === 0 && editingCharge === null ? (
                  <div className="text-center py-6 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-500">No recurring charges. Add CAM, utilities, or other monthly charges.</p>
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm table-fixed">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="text-left px-3 py-2 text-xs font-medium text-slate-500 w-28">Type</th>
                          <th className="text-left px-3 py-2 text-xs font-medium text-slate-500">Description</th>
                          <th className="text-right px-3 py-2 text-xs font-medium text-slate-500 w-28">Amount</th>
                          <th className="w-20 px-3 py-2"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {(formData.recurringCharges || []).map((charge, index) => {
                          const isEditing = editingCharge === index;
                          
                          if (isEditing) {
                            return (
                              <tr key={index} className="bg-amber-50">
                                <td className="px-3 py-2.5">
                                  <select
                                    value={chargeForm.type}
                                    onChange={(e) => setChargeForm({ ...chargeForm, type: e.target.value })}
                                    className="w-full px-2 py-1 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                                  >
                                    <option value="CAM">CAM</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Management">Management</option>
                                    <option value="Insurance">Insurance</option>
                                    <option value="Other">Other</option>
                                  </select>
                                </td>
                                <td className="px-3 py-2.5">
                                  <input
                                    type="text"
                                    value={chargeForm.description}
                                    onChange={(e) => setChargeForm({ ...chargeForm, description: e.target.value })}
                                    placeholder="Description"
                                    className="w-full px-2 py-1 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                                  />
                                </td>
                                <td className="px-3 py-2.5">
                                  <div className="relative">
                                    <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                    <input
                                      type="number"
                                      value={chargeForm.amount}
                                      onChange={(e) => setChargeForm({ ...chargeForm, amount: e.target.value })}
                                      placeholder="0"
                                      className="w-full pl-7 pr-2 py-1 text-sm text-right bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                  </div>
                                </td>
                                <td className="px-3 py-2.5 text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <button
                                      onClick={saveRecurringCharge}
                                      className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
                                      title="Save"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={cancelRecurringCharge}
                                      className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                                      title="Cancel"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                          
                          return (
                            <tr key={index} className="hover:bg-slate-50">
                              <td className="px-3 py-2.5">
                                <Badge variant="default">{charge.type}</Badge>
                              </td>
                              <td className="px-3 py-2.5 text-slate-600">{charge.description}</td>
                              <td className="px-3 py-2.5 text-right tabular-nums font-medium text-slate-900">
                                {formatCurrency(charge.amount)}
                              </td>
                              <td className="px-3 py-2.5 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    onClick={() => editRecurringCharge(index)}
                                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                                    title="Edit charge"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => removeRecurringCharge(index)}
                                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded transition-colors"
                                    title="Delete charge"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                        {/* New charge row */}
                        {editingCharge === 'new' && (
                          <tr className="bg-amber-50">
                            <td className="px-3 py-2.5">
                              <select
                                value={chargeForm.type}
                                onChange={(e) => setChargeForm({ ...chargeForm, type: e.target.value })}
                                className="w-full px-2 py-1 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                              >
                                <option value="CAM">CAM</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Management">Management</option>
                                <option value="Insurance">Insurance</option>
                                <option value="Other">Other</option>
                              </select>
                            </td>
                            <td className="px-3 py-2.5">
                              <input
                                type="text"
                                value={chargeForm.description}
                                onChange={(e) => setChargeForm({ ...chargeForm, description: e.target.value })}
                                placeholder="Description"
                                className="w-full px-2 py-1 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td className="px-3 py-2.5">
                              <div className="relative">
                                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                <input
                                  type="number"
                                  value={chargeForm.amount}
                                  onChange={(e) => setChargeForm({ ...chargeForm, amount: e.target.value })}
                                  placeholder="0"
                                  className="w-full pl-7 pr-2 py-1 text-sm text-right bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                              </div>
                            </td>
                            <td className="px-3 py-2.5 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={saveRecurringCharge}
                                  className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
                                  title="Save"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={cancelRecurringCharge}
                                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                                  title="Cancel"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {(editingLease || selectedTenantId) && (
          <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-200">
            <Button variant="secondary" onClick={() => { setShowAddModal(false); setEditingLease(null); resetForm(); }}>Cancel</Button>
            <Button onClick={handleSubmit}>{editingLease ? 'Save Changes' : 'Create Lease'}</Button>
          </div>
        )}

        {!editingLease && !selectedTenantId && tenantsWithoutLease.length > 0 && (
          <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-200">
            <Button variant="secondary" onClick={() => { setShowAddModal(false); resetForm(); }}>Cancel</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

// Helper function for ordinal suffixes
const getOrdinalSuffix = (n) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};

// ============================================
// PAYMENTS VIEW
// ============================================
const PaymentsView = ({ payments, setPayments, tenants, properties, leases }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    leaseId: '', amount: '', date: '', method: 'ACH'
  });

  // Get current monthly rent based on today's date
  const getCurrentRent = (lease) => {
    if (!lease) return 0;
    const today = new Date();
    const currentPeriod = lease.rentSchedule?.find(rs => {
      const start = new Date(rs.startDate);
      const end = new Date(rs.endDate);
      return today >= start && today <= end;
    });
    return currentPeriod?.monthlyRent || lease.rentSchedule?.[0]?.monthlyRent || 0;
  };

  const filteredPayments = payments.filter(p => filterStatus === 'all' || p.status === filterStatus);
  const totalCollected = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  const handleSubmit = () => {
    const lease = leases.find(l => l.id === formData.leaseId);
    setPayments([...payments, {
      ...formData,
      id: generateId(),
      tenantId: lease?.tenantId,
      propertyId: lease?.propertyId,
      amount: parseFloat(formData.amount),
      status: 'paid'
    }]);
    setShowAddModal(false);
    setFormData({ leaseId: '', amount: '', date: '', method: 'ACH' });
  };

  const markAsPaid = (paymentId) => {
    setPayments(payments.map(p => p.id === paymentId ? { ...p, status: 'paid' } : p));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Payments</h1>
          <p className="mt-1 text-slate-500">Track and manage rent payments</p>
        </div>
        <Button icon={Plus} onClick={() => setShowAddModal(true)}>Record Payment</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Collected" value={formatCurrency(totalCollected)} icon={Wallet} />
        <StatCard title="Pending" value={formatCurrency(totalPending)} icon={AlertCircle} />
        <StatCard title="Collection Rate" value={`${Math.round((totalCollected / (totalCollected + totalPending)) * 100)}%`} icon={TrendingUp} />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          {['all', 'paid', 'pending'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filterStatus === status
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Tenant</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Property</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Date</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Amount</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Method</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map((payment) => {
                const tenant = tenants.find(t => t.id === payment.tenantId);
                const property = properties.find(p => p.id === payment.propertyId);
                return (
                  <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-900">{tenant?.name || 'Unknown'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900">{property?.name || 'Unknown'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900">{formatDate(payment.date)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">{formatCurrency(payment.amount)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">{payment.method}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={payment.status === 'paid' ? 'success' : 'warning'}>{payment.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {payment.status === 'pending' && (
                        <Button variant="ghost" size="sm" icon={Check} onClick={() => markAsPaid(payment.id)}>
                          Mark Paid
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Record Payment">
        <div className="space-y-4">
          <Select label="Lease" value={formData.leaseId} onChange={(e) => {
            const lease = leases.find(l => l.id === e.target.value);
            setFormData({ ...formData, leaseId: e.target.value, amount: getCurrentRent(lease).toString() });
          }} options={[
            { value: '', label: 'Select a lease' },
            ...leases.map(l => {
              const tenant = tenants.find(t => t.id === l.tenantId);
              const property = properties.find(p => p.id === l.propertyId);
              const unit = property?.units?.find(u => u.id === l.unitId);
              return { value: l.id, label: `${tenant?.name || 'Unknown'} - ${unit?.name || 'Unknown'}` };
            })
          ]} />
          <Input label="Amount" type="number" icon={DollarSign} value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} placeholder="5000" />
          <Input label="Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          <Select label="Payment Method" value={formData.method} onChange={(e) => setFormData({ ...formData, method: e.target.value })} options={[
            { value: 'ACH', label: 'ACH Transfer' },
            { value: 'Check', label: 'Check' },
            { value: 'Wire', label: 'Wire Transfer' },
            { value: 'Credit Card', label: 'Credit Card' }
          ]} />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Record Payment</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ============================================
// EXPENSES VIEW
// ============================================
const ExpensesView = ({ expenses, setExpenses, properties }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    propertyId: '', category: 'Maintenance', description: '', amount: '', date: '', vendor: ''
  });

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const expensesByCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const handleSubmit = () => {
    setExpenses([...expenses, { ...formData, id: generateId(), amount: parseFloat(formData.amount) }]);
    setShowAddModal(false);
    setFormData({ propertyId: '', category: 'Maintenance', description: '', amount: '', date: '', vendor: '' });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Expenses</h1>
          <p className="mt-1 text-slate-500">Track property operating expenses</p>
        </div>
        <Button icon={Plus} onClick={() => setShowAddModal(true)}>Add Expense</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Expenses" value={formatCurrency(totalExpenses)} icon={Receipt} />
        <StatCard title="Maintenance" value={formatCurrency(expensesByCategory['Maintenance'] || 0)} icon={Building} />
        <StatCard title="Utilities" value={formatCurrency(expensesByCategory['Utilities'] || 0)} icon={Wallet} />
        <StatCard title="Insurance" value={formatCurrency(expensesByCategory['Insurance'] || 0)} icon={FileText} />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Date</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Property</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Category</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Description</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Vendor</th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map((expense) => {
                const property = properties.find(p => p.id === expense.propertyId);
                return (
                  <tr key={expense.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900">{formatDate(expense.date)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900">{property?.name || 'Unknown'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge>{expense.category}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">{expense.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">{expense.vendor}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-semibold text-slate-900">{formatCurrency(expense.amount)}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Expense">
        <div className="space-y-4">
          <Select label="Property" value={formData.propertyId} onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })} options={[
            { value: '', label: 'Select a property' },
            ...properties.map(p => ({ value: p.id, label: p.name }))
          ]} />
          <Select label="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} options={[
            { value: 'Maintenance', label: 'Maintenance' },
            { value: 'Utilities', label: 'Utilities' },
            { value: 'Insurance', label: 'Insurance' },
            { value: 'Property Tax', label: 'Property Tax' },
            { value: 'Repairs', label: 'Repairs' },
            { value: 'Landscaping', label: 'Landscaping' },
            { value: 'Security', label: 'Security' },
            { value: 'Other', label: 'Other' }
          ]} />
          <Input label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="HVAC quarterly service" />
          <Input label="Vendor" value={formData.vendor} onChange={(e) => setFormData({ ...formData, vendor: e.target.value })} placeholder="ABC Services" />
          <Input label="Amount" type="number" icon={DollarSign} value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} placeholder="1500" />
          <Input label="Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Add Expense</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ============================================
// OWNER DASHBOARD
// ============================================
const OwnerDashboard = ({ user, properties, tenants, leases, payments, expenses, owners }) => {
  const ownerProperties = properties.filter(p => p.owners?.some(o => o.ownerId === user.ownerId));
  const ownerPropertyIds = ownerProperties.map(p => p.id);
  const ownerPayments = payments.filter(p => ownerPropertyIds.includes(p.propertyId));
  const ownerExpenses = expenses.filter(e => ownerPropertyIds.includes(e.propertyId));
  const ownerTenants = tenants.filter(t => ownerPropertyIds.includes(t.propertyId));
  const ownerLeases = leases.filter(l => ownerPropertyIds.includes(l.propertyId));

  // Calculate ownership-weighted financials
  const getOwnershipPercentage = (propertyId) => {
    const property = properties.find(p => p.id === propertyId);
    const ownership = property?.owners?.find(o => o.ownerId === user.ownerId);
    return (ownership?.percentage || 0) / 100;
  };

  const totalRevenue = ownerPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + (p.amount * getOwnershipPercentage(p.propertyId)), 0);
  
  const totalExpenses = ownerExpenses
    .reduce((sum, e) => sum + (e.amount * getOwnershipPercentage(e.propertyId)), 0);
  
  const netIncome = totalRevenue - totalExpenses;
  const occupiedUnits = ownerTenants.filter(t => t.status === 'active').length;
  const totalUnits = ownerProperties.reduce((sum, p) => sum + (p.units?.length || 0), 0);
  const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;

  const monthlyData = [
    { month: 'Jul', revenue: Math.round(totalRevenue * 0.95), expenses: Math.round(totalExpenses * 1.1), net: Math.round((totalRevenue * 0.95) - (totalExpenses * 1.1)) },
    { month: 'Aug', revenue: Math.round(totalRevenue * 0.98), expenses: Math.round(totalExpenses * 0.85), net: Math.round((totalRevenue * 0.98) - (totalExpenses * 0.85)) },
    { month: 'Sep', revenue: Math.round(totalRevenue * 0.98), expenses: Math.round(totalExpenses * 1.2), net: Math.round((totalRevenue * 0.98) - (totalExpenses * 1.2)) },
    { month: 'Oct', revenue: Math.round(totalRevenue * 0.98), expenses: Math.round(totalExpenses * 0.95), net: Math.round((totalRevenue * 0.98) - (totalExpenses * 0.95)) },
    { month: 'Nov', revenue: Math.round(totalRevenue), expenses: Math.round(totalExpenses), net: Math.round(netIncome) },
  ];

  const ownerInfo = owners.find(o => o.id === user.ownerId);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Owner Dashboard</h1>
        <p className="mt-1 text-slate-500">Performance overview for {ownerInfo?.name || user.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Your Revenue Share" value={formatCurrency(totalRevenue)} change="8% vs last period" changeType="up" icon={DollarSign} />
        <StatCard title="Your Expense Share" value={formatCurrency(totalExpenses)} change="2% vs last period" changeType="down" icon={Receipt} />
        <StatCard title="Net Income" value={formatCurrency(netIncome)} change="12% vs last period" changeType="up" icon={TrendingUp} />
        <StatCard title="Occupancy Rate" value={`${occupancyRate}%`} icon={Building2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Financial Performance (Your Share)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                <Line type="monotone" dataKey="revenue" stroke="#1e293b" strokeWidth={2} dot={{ fill: '#1e293b', strokeWidth: 2 }} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#94a3b8" strokeWidth={2} dot={{ fill: '#94a3b8', strokeWidth: 2 }} name="Expenses" />
                <Line type="monotone" dataKey="net" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', strokeWidth: 2 }} name="Net Income" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Portfolio Summary</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <span className="text-sm text-slate-600">Properties</span>
              <span className="text-lg font-semibold text-slate-900">{ownerProperties.length}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <span className="text-sm text-slate-600">Total Units</span>
              <span className="text-lg font-semibold text-slate-900">{totalUnits}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <span className="text-sm text-slate-600">Active Tenants</span>
              <span className="text-lg font-semibold text-slate-900">{occupiedUnits}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <span className="text-sm text-slate-600">Total Sq Ft</span>
              <span className="text-lg font-semibold text-slate-900">{ownerProperties.reduce((sum, p) => sum + (p.sqft || 0), 0).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-slate-600">Active Leases</span>
              <span className="text-lg font-semibold text-slate-900">{ownerLeases.filter(l => l.status === 'active').length}</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Your Properties</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ownerProperties.map((property) => {
            const propertyTenants = tenants.filter(t => t.propertyId === property.id && t.status === 'active');
            const ownership = property.owners?.find(o => o.ownerId === user.ownerId);
            const ownershipPct = (ownership?.percentage || 0) / 100;
            const propertyRevenue = ownerPayments.filter(p => p.propertyId === property.id && p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
            return (
              <div key={property.id} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-24 h-24 bg-slate-200 rounded-xl overflow-hidden flex-shrink-0">
                  {property.image ? (
                    <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-slate-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className="text-base font-semibold text-slate-900">{property.name}</h4>
                    <Badge variant="info">{ownership?.percentage}% owned</Badge>
                  </div>
                  <p className="text-sm text-slate-500">{property.city}, {property.state}</p>
                  <div className="mt-3 flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Your Share: </span>
                      <span className="font-semibold text-slate-900">{formatCurrency(propertyRevenue * ownershipPct)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Tenants: </span>
                      <span className="font-semibold text-slate-900">{propertyTenants.length}/{property.units?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

// ============================================
// OWNER PROPERTIES VIEW
// ============================================
const OwnerPropertiesView = ({ user, properties, tenants, leases, owners }) => {
  const ownerProperties = properties.filter(p => p.owners?.some(o => o.ownerId === user.ownerId));

  const getCoOwners = (property) => {
    return property.owners
      ?.filter(o => o.ownerId !== user.ownerId)
      .map(o => {
        const owner = owners.find(ow => ow.id === o.ownerId);
        return { ...owner, percentage: o.percentage };
      }) || [];
  };

  const getUnit = (propertyId, unitId) => {
    const property = properties.find(p => p.id === propertyId);
    return property?.units?.find(u => u.id === unitId);
  };

  // Get current monthly rent based on today's date
  const getCurrentRent = (lease) => {
    const today = new Date();
    const currentPeriod = lease.rentSchedule?.find(rs => {
      const start = new Date(rs.startDate);
      const end = new Date(rs.endDate);
      return today >= start && today <= end;
    });
    return currentPeriod?.monthlyRent || lease.rentSchedule?.[0]?.monthlyRent || 0;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">My Properties</h1>
        <p className="mt-1 text-slate-500">{ownerProperties.length} properties in your portfolio</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ownerProperties.map((property) => {
          const propertyTenants = tenants.filter(t => t.propertyId === property.id);
          const propertyLeases = leases.filter(l => l.propertyId === property.id);
          const monthlyRent = propertyLeases.reduce((sum, l) => sum + getCurrentRent(l), 0);
          const ownership = property.owners?.find(o => o.ownerId === user.ownerId);
          const coOwners = getCoOwners(property);
          const totalUnits = property.units?.length || 0;
          const occupiedUnits = propertyTenants.filter(t => t.status === 'active').length;
          
          return (
            <Card key={property.id} className="overflow-hidden">
              <div className="h-48 bg-slate-200 relative">
                {property.image ? (
                  <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-slate-400" />
                  </div>
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="default" className="!bg-white/90 backdrop-blur">{property.type}</Badge>
                  <Badge variant="info" className="!bg-blue-500/90 !text-white backdrop-blur">{ownership?.percentage}% owned</Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">{property.name}</h3>
                <p className="mt-1 text-sm text-slate-500 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {property.address}, {property.city}, {property.state} {property.zip}
                </p>
                
                {coOwners.length > 0 && (
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Co-Owners</p>
                    <div className="space-y-1">
                      {coOwners.map((co, idx) => (
                        <p key={idx} className="text-sm text-slate-700">
                          {co.name} <span className="text-slate-500">({co.percentage}%)</span>
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Total Monthly Revenue</p>
                    <p className="mt-1 text-xl font-semibold text-slate-900">{formatCurrency(monthlyRent)}</p>
                    <p className="text-sm text-slate-500">Your share: {formatCurrency(monthlyRent * (ownership?.percentage || 0) / 100)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Occupancy</p>
                    <p className="mt-1 text-xl font-semibold text-slate-900">{occupiedUnits} / {totalUnits}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Square Footage</p>
                    <p className="mt-1 text-xl font-semibold text-slate-900">{property.sqft?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Year Built</p>
                    <p className="mt-1 text-xl font-semibold text-slate-900">{property.yearBuilt}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4">Current Tenants</h4>
                  <div className="space-y-3">
                    {propertyTenants.filter(t => t.status === 'active').slice(0, 3).map((tenant) => {
                      const lease = propertyLeases.find(l => l.tenantId === tenant.id);
                      const unit = getUnit(property.id, tenant.unitId);
                      return (
                        <div key={tenant.id} className="flex items-center justify-between py-2">
                          <div>
                            <p className="text-sm font-medium text-slate-900">{tenant.name}</p>
                            <p className="text-xs text-slate-500">{unit?.name || 'Unknown unit'}</p>
                          </div>
                          <p className="text-sm font-semibold text-slate-900">{formatCurrency(getCurrentRent(lease))}/mo</p>
                        </div>
                      );
                    })}
                    {propertyTenants.filter(t => t.status === 'active').length === 0 && (
                      <p className="text-sm text-slate-500">No current tenants</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// OWNER FINANCIALS VIEW
// ============================================
const OwnerFinancialsView = ({ user, properties, payments, expenses, owners }) => {
  const ownerProperties = properties.filter(p => p.owners?.some(o => o.ownerId === user.ownerId));
  const ownerPropertyIds = ownerProperties.map(p => p.id);
  const ownerPayments = payments.filter(p => ownerPropertyIds.includes(p.propertyId));
  const ownerExpenses = expenses.filter(e => ownerPropertyIds.includes(e.propertyId));

  const getOwnershipPercentage = (propertyId) => {
    const property = properties.find(p => p.id === propertyId);
    const ownership = property?.owners?.find(o => o.ownerId === user.ownerId);
    return (ownership?.percentage || 0) / 100;
  };

  const totalRevenue = ownerPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + (p.amount * getOwnershipPercentage(p.propertyId)), 0);
  
  const totalExpenses = ownerExpenses
    .reduce((sum, e) => sum + (e.amount * getOwnershipPercentage(e.propertyId)), 0);
  
  const netIncome = totalRevenue - totalExpenses;

  const expensesByCategory = ownerExpenses.reduce((acc, e) => {
    const amount = e.amount * getOwnershipPercentage(e.propertyId);
    acc[e.category] = (acc[e.category] || 0) + amount;
    return acc;
  }, {});

  const expenseChartData = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value: Math.round(value) }));
  const COLORS = ['#1e293b', '#475569', '#64748b', '#94a3b8', '#cbd5e1', '#e2e8f0'];

  const ownerInfo = owners.find(o => o.id === user.ownerId);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Financial Overview</h1>
        <p className="mt-1 text-slate-500">Your ownership share across all properties</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Your Revenue Share" value={formatCurrency(totalRevenue)} icon={DollarSign} />
        <StatCard title="Your Expense Share" value={formatCurrency(totalExpenses)} icon={Receipt} />
        <Card className="p-6 bg-emerald-50 border-emerald-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-700">Net Income</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-900">{formatCurrency(netIncome)}</p>
              <p className="mt-2 text-sm text-emerald-600">Profit margin: {totalRevenue > 0 ? Math.round((netIncome / totalRevenue) * 100) : 0}%</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Your Expense Breakdown</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {expenseChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Property Performance (Your Share)</h3>
          <div className="space-y-4">
            {ownerProperties.map((property) => {
              const ownership = property.owners?.find(o => o.ownerId === user.ownerId);
              const ownershipPct = (ownership?.percentage || 0) / 100;
              const propRevenue = ownerPayments.filter(p => p.propertyId === property.id && p.status === 'paid').reduce((sum, p) => sum + p.amount, 0) * ownershipPct;
              const propExpenses = ownerExpenses.filter(e => e.propertyId === property.id).reduce((sum, e) => sum + e.amount, 0) * ownershipPct;
              const propNet = propRevenue - propExpenses;
              return (
                <div key={property.id} className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-slate-900">{property.name}</h4>
                      <p className="text-xs text-slate-500">{ownership?.percentage}% ownership</p>
                    </div>
                    <Badge variant={propNet > 0 ? 'success' : 'danger'}>
                      {propNet > 0 ? '+' : ''}{formatCurrency(propNet)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Revenue: </span>
                      <span className="font-semibold text-slate-900">{formatCurrency(propRevenue)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Expenses: </span>
                      <span className="font-semibold text-slate-900">{formatCurrency(propExpenses)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Recent Transactions (Your Share)</h3>
        <div className="space-y-3">
          {[...ownerPayments.map(p => ({ ...p, type: 'payment' })), ...ownerExpenses.map(e => ({ ...e, type: 'expense' }))]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10)
            .map((item) => {
              const property = properties.find(p => p.id === item.propertyId);
              const ownershipPct = getOwnershipPercentage(item.propertyId);
              const yourShare = item.amount * ownershipPct;
              return (
                <div key={item.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl ${item.type === 'payment' ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                      {item.type === 'payment' ? (
                        <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-slate-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {item.type === 'payment' ? 'Rent Payment' : item.category}
                      </p>
                      <p className="text-xs text-slate-500">{property?.name} • {formatDate(item.date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${item.type === 'payment' ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {item.type === 'payment' ? '+' : '-'}{formatCurrency(yourShare)}
                    </p>
                    <p className="text-xs text-slate-400">of {formatCurrency(item.amount)} total</p>
                  </div>
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [properties, setProperties] = useState(defaultProperties);
  const [tenants, setTenants] = useState(defaultTenants);
  const [leases, setLeases] = useState(defaultLeases);
  const [payments, setPayments] = useState(generatePayments);
  const [expenses, setExpenses] = useState(generateExpenses);
  const [owners, setOwners] = useState(defaultOwners);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('propwise_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setCurrentView(parsedUser.role === 'owner' ? 'owner-dashboard' : 'dashboard');
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('propwise_user', JSON.stringify(user));
      localStorage.setItem(`propwise_properties_${user.email}`, JSON.stringify(properties));
      localStorage.setItem(`propwise_tenants_${user.email}`, JSON.stringify(tenants));
      localStorage.setItem(`propwise_leases_${user.email}`, JSON.stringify(leases));
      localStorage.setItem(`propwise_payments_${user.email}`, JSON.stringify(payments));
      localStorage.setItem(`propwise_expenses_${user.email}`, JSON.stringify(expenses));
      localStorage.setItem(`propwise_owners_${user.email}`, JSON.stringify(owners));
    }
  }, [user, properties, tenants, leases, payments, expenses, owners]);

  // Load user-specific data
  useEffect(() => {
    if (user) {
      const savedProperties = localStorage.getItem(`propwise_properties_${user.email}`);
      const savedTenants = localStorage.getItem(`propwise_tenants_${user.email}`);
      const savedLeases = localStorage.getItem(`propwise_leases_${user.email}`);
      const savedPayments = localStorage.getItem(`propwise_payments_${user.email}`);
      const savedExpenses = localStorage.getItem(`propwise_expenses_${user.email}`);
      const savedOwners = localStorage.getItem(`propwise_owners_${user.email}`);
      
      if (savedProperties) setProperties(JSON.parse(savedProperties));
      if (savedTenants) setTenants(JSON.parse(savedTenants));
      if (savedLeases) setLeases(JSON.parse(savedLeases));
      if (savedPayments) setPayments(JSON.parse(savedPayments));
      if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
      if (savedOwners) setOwners(JSON.parse(savedOwners));
    }
  }, [user?.email]);

  // Scroll to top when navigating to a new view
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView(userData.role === 'owner' ? 'owner-dashboard' : 'dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('propwise_user');
    setUser(null);
    setCurrentView('dashboard');
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <ManagerDashboard properties={properties} tenants={tenants} leases={leases} payments={payments} expenses={expenses} />;
      case 'properties':
        return <PropertiesView properties={properties} setProperties={setProperties} tenants={tenants} owners={owners} leases={leases} setLeases={setLeases} payments={payments} expenses={expenses} setExpenses={setExpenses} />;
      case 'owners':
        return <OwnersView owners={owners} setOwners={setOwners} properties={properties} />;
      case 'tenants':
        return <TenantsView tenants={tenants} setTenants={setTenants} properties={properties} />;
      case 'payments':
        return <PaymentsView payments={payments} setPayments={setPayments} tenants={tenants} properties={properties} leases={leases} />;
      case 'expenses':
        return <ExpensesView expenses={expenses} setExpenses={setExpenses} properties={properties} />;
      case 'owner-dashboard':
        return <OwnerDashboard user={user} properties={properties} tenants={tenants} leases={leases} payments={payments} expenses={expenses} owners={owners} />;
      case 'owner-properties':
        return <OwnerPropertiesView user={user} properties={properties} tenants={tenants} leases={leases} owners={owners} />;
      case 'owner-financials':
        return <OwnerFinancialsView user={user} properties={properties} payments={payments} expenses={expenses} owners={owners} />;
      default:
        return <ManagerDashboard properties={properties} tenants={tenants} leases={leases} payments={payments} expenses={expenses} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar user={user} currentView={currentView} onNavigate={setCurrentView} onLogout={handleLogout} />
      <main className="pl-64">
        <div className="p-8 max-w-7xl">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
