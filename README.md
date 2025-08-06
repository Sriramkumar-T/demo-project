# Shopify Carrier Integration App

A Node.js application that allows you to integrate custom shipping carriers with your Shopify store. This app provides a user-friendly interface to configure carrier API settings and automatically provides shipping rates to customers during checkout.

## Features

- 🚚 **Custom Carrier Integration**: Connect any shipping carrier with a REST API
- 🎛️ **Easy Configuration**: Simple web interface to set up carrier credentials
- 🔒 **Secure**: API keys are handled securely
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔄 **Real-time Testing**: Test your carrier connection before going live
- 📊 **Status Monitoring**: Track integration status and last updates

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Shopify Partner account
- A Shopify store
- Access to your carrier's API

## Installation

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd shopify-carrier-integration
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your Shopify app credentials:
   ```env
   SHOPIFY_API_KEY=your_shopify_api_key_here
   SHOPIFY_API_SECRET=your_shopify_api_secret_here
   SCOPES=write_shipping,read_shipping,write_orders,read_orders
   HOST=https://your-app-domain.com
   PORT=3000
   SHOPIFY_APP_URL=https://your-app-domain.com
   ```

4. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the app**
   Open your browser and go to `http://localhost:3000`

## Shopify Setup

### 1. Create a Shopify App

1. Go to your [Shopify Partner Dashboard](https://partners.shopify.com/)
2. Click "Apps" → "Create app"
3. Choose "Custom app" or "Public app"
4. Fill in your app details:
   - **App name**: Your carrier integration app name
   - **App URL**: `https://your-domain.com`
   - **Allowed redirection URL(s)**: `https://your-domain.com/auth/callback`

### 2. Configure App Permissions

In your app settings, request these scopes:
- `read_shipping`
- `write_shipping`
- `read_orders`
- `write_orders`

### 3. Set Up Carrier Service

1. In your Shopify admin, go to **Settings** → **Shipping and delivery**
2. Scroll down to **Custom shipping rates**
3. Click **Manage rates**
4. Add a new carrier service:
   - **Name**: Your carrier name
   - **Callback URL**: `https://your-domain.com/api/shipping-rates`
   - **Service discovery**: Enable if supported

## Usage

### 1. Configure Your Carrier

1. Open the app in your browser
2. Enter your **Shop Domain** (e.g., `your-shop.myshopify.com`)
3. Enter your **Carrier API Endpoint** (the URL where your carrier provides rates)
4. Enter your **Carrier API Key** for authentication
5. Check **Enable Carrier Integration** to activate
6. Click **Save Configuration**

### 2. Test the Connection

1. Click the **Test Connection** button to verify your carrier API is working
2. Check the status indicator to confirm the integration is active

### 3. Deploy to Production

1. Deploy your app to a hosting service (Heroku, DigitalOcean, AWS, etc.)
2. Update your environment variables with production URLs
3. Update the webhook URL in your Shopify carrier service settings

## Carrier API Requirements

Your carrier API should:

### Accept POST requests with this format:
```json
{
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
  "items": [
    {
      "name": "Product Name",
      "sku": "PRODUCT-001",
      "quantity": 1,
      "grams": 500,
      "price": 1000,
      "vendor": "Vendor Name"
    }
  ],
  "currency": "USD"
}
```

### Return responses in this format:
```json
{
  "rates": [
    {
      "service_name": "Standard Shipping",
      "service_code": "STANDARD",
      "total_price": 9.99,
      "currency": "USD",
      "min_delivery_date": "2024-01-15",
      "max_delivery_date": "2024-01-20"
    }
  ]
}
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Main configuration interface |
| GET | `/api/carrier-config/:shopDomain` | Get carrier configuration |
| POST | `/api/carrier-config` | Save carrier configuration |
| POST | `/api/shipping-rates` | Shopify webhook for rate requests |
| GET | `/api/health` | Health check endpoint |

## Troubleshooting

### Common Issues

1. **Rates not showing in checkout**
   - Verify the carrier service is properly configured in Shopify
   - Check that the webhook URL is correct
   - Ensure the integration is enabled in the app

2. **API connection errors**
   - Verify your carrier API endpoint is correct
   - Check that your API key is valid
   - Ensure your carrier API accepts the request format

3. **App not loading**
   - Check that all environment variables are set
   - Verify your Shopify app credentials
   - Ensure the app URL is accessible

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

## Security Considerations

- API keys are stored securely and not exposed in the frontend
- Use HTTPS in production
- Implement proper authentication for multi-tenant usage
- Consider using a database instead of in-memory storage for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please:
1. Check the troubleshooting section
2. Review the Shopify documentation
3. Open an issue in this repository
4. Contact your carrier's API support team

## Version History

- **v1.0.0**: Initial release with basic carrier integration
  - Web-based configuration interface
  - Carrier API integration
  - Shopify webhook handling
  - Connection testing