# 🚚 Shopify Carrier Integration - Setup Guide

This guide will walk you through setting up your Shopify carrier integration app step by step.

## Quick Start (5 minutes)

### 1. Install and Run Locally

```bash
# Install dependencies
npm install

# Start development environment (includes mock carrier API)
./run-dev.sh
```

This starts:
- **Main App**: http://localhost:3000
- **Mock Carrier API**: http://localhost:3001

### 2. Test the Configuration Interface

1. Open http://localhost:3000
2. Fill in the form:
   - **Shop Domain**: `your-test-shop.myshopify.com`
   - **Carrier API Endpoint**: `http://localhost:3001/rates`
   - **API Key**: `test-api-key-123`
   - **Enable**: ✅ Check this box
3. Click **Save Configuration**
4. Click **Test Connection** to verify it works

## Production Setup

### Step 1: Deploy Your App

Deploy to your preferred hosting service:

**Heroku:**
```bash
heroku create your-carrier-app
heroku config:set SHOPIFY_API_KEY=your_api_key
heroku config:set SHOPIFY_API_SECRET=your_api_secret
heroku config:set HOST=https://your-carrier-app.herokuapp.com
git push heroku main
```

**Other platforms:** Update the environment variables accordingly.

### Step 2: Create Shopify App

1. Go to [Shopify Partner Dashboard](https://partners.shopify.com)
2. Click **Apps** → **Create app**
3. Choose **Custom app**
4. Fill in details:
   - **App name**: "Your Carrier Integration"
   - **App URL**: `https://your-domain.com`
   - **Allowed redirection URLs**: `https://your-domain.com/auth/callback`

### Step 3: Configure App Permissions

In your app settings, add these scopes:
- `read_shipping`
- `write_shipping` 
- `read_orders`
- `write_orders`

### Step 4: Set Up Carrier Service in Shopify

1. Install your app in your Shopify store
2. In Shopify Admin: **Settings** → **Shipping and delivery**
3. Scroll to **Custom shipping rates**
4. Click **Manage rates**
5. Add new carrier service:
   - **Name**: Your Carrier Name
   - **Callback URL**: `https://your-domain.com/api/shipping-rates`
   - **Service discovery**: ✅ Enable

### Step 5: Configure Your Real Carrier

1. Open your deployed app
2. Enter your real carrier details:
   - **Shop Domain**: Your actual shop domain
   - **Carrier API Endpoint**: Your carrier's API URL
   - **API Key**: Your real carrier API key
   - **Enable**: ✅ Check to activate
3. Save and test the connection

## Carrier API Integration

Your carrier API needs to support this format:

### Request Format (what Shopify sends):
```json
{
  "rate": {
    "origin": {
      "country": "US",
      "postal_code": "10001",
      "province": "NY",
      "city": "New York"
    },
    "destination": {
      "country": "US", 
      "postal_code": "90210",
      "province": "CA",
      "city": "Beverly Hills"
    },
    "items": [{
      "name": "Product Name",
      "sku": "PRODUCT-001", 
      "quantity": 1,
      "grams": 500,
      "price": 1000
    }],
    "currency": "USD"
  }
}
```

### Response Format (what your carrier should return):
```json
{
  "rates": [{
    "service_name": "Standard Shipping",
    "service_code": "STANDARD", 
    "total_price": 999,
    "currency": "USD",
    "min_delivery_date": "2024-01-15",
    "max_delivery_date": "2024-01-20"
  }]
}
```

## Testing Your Integration

### 1. Test with Mock API
Use the included mock carrier API for initial testing:
- **Endpoint**: `http://localhost:3001/rates`
- **API Key**: `test-api-key-123`

### 2. Test in Shopify Store
1. Add products to your test store
2. Go to checkout
3. Enter shipping address
4. Verify your carrier rates appear as shipping options

### 3. Debug Issues
Check the app logs for:
- Incoming rate requests from Shopify
- Outgoing requests to your carrier
- Any error messages

## Common Issues & Solutions

### ❌ Rates not showing in checkout
**Solutions:**
- Verify carrier service is configured in Shopify admin
- Check webhook URL is correct and accessible
- Ensure integration is enabled in app
- Verify carrier API is responding correctly

### ❌ "Connection test failed"
**Solutions:**
- Check carrier API endpoint URL
- Verify API key is correct
- Ensure carrier API accepts the request format
- Check network connectivity

### ❌ App not loading
**Solutions:**
- Verify environment variables are set
- Check Shopify app credentials
- Ensure app URL is accessible via HTTPS

## Environment Variables

Create a `.env` file with:

```env
# Shopify App Credentials
SHOPIFY_API_KEY=your_shopify_api_key
SHOPIFY_API_SECRET=your_shopify_api_secret
SCOPES=write_shipping,read_shipping,write_orders,read_orders

# App Configuration  
HOST=https://your-app-domain.com
PORT=3000
SHOPIFY_APP_URL=https://your-app-domain.com

# Optional
DATABASE_URL=your_database_url_here
NODE_ENV=production
```

## Security Notes

- ✅ API keys are stored securely on the server
- ✅ Use HTTPS in production
- ✅ Validate all incoming requests
- ✅ Consider using a database for production storage
- ✅ Implement proper error handling

## Next Steps

1. **Customize the UI** - Modify the interface to match your brand
2. **Add Database** - Replace in-memory storage with a real database
3. **Add Authentication** - Implement proper Shopify OAuth flow
4. **Add Monitoring** - Set up logging and error tracking
5. **Scale** - Optimize for multiple shops and high traffic

## Support

- 📖 [Shopify Carrier Service Documentation](https://shopify.dev/docs/apps/shipping)
- 🛠️ [Shopify CLI Documentation](https://shopify.dev/docs/apps/tools/cli)
- 💬 [Shopify Community Forums](https://community.shopify.com/)

## File Structure

```
├── server.js              # Main Express server
├── package.json           # Dependencies
├── .env.example          # Environment variables template
├── public/
│   ├── index.html        # Configuration UI
│   ├── styles.css        # UI styles
│   └── script.js         # Frontend JavaScript
├── test-carrier-api.js   # Mock carrier API for testing
├── run-dev.sh           # Development startup script
├── README.md            # Main documentation
└── SETUP_GUIDE.md       # This file
```

---

🎉 **You're all set!** Your Shopify carrier integration is ready to provide custom shipping rates to your customers.