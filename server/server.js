
const express = require('express');
const axios = require('axios')
const app = express();
const port = 3000;

// Credentials for the amadeus
const API_KEY = '9QVpqsPbLVHMAvoN6BS03GAK2IWcezvd';
const API_secret = 'X6DdmyGZ5do8Lyz7';

// Assuming you have the token_type and access_token from the previous request
const tokenType = 'Bearer';
const accessToken = 'Wlkozf1ZXt4FauuEwQMGLLx87x7A';

axios.get("https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2024-05-02&adults=1&nonStop=false&max=250", {
  headers: {
    'Authorization': `${tokenType} ${accessToken}`,
  },
})
    .then(response => {

        const things_to_pass = ['id','lastTicketingDate','lastTicketingDateTime','numberOfBookableSeats','itineraries','price','travelerPricings']

        filterProperties(response.data, things_to_pass)
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });


    function filterProperties(information, propertiesToFilter) {
        if ('data' in information && Array.isArray(information.data)) {
          const filteredData = information.data.map(item => {
            const filteredItem = Object.fromEntries(
              Object.entries(item)
                .filter(([key]) => propertiesToFilter.includes(key))
            );
            return filteredItem;
          });
      
          console.log('Filtered Data:', filteredData);
        } else {
          console.error('Error: "data" property does not exist or is not an array.');
        }
      }
      
      // Example usage
      const keysToFilter = ['source', 'instantTicketingRequired'];
      


    







