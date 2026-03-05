# Garage Boost Deployment Guide for Namecheap

## 🎯 Deployment Strategy

Since Namecheap shared hosting doesn't support GitHub Actions, we use:
1. **Manual SSH deployment** (takes 2-3 minutes)
2. **Local build** + **server restart**
3. **PM2** to keep app running

---

## 📋 Initial Setup (One-time)

### 1. SSH into Namecheap
```bash
ssh username@garage.bizzboost.uk
```
(Replace `username` with your Namecheap cPanel username)

### 2. Setup the app directory
```bash
cd ~/public_html

# Clone repo (if first time)
git clone <your-repo-url> .

# Install dependencies
npm ci

# Build initial version
npm run build

# Start with PM2
pm2 start server.js --name app
pm2 save
pm2 startup
```

### 3. Verify it's running
```bash
pm2 status
curl http://localhost:3000
```

### 4. Configure Environment Variables in cPanel
Go to **cPanel → Environment Variables** and add all from `.env.production.template`:
- `DATABASE_URL` (MySQL connection)
- `STRIPE_SECRET_KEY` (from Stripe dashboard)
- `STRIPE_*_PRICE_ID` (your 3 price IDs)
- `STRIPE_WEBHOOK_SECRET` (from Stripe webhook)
- `RESEND_API_KEY` (from Resend)
- `NODE_ENV=production`
- `PORT=3000`
- `HOST=0.0.0.0`

---

## 🚀 Deploying Changes

### Using the Deploy Script (Recommended)

**Edit the script to add your details:**
```bash
# Open deploy.sh and change this line:
SSH_USER="your_namecheap_username"
```

**Run it:**
```bash
./deploy.sh
```

This will:
1. ✅ Build locally
2. ✅ SSH into Namecheap
3. ✅ Pull latest code from GitHub
4. ✅ Build on server (using env vars)
5. ✅ Restart PM2

---

### Or, Deploy Manually (3 commands):

```bash
# Step 1: Build locally
npm run build

# Step 2: Push to GitHub
git add .
git commit -m "Update: [description]"
git push origin main

# Step 3: SSH in and deploy
ssh username@garage.bizzboost.uk
cd ~/public_html
git pull origin main
npm run build
pm2 restart app
```

---

## ✅ Verification

After deployment, verify everything works:

```bash
# Check PM2
pm2 status

# Check logs
pm2 logs app

# Test the site
curl https://garage.bizzboost.uk
```

---

## 🐛 Troubleshooting

**500 Error on Stripe?**
1. Check env vars in cPanel are set
2. Verify `STRIPE_SECRET_KEY` and price IDs
3. SSH in and check: `pm2 logs app`

**App won't start?**
```bash
pm2 logs app  # See error details
pm2 restart app --watch  # Auto-restart on file changes
```

**Database connection error?**
```bash
# Verify DATABASE_URL in cPanel
echo $DATABASE_URL
# Should show your MySQL connection string
```

---

## 📊 Quick Checklist Before Each Deploy

- [ ] Changes committed locally
- [ ] `npm run build` passes locally ✅
- [ ] All new env vars added to cPanel (if any)
- [ ] Run `./deploy.sh` (or manual 3-command deploy)
- [ ] Check site loads: https://garage.bizzboost.uk
- [ ] Test key features (login, pricing, blog)

---

## 🔄 To Rollback (if something breaks)

```bash
ssh username@garage.bizzboost.uk
cd ~/public_html
git revert HEAD
npm run build
pm2 restart app
```

---

## 📞 Support

If you hit issues, SSH in and check:
```bash
pm2 logs app          # Last 100 lines
pm2 logs app --lines 500  # More lines
tail -f ~/error_log   # Server error log
```

Share those logs if you need help!
