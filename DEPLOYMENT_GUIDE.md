# 🚀 Deploying PropWise to Namecheap Hosting

## Quick Overview

Your PropWise application is a **static website** (HTML/CSS/JS), so it's very easy to deploy to Namecheap shared hosting!

## 📋 What You'll Upload

These files from your PMAssets directory:
```
├── index.html          ← Main entry point
├── propwise.js         ← React application (with your code added)
├── styles.css          ← CSS styles
└── (optional) any additional files
```

**Note:** You do NOT need to upload `server.py`, `serve.sh`, or documentation files - those are only for local development.

## 🎯 Method 1: cPanel File Manager (Easiest - No Software Required)

### Step 1: Access cPanel
1. Log in to your Namecheap account
2. Go to **Hosting List** → **Manage** (for your domain)
3. Click **cPanel** button

### Step 2: Navigate to File Manager
1. In cPanel, find and click **File Manager**
2. Navigate to `public_html` directory (or your domain's root folder)
3. If deploying to subdomain/subdirectory, navigate there instead

### Step 3: Upload Files
1. Click **Upload** button in File Manager
2. Select and upload these files:
   - `index.html`
   - `propwise.js` (with your code added)
   - `styles.css`
3. Wait for uploads to complete
4. Done! Visit your domain to test

**Example URLs:**
- Main domain: `https://yourdomain.com`
- Subdirectory: `https://yourdomain.com/propwise`
- Subdomain: `https://propwise.yourdomain.com`

---

## 🎯 Method 2: FTP/SFTP (Recommended for Repeat Updates)

### Step 1: Get FTP Credentials
1. In cPanel, go to **FTP Accounts**
2. Use your main cPanel account credentials, or create a new FTP account
3. Note your:
   - **Host:** Usually `ftp.yourdomain.com` or `yourdomain.com`
   - **Username:** Your cPanel username
   - **Password:** Your cPanel password
   - **Port:** 21 (FTP) or 22 (SFTP)

### Step 2: Choose an FTP Client

**Option A: FileZilla (Free, Cross-Platform)**
1. Download from https://filezilla-project.org/
2. Install and open FileZilla
3. Enter credentials:
   - Host: `ftp.yourdomain.com`
   - Username: `your_username`
   - Password: `your_password`
   - Port: `21`
4. Click **Quickconnect**

**Option B: Command Line (Linux/Mac)**
```bash
# Using SFTP (more secure)
sftp username@yourdomain.com

# Navigate to web directory
cd public_html

# Upload files
put index.html
put propwise.js
put styles.css

# Or upload entire directory
put -r /path/to/PMAssets/*
```

### Step 3: Upload Files
1. On the right panel (server), navigate to `public_html`
2. On the left panel (local), navigate to your PMAssets folder
3. Select these files:
   - `index.html`
   - `propwise.js`
   - `styles.css`
4. Right-click → **Upload** (or drag and drop)

---

## 🎯 Method 3: Git Deployment (Advanced)

If your Namecheap hosting supports Git (check in cPanel under "Git Version Control"):

### Step 1: Create Repository in cPanel
1. Go to **Git Version Control** in cPanel
2. Click **Create**
3. Set repository path: `/home/username/repositories/propwise`
4. Set deployment path: `/home/username/public_html` (or subdirectory)

### Step 2: Push from Local
```bash
# Add Namecheap as remote
git remote add namecheap ssh://username@yourdomain.com/~/repositories/propwise

# Push
git push namecheap claude/extract-jsx-standalone-01GTwrbwEgu75shvJ7EQcVBy:master
```

### Step 3: Deploy in cPanel
1. Go back to **Git Version Control**
2. Click **Manage** on your repository
3. Click **Pull or Deploy** → **Deploy HEAD Commit**

---

## ✅ Quick Deployment Checklist

Before uploading, make sure:
- [ ] You've added your PropWise component code to `propwise.js`
- [ ] You've tested locally (it works on `http://localhost:8000`)
- [ ] Files are ready: `index.html`, `propwise.js`, `styles.css`

After uploading:
- [ ] Visit your domain URL
- [ ] Check browser console for errors (F12)
- [ ] Test login with demo accounts
- [ ] Test all features

---

## 🔧 Common Issues & Solutions

### Issue: Blank Page or "Cannot GET /"
**Solution:** Make sure `index.html` is in the correct directory
- For main domain: `/public_html/index.html`
- For subdirectory: `/public_html/propwise/index.html`

### Issue: CSS Not Loading
**Solution:** Check file paths are correct
- `styles.css` should be in same directory as `index.html`
- Or update path in `index.html`: `<link rel="stylesheet" href="./styles.css">`

### Issue: JavaScript Not Loading
**Solution:**
- Check `propwise.js` is in same directory
- Check browser console (F12) for errors
- Ensure you added your component code to `propwise.js`

### Issue: Mixed Content Warning (HTTP/HTTPS)
**Solution:**
- Namecheap provides free SSL certificates
- Enable SSL in cPanel → **SSL/TLS Status**
- Force HTTPS by adding to `.htaccess`:
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## 📱 Optional: Create .htaccess for Better Performance

Create a `.htaccess` file in the same directory as `index.html`:

```apache
# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Enable browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## 🎉 Deployment Complete!

Once uploaded, your PropWise application will be live at:
- `https://yourdomain.com` (if in public_html root)
- `https://yourdomain.com/propwise` (if in subdirectory)
- `https://propwise.yourdomain.com` (if on subdomain)

**Demo Accounts:**
- Manager: `manager@propwise.com` / `demo123`
- Owner: `owner@pacific.com` / `demo123`

---

## 📞 Need Help?

**Namecheap Support:**
- Live Chat: 24/7 available in your account
- Knowledge Base: https://www.namecheap.com/support/knowledgebase/

**Common Namecheap Hosting Paths:**
- Main domain root: `/home/username/public_html/`
- Addon domains: `/home/username/public_html/addondomain.com/`
- Subdomains: `/home/username/public_html/subdomain/`

---

**Your PropWise application is ready to go live! 🚀**
