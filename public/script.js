document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('carrierForm');
    const testBtn = document.getElementById('testBtn');
    const copyWebhookBtn = document.getElementById('copyWebhook');
    const notification = document.getElementById('notification');
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.getElementById('statusText');
    const lastUpdated = document.getElementById('lastUpdated');
    const webhookUrl = document.getElementById('webhookUrl');

    // Update webhook URL with current domain
    const currentDomain = window.location.origin;
    webhookUrl.textContent = `${currentDomain}/api/shipping-rates`;

    // Load existing configuration on page load
    loadConfiguration();

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const config = {
            shopDomain: formData.get('shopDomain'),
            endpoint: formData.get('endpoint'),
            apiKey: formData.get('apiKey'),
            enabled: formData.get('enabled') === 'on'
        };

        try {
            showNotification('Saving configuration...', 'info');
            
            const response = await fetch('/api/carrier-config', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(config)
            });

            const result = await response.json();

            if (response.ok) {
                showNotification('Configuration saved successfully!', 'success');
                updateStatus(config.enabled, result.config.updatedAt);
            } else {
                showNotification(`Error: ${result.error}`, 'error');
            }
        } catch (error) {
            console.error('Error saving configuration:', error);
            showNotification('Failed to save configuration. Please try again.', 'error');
        }
    });

    // Test connection handler
    testBtn.addEventListener('click', async function() {
        const endpoint = document.getElementById('endpoint').value;
        const apiKey = document.getElementById('apiKey').value;

        if (!endpoint || !apiKey) {
            showNotification('Please enter both endpoint and API key before testing.', 'error');
            return;
        }

        try {
            showNotification('Testing connection...', 'info');
            
            // Create a sample rate request for testing
            const testRequest = {
                origin: {
                    country: 'US',
                    postal_code: '10001',
                    province: 'NY',
                    city: 'New York'
                },
                destination: {
                    country: 'US',
                    postal_code: '90210',
                    province: 'CA',
                    city: 'Beverly Hills'
                },
                items: [{
                    name: 'Test Item',
                    sku: 'TEST-001',
                    quantity: 1,
                    grams: 500,
                    price: 1000,
                    vendor: 'Test Vendor',
                    requires_shipping: true,
                    taxable: true,
                    fulfillment_service: 'manual'
                }],
                currency: 'USD'
            };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(testRequest)
            });

            if (response.ok) {
                const data = await response.json();
                showNotification('Connection test successful! ✓', 'success');
                console.log('Test response:', data);
            } else {
                showNotification(`Connection test failed: ${response.status} ${response.statusText}`, 'error');
            }
        } catch (error) {
            console.error('Test connection error:', error);
            showNotification('Connection test failed. Please check your endpoint and API key.', 'error');
        }
    });

    // Copy webhook URL handler
    copyWebhookBtn.addEventListener('click', function() {
        const url = webhookUrl.textContent;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Webhook URL copied to clipboard!', 'success');
            copyWebhookBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyWebhookBtn.textContent = 'Copy';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            showNotification('Failed to copy URL. Please copy manually.', 'error');
        });
    });

    // Load existing configuration
    async function loadConfiguration() {
        const shopDomain = getShopDomainFromUrl() || localStorage.getItem('shopDomain');
        
        if (shopDomain) {
            document.getElementById('shopDomain').value = shopDomain;
            
            try {
                const response = await fetch(`/api/carrier-config/${encodeURIComponent(shopDomain)}`);
                const config = await response.json();

                if (response.ok) {
                    document.getElementById('endpoint').value = config.endpoint || '';
                    document.getElementById('apiKey').value = config.apiKey || '';
                    document.getElementById('enabled').checked = config.enabled || false;
                    
                    updateStatus(config.enabled, config.updatedAt);
                }
            } catch (error) {
                console.error('Error loading configuration:', error);
            }
        }
    }

    // Extract shop domain from URL parameters
    function getShopDomainFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('shop');
    }

    // Update status indicator
    function updateStatus(enabled, updatedAt) {
        if (enabled) {
            statusDot.classList.add('connected');
            statusText.textContent = 'Active - Carrier integration enabled';
        } else {
            statusDot.classList.remove('connected');
            statusText.textContent = 'Inactive - Carrier integration disabled';
        }

        if (updatedAt) {
            const date = new Date(updatedAt);
            lastUpdated.textContent = `Last updated: ${date.toLocaleString()}`;
        }
    }

    // Show notification
    function showNotification(message, type = 'info') {
        notification.textContent = message;
        notification.className = `notification ${type} show`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }

    // Save shop domain to localStorage when it changes
    document.getElementById('shopDomain').addEventListener('change', function() {
        localStorage.setItem('shopDomain', this.value);
    });

    // Auto-save form data to localStorage
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.type === 'checkbox') {
                localStorage.setItem(this.id, this.checked);
            } else {
                localStorage.setItem(this.id, this.value);
            }
        });
    });

    // Load saved form data from localStorage
    inputs.forEach(input => {
        const saved = localStorage.getItem(input.id);
        if (saved !== null) {
            if (input.type === 'checkbox') {
                input.checked = saved === 'true';
            } else {
                input.value = saved;
            }
        }
    });
});