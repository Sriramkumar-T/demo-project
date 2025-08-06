#!/bin/bash

echo "🚀 Starting Shopify Carrier Integration Development Environment"
echo ""

# Function to handle cleanup on script exit
cleanup() {
    echo ""
    echo "🛑 Stopping all services..."
    kill $CARRIER_PID $APP_PID 2>/dev/null
    exit 0
}

# Set up signal handlers for cleanup
trap cleanup SIGINT SIGTERM

# Start mock carrier API in background
echo "📦 Starting Mock Carrier API on port 3001..."
node test-carrier-api.js &
CARRIER_PID=$!

# Wait a moment for the carrier API to start
sleep 2

# Start main Shopify app
echo "🏪 Starting Shopify App on port 3000..."
echo ""
echo "🌐 Open your browser to:"
echo "   Main App: http://localhost:3000"
echo "   Mock Carrier API: http://localhost:3001/health"
echo ""
echo "💡 Use these test values in the app:"
echo "   Endpoint: http://localhost:3001/rates"
echo "   API Key: test-api-key-123"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

npm run dev &
APP_PID=$!

# Wait for user to stop the script
wait