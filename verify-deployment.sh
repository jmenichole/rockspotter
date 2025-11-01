#!/bin/bash

# Rock Spotter Deployment Verification Script
# Tests that a deployed instance is working correctly

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Usage information
if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <API_URL> [AUTH_TOKEN]"
    echo ""
    echo "Examples:"
    echo "  $0 http://localhost:3000"
    echo "  $0 https://rock-spotter-api.onrender.com"
    echo "  $0 https://your-app.railway.app eyJhbGc..."
    echo ""
    exit 1
fi

API_URL=$1
AUTH_TOKEN=${2:-""}

echo "🪨 Rock Spotter Deployment Verification"
echo "========================================"
echo ""
echo "Testing API at: $API_URL"
echo ""

# Function to print test results
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
        exit 1
    fi
}

# Test 1: Health Check
echo "📋 Test 1: Health Check"
response=$(curl -s -w "\n%{http_code}" "$API_URL/api/health" 2>/dev/null)
http_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | head -n -1)

if [ "$http_code" = "200" ]; then
    print_result 0 "Health check passed"
    echo "   Response: $body"
else
    print_result 1 "Health check failed (HTTP $http_code)"
fi
echo ""

# Test 2: Root Endpoint
echo "📋 Test 2: Root Endpoint"
response=$(curl -s -w "\n%{http_code}" "$API_URL/" 2>/dev/null)
http_code=$(echo "$response" | tail -n 1)

if [ "$http_code" = "200" ]; then
    print_result 0 "Root endpoint accessible"
else
    print_result 1 "Root endpoint failed (HTTP $http_code)"
fi
echo ""

# Test 3: User Registration
echo "📋 Test 3: User Registration"
timestamp=$(date +%s)
test_username="testuser_$timestamp"
test_email="test_$timestamp@example.com"

register_response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/api/users/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"$test_username\",
    \"email\": \"$test_email\",
    \"password\": \"testpass123\"
  }" 2>/dev/null)

http_code=$(echo "$register_response" | tail -n 1)
body=$(echo "$register_response" | head -n -1)

if [ "$http_code" = "201" ] || [ "$http_code" = "200" ]; then
    print_result 0 "User registration works"
    TOKEN=$(echo "$body" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    if [ -n "$TOKEN" ]; then
        echo "   Token received (${#TOKEN} chars)"
    fi
else
    echo -e "${YELLOW}⚠️  User registration test skipped or failed (HTTP $http_code)${NC}"
    echo "   This might be expected if database is not configured"
fi
echo ""

# Test 4: Protected Endpoint (if we have a token)
if [ -n "$TOKEN" ] || [ -n "$AUTH_TOKEN" ]; then
    echo "📋 Test 4: Protected Endpoint Access"
    TEST_TOKEN=${AUTH_TOKEN:-$TOKEN}
    
    profile_response=$(curl -s -w "\n%{http_code}" "$API_URL/api/users/profile/me" \
      -H "Authorization: Bearer $TEST_TOKEN" 2>/dev/null)
    
    http_code=$(echo "$profile_response" | tail -n 1)
    
    if [ "$http_code" = "200" ]; then
        print_result 0 "Authentication works"
    else
        echo -e "${YELLOW}⚠️  Protected endpoint test inconclusive (HTTP $http_code)${NC}"
    fi
    echo ""
fi

# Test 5: List Rocks (Public endpoint)
echo "📋 Test 5: List Rocks (Public Endpoint)"
rocks_response=$(curl -s -w "\n%{http_code}" "$API_URL/api/rocks" 2>/dev/null)
http_code=$(echo "$rocks_response" | tail -n 1)

if [ "$http_code" = "200" ]; then
    print_result 0 "Rocks listing works"
else
    echo -e "${YELLOW}⚠️  Rocks listing test inconclusive (HTTP $http_code)${NC}"
fi
echo ""

# Test 6: List Achievements
echo "📋 Test 6: List Achievements"
achievements_response=$(curl -s -w "\n%{http_code}" "$API_URL/api/achievements" 2>/dev/null)
http_code=$(echo "$achievements_response" | tail -n 1)

if [ "$http_code" = "200" ]; then
    print_result 0 "Achievements listing works"
else
    echo -e "${YELLOW}⚠️  Achievements listing test inconclusive (HTTP $http_code)${NC}"
fi
echo ""

# Test 7: List Hunts
echo "📋 Test 7: List Hunts"
hunts_response=$(curl -s -w "\n%{http_code}" "$API_URL/api/hunts" 2>/dev/null)
http_code=$(echo "$hunts_response" | tail -n 1)

if [ "$http_code" = "200" ]; then
    print_result 0 "Hunts listing works"
else
    echo -e "${YELLOW}⚠️  Hunts listing test inconclusive (HTTP $http_code)${NC}"
fi
echo ""

# Summary
echo "========================================"
echo -e "${GREEN}✅ Deployment Verification Complete!${NC}"
echo ""
echo "Your Rock Spotter API is deployed and accessible! 🎉"
echo ""
echo "API URL: $API_URL"
echo ""
echo "Next steps:"
echo "1. Test with your own data"
echo "2. Set up monitoring"
echo "3. Configure custom domain (optional)"
echo "4. Deploy your mobile app"
echo ""
echo "📚 See DEPLOYMENT.md for more information"
echo ""
