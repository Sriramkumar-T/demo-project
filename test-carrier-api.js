const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mock carrier API endpoint
app.post('/rates', (req, res) => {
    console.log('Received rate request:', JSON.stringify(req.body, null, 2));
    
    const { origin, destination, items, currency } = req.body;
    
    // Validate request
    if (!origin || !destination || !items || !currency) {
        return res.status(400).json({
            error: 'Missing required fields: origin, destination, items, currency'
        });
    }
    
    // Calculate mock rates based on distance and weight
    const totalWeight = items.reduce((sum, item) => sum + (item.grams * item.quantity), 0);
    const basePrice = Math.max(5.99, totalWeight * 0.01); // Minimum $5.99
    
    // Mock different shipping options
    const rates = [
        {
            service_name: 'Standard Shipping',
            service_code: 'STANDARD',
            total_price: basePrice,
            currency: currency,
            min_delivery_date: getDeliveryDate(5),
            max_delivery_date: getDeliveryDate(7)
        },
        {
            service_name: 'Express Shipping',
            service_code: 'EXPRESS',
            total_price: basePrice * 1.5,
            currency: currency,
            min_delivery_date: getDeliveryDate(2),
            max_delivery_date: getDeliveryDate(3)
        },
        {
            service_name: 'Overnight Shipping',
            service_code: 'OVERNIGHT',
            total_price: basePrice * 2.5,
            currency: currency,
            min_delivery_date: getDeliveryDate(1),
            max_delivery_date: getDeliveryDate(1)
        }
    ];
    
    // Add some randomness to make it more realistic
    const availableRates = rates.filter(() => Math.random() > 0.2);
    
    console.log('Returning rates:', availableRates);
    
    res.json({
        rates: availableRates,
        debug: {
            total_weight: totalWeight,
            base_price: basePrice,
            origin: origin,
            destination: destination
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        service: 'Mock Carrier API',
        timestamp: new Date().toISOString()
    });
});

// Helper function to calculate delivery dates
function getDeliveryDate(daysFromNow) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0]; // Return YYYY-MM-DD format
}

app.listen(PORT, () => {
    console.log(`🚚 Mock Carrier API running on port ${PORT}`);
    console.log(`Test endpoint: http://localhost:${PORT}/rates`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log('');
    console.log('Use this endpoint URL in your Shopify app:');
    console.log(`http://localhost:${PORT}/rates`);
    console.log('');
    console.log('API Key: test-api-key-123 (any value works for testing)');
});