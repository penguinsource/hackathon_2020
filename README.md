# Hackathon 2020

Hello! A few notes on the project:

- This is a React micro-app with a Node back-end service
- Step-by-step web-app allowing you to easily distribute map routing amongst multiple drivers

# Flow

1. Get agency name, number of drivers available and a spreadsheet of addresses
2. Parse addresses, get the latitude and logitude of every address
3. Initially, we wrote a shortest path algorithm (Dijkstra's algorithm). However, to obtain optimal routing (best, shortest), we are using a 3rd party API (speedyroute)
4. Create Google Maps embedded maps to display to user + create maps directions links
5. Display the routes to the user with options
6. User can then send the routing information through SMS messages and emails

# APIs and Integrations

**Twilio** - SMS messages

**Sendinblue** - Email messages

**SpeedyRoute** - Travelling Salesman Problem but for multiple 'travellers' (https://www.speedyroute.com/faq.html)

**Google Maps** - Geocoding API to get latitude and longitude for all addresses

**Google Maps Embed API**

**Ngrok** - locally 'remote' deployments

**App Engine** - easy deployment testing (**we deprecated using it**, it was just easier to run off ngrok and same purpose for this project)

# Important

**The web-app performs all operations through the endpoints listed.**

- We have an auto-complete admin function used in the demo in order to efficiently display our web-apps functionality

- In the unlikely case there is a failure on the speedyroute endpoint, there is an error catching block which returns sample data.


Matt and Mihai
