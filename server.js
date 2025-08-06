const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for carrier configurations (use database in production)
let carrierConfigurations = {};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get carrier configuration
app.get('/api/carrier-config/:shopDomain', (req, res) => {
    const { shopDomain } = req.params;
    const config = carrierConfigurations[shopDomain] || {
        enabled: false,
        endpoint: '',
        apiKey: ''
    };
    res.json(config);
});

// Save carrier configuration
app.post('/api/carrier-config', (req, res) => {
    const { shopDomain, enabled, endpoint, apiKey } = req.body;
    
    if (!shopDomain) {
        return res.status(400).json({ error: 'Shop domain is required' });
    }

    carrierConfigurations[shopDomain] = {
        enabled: enabled || false,
        endpoint: endpoint || '',
        apiKey: apiKey || '',
        updatedAt: new Date().toISOString()
    };

    console.log(`Carrier configuration updated for ${shopDomain}:`, carrierConfigurations[shopDomain]);
    
    res.json({ 
        success: true, 
        message: 'Carrier configuration saved successfully',
        config: carrierConfigurations[shopDomain]
    });
});

// Shopify Carrier Service endpoint for shipping rates
app.post('/api/shipping-rates', async (req, res) => {
    try {
        const { rate } = req.body;
        
        if (!rate) {
            return res.status(400).json({ error: 'Rate data is required' });
        }

        console.log('Received shipping rate request:', JSON.stringify(rate, null, 2));

        // Extract shop domain from the request (you might need to adjust this based on your setup)
        const shopDomain = req.headers['x-shopify-shop-domain'] || 'default';
        const config = carrierConfigurations[shopDomain];

        if (!config || !config.enabled) {
            return res.json({ rates: [] });
        }

        // Call your carrier's API to get shipping rates
        const shippingRates = await getShippingRatesFromCarrier(rate, config);
        
        res.json({ rates: shippingRates });
    } catch (error) {
        console.error('Error calculating shipping rates:', error);
        res.status(500).json({ error: 'Failed to calculate shipping rates' });
    }
});

// Function to call external carrier API
async function getShippingRatesFromCarrier(rateData, config) {
    try {
        const axios = require('axios');
        
        // Prepare the request to your carrier API
        const carrierRequest = {
            origin: rateData.origin,
            destination: rateData.destination,
            items: rateData.items,
            currency: rateData.currency
        };

        console.log('Calling carrier API:', config.endpoint);
        
        // Make request to carrier API
        const response = await axios.post(config.endpoint, carrierRequest, {
            headers: {
                'Authorization': `Bearer ${config.apiKey}`,
                'Content-Type': 'application/json'
            },
            timeout: 10000 // 10 second timeout
        });

        // Transform carrier response to Shopify format
        const carrierRates = response.data.rates || [];
        
        return carrierRates.map(rate => ({
            service_name: rate.service_name || 'Custom Shipping',
            service_code: rate.service_code || 'CUSTOM',
            total_price: Math.round(rate.total_price * 100), // Convert to cents
            currency: rateData.currency,
            min_delivery_date: rate.min_delivery_date || null,
            max_delivery_date: rate.max_delivery_date || null
        }));
        
    } catch (error) {
        console.error('Error calling carrier API:', error.message);
        
        // Return fallback rates if carrier API fails
        return [{
            service_name: 'Standard Shipping',
            service_code: 'STANDARD',
            total_price: 999, // $9.99 in cents
            currency: rateData.currency
        }];
    }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Shopify Carrier Integration App running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to configure your carrier settings`);
});