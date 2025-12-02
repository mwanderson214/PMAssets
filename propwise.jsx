import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
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

// ====================================================================================
// NOTE: Insert the rest of your PropWise component code here
// (All the mock data, components, views, etc. from your original propwise.jsx file)
// ====================================================================================

// Mount the application
const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));
