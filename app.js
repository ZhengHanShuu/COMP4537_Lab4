// // Require necessary Node.js modules.
// const http = require('http');
// const url = require('url');
// const { StringDecoder } = require('string_decoder');

// // Initialize an empty array to serve as the in-memory dictionary and a counter for tracking the number of requests.
// let dictionary = [];
// let requestCounter = 0;

// // Create an HTTP server that listens for incoming requests.
// const server = http.createServer((req, res) => {
//   // Increment the request counter for every incoming request.
//   requestCounter++;

//   // Parse the URL to extract the path and query string.
//   const parsedUrl = url.parse(req.url, true);
//   const path = parsedUrl.pathname;
//   // Normalize the path by trimming slashes from the beginning and end.
//   const trimmedPath = path.replace(/^\/+|\/+$/g, '');
//   // Extract query string parameters.
//   const queryStringObject = parsedUrl.query;

//   // Handle GET requests for retrieving a word's definition.
//   if (trimmedPath === 'api/definitions' && req.method === 'GET') {
//     // Extract the word from the query string.
//     const word = queryStringObject.word;
//     // Search the dictionary for the word.
//     const entry = dictionary.find(entry => entry.word === word);

//     // If the word is found, return its definition.
//     if (entry) {
//       res.writeHead(200, {'Content-Type': 'application/json'});
//       res.end(JSON.stringify({ requestNumber: requestCounter, definition: entry.definition }));
//     } else {
//       // If the word is not found, return a 404 error message.
//       res.writeHead(404, {'Content-Type': 'application/json'});
//       res.end(JSON.stringify({ requestNumber: requestCounter, message: `Word: '${word}' not found!` }));
//     }
//   } 
//   // Handle POST requests for adding a new word and its definition.
//   else if (trimmedPath === 'api/definitions' && req.method === 'POST') {
//     const decoder = new StringDecoder('utf-8');
//     let buffer = '';

//     // Collect data chunks from the request body.
//     req.on('data', (data) => {
//       buffer += decoder.write(data);
//     });

//     // Once all data is received, attempt to parse and process it.
//     req.on('end', () => {
//       buffer += decoder.end();

//       try {
//         // Parse the JSON data from the request body.
//         const receivedData = JSON.parse(buffer);

//         // Validate the received data to ensure it contains a word and a definition.
//         if (!receivedData.word || !receivedData.definition || typeof receivedData.word !== 'string' || typeof receivedData.definition !== 'string') {
//           res.writeHead(400, {'Content-Type': 'application/json'});
//           res.end(JSON.stringify({ message: 'Invalid input. Please provide a non-empty string for both word and definition.' }));
//           return;
//         }

//         // Check if the word already exists in the dictionary to prevent duplicates.
//         const existingEntryIndex = dictionary.findIndex(entry => entry.word === receivedData.word);
//         if (existingEntryIndex !== -1) {
//           res.writeHead(400, {'Content-Type': 'application/json'});
//           res.end(JSON.stringify({ message: `Warning! '${receivedData.word}' already exists.` }));
//         } else {
//           // Add the new word and its definition to the dictionary.
//           dictionary.push({ word: receivedData.word, definition: receivedData.definition });
//           res.writeHead(201, {'Content-Type': 'application/json'});
//           res.end(JSON.stringify({ 
//             requestNumber: requestCounter, 
//             totalEntries: dictionary.length,
//             message: `New entry recorded: "${receivedData.word} : ${receivedData.definition}"` 
//           }));
//         }
//       } catch (err) {
//         // Handle any errors that occur during parsing of the request data.
//         res.writeHead(400, {'Content-Type': 'application/json'});
//         res.end(JSON.stringify({ message: 'Error parsing request data. Please send valid JSON.' }));
//       }
//     });
//   } else {
//     // Respond with a 404 error for any requests that don't match the expected paths.
//     res.writeHead(404);
//     res.end('Not Found');
//   }
// });

// // Specify the port number on which the server will listen for requests.
// const PORT = 3000;
// // Start the server.
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


//const cors = require('cors'); // Import the cors module
// const http = require('http');
// const url = require('url');

// // Array to store dictionary entries (word: definition)
// let dictionary = [];

// const server = http.createServer((req, res) => {
//   // Set CORS headers to allow requests from all origins
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   const { pathname, query } = url.parse(req.url, true);

//   if (pathname === '/api/definitions' && req.method === 'POST') {
//     // Handle POST request to create new entry in the dictionary
//     let body = '';

//     req.on('data', (chunk) => {
//       body += chunk;
//     });

//     req.on('end', () => {
//       const newEntry = JSON.parse(body);

//       const existingEntryIndex = dictionary.findIndex(
//         (entry) => entry.word === newEntry.word
//       );

//       if (existingEntryIndex !== -1) {
//         res.writeHead(409, { 'Content-Type': 'application/json' });
//         res.end(
//           JSON.stringify({
//             message: `Warning! '${newEntry.word}' already exists.`,
//           })
//         );
//       } else {
//         dictionary.push(newEntry);
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(
//           JSON.stringify({
//             requestNumber: dictionary.length,
//             message: `New entry recorded: "${newEntry.word}: ${newEntry.definition}"`,
//           })
//         );
//       }
//     });
//   } else if (pathname === '/api/definitions' && req.method === 'GET') {
//     // Handle GET request to retrieve definitions
//     const word = query.word;

//     const entry = dictionary.find((entry) => entry.word === word);

//     if (entry) {
//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify(entry));
//     } else {
//       res.writeHead(404, { 'Content-Type': 'application/json' });
//       res.end(
//         JSON.stringify({
//           requestNumber: dictionary.length + 1,
//           message: `Word '${word}' not found!`,
//         })
//       );
//     }
//   } else {
//     // Handle other requests (e.g., return 404 Not Found)
//     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     res.end('404 Not Found');
//   }
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// const http = require('http');
// const url = require('url');

// // Array to store dictionary entries (word: definition)
// let dictionary = [];

// const server = http.createServer((req, res) => {
//   // Set CORS headers to allow requests from all origins
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   // Check for preflight requests (OPTIONS) and handle them immediately
//   if (req.method === 'OPTIONS') {
//     res.writeHead(200);
//     res.end();
//     return;
//   }

//   const { pathname, query } = url.parse(req.url, true);

//   if (pathname === '/api/definitions' && req.method === 'POST') {
//     // Handle POST request to create new entry in the dictionary
//     let body = '';

//     req.on('data', (chunk) => {
//       body += chunk;
//     });

//     req.on('end', () => {
//       const newEntry = JSON.parse(body);

//       const existingEntryIndex = dictionary.findIndex(
//         (entry) => entry.word === newEntry.word
//       );

//       if (existingEntryIndex !== -1) {
//         res.writeHead(409, { 'Content-Type': 'application/json' });
//         res.end(
//           JSON.stringify({
//             message: `Warning! '${newEntry.word}' already exists.`,
//           })
//         );
//       } else {
//         dictionary.push(newEntry);
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(
//           JSON.stringify({
//             requestNumber: dictionary.length,
//             message: `New entry recorded: "${newEntry.word}: ${newEntry.definition}"`,
//           })
//         );
//       }
//     });
//   } else if (pathname === '/api/definitions' && req.method === 'GET') {
//     // Handle GET request to retrieve definitions
//     const word = query.word;

//     const entry = dictionary.find((entry) => entry.word === word);

//     if (entry) {
//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify(entry));
//     } else {
//       res.writeHead(404, { 'Content-Type': 'application/json' });
//       res.end(
//         JSON.stringify({
//           requestNumber: dictionary.length + 1,
//           message: `Word '${word}' not found!`,
//         })
//       );
//     }
//   } else {
//     // Handle other requests (e.g., return 404 Not Found)
//     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     res.end('404 Not Found');
//   }
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const http = require('http');
// const url = require('url');

// // Array to store dictionary entries (word: definition)
// let dictionary = [];

// const server = http.createServer((req, res) => {
//   // Set CORS headers to allow requests from all origins
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   // Check for preflight requests (OPTIONS) and handle them immediately
//   if (req.method === 'OPTIONS') {
//     res.writeHead(200);
//     res.end();
//     return;
//   }

//   const { pathname, query } = url.parse(req.url, true);

//   if (pathname === '/api/definitions' && req.method === 'POST') {
//     // Handle POST request to create new entry in the dictionary
//     let body = '';

//     req.on('data', (chunk) => {
//       body += chunk;
//     });

//     req.on('end', () => {
//       const newEntry = JSON.parse(body);

//       // Log the new entry received
//       console.log('Received new entry:', newEntry);

//       const existingEntryIndex = dictionary.findIndex(
//         (entry) => entry.word === newEntry.word
//       );

//       if (existingEntryIndex !== -1) {
//         // Log if entry already exists
//         console.log(`Entry '${newEntry.word}' already exists`);
//         res.writeHead(409, { 'Content-Type': 'application/json' });
//         res.end(
//           JSON.stringify({
//             message: `Warning! '${newEntry.word}' already exists.`,
//           })
//         );
//       } else {
//         dictionary.push(newEntry);
//         // Log the new entry recorded
//         console.log(`New entry recorded: "${newEntry.word}: ${newEntry.definition}"`);
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(
//           JSON.stringify({
//             requestNumber: dictionary.length,
//             message: `New entry recorded: "${newEntry.word}: ${newEntry.definition}"`,
//           })
//         );
//       }
//     });
//   } else if (pathname === '/api/definitions' && req.method === 'GET') {
//     // Handle GET request to retrieve definitions
//     const word = query.word;

//     const entry = dictionary.find((entry) => entry.word === word);

//     if (entry) {
//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify(entry));
//     } else {
//       res.writeHead(404, { 'Content-Type': 'application/json' });
//       res.end(
//         JSON.stringify({
//           requestNumber: dictionary.length + 1,
//           message: `Word '${word}' not found!`,
//         })
//       );
//     }
//   } else {
//     // Handle other requests (e.g., return 404 Not Found)
//     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     res.end('404 Not Found');
//   }
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

/**
 * Chat GPT was used to comment all of the code 
 * Chat GPT was also used in the code to respond to preflight options requests.
 * 
 */

// const http = require("http");
// const urlModule = require("url");

// // Initialize dictionary as an array to store word-definition objects
// let dictionary = [];
// let totalRequests = 0; // Counter for total number of requests

// const server = http.createServer((req, res) => {
//   totalRequests++; // Increment total requests on each call

//   // Set CORS headers to ensure cross-origin requests are handled
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   // Respond to preflight OPTIONS requests by confirming that the requested methods are allowed
//   // Chat Gpt provided this code
//   if (req.method === "OPTIONS") {
//     res.writeHead(204);
//     res.end();
//     return;
//   }

//   // Extract the method and URL from the request
//   const { method, url } = req;

//   // Parse the URL to get query parameters and pathname
//   const parsedUrl = urlModule.parse(url, true);
//   const pathname = parsedUrl.pathname;

//   // Process GET and POST requests on "/api/definitions" path
//   if (pathname === "/api/definitions") {

//     // Handle GET requests to fetch a word's definition
//     if (method === "GET") {
//       const { word } = parsedUrl.query; // Extract the word being searched for
//       const entry = dictionary.find((entry) => entry.word === word); // Find the entry in the dictionary
//       res.writeHead(200, { "Content-Type": "application/json" });
//       if (entry) {
//         // If the word is found, return the word and its definition
//         res.end(JSON.stringify({ word: entry.word, definition: entry.definition, totalRequests, totalEntries: dictionary.length }));
//       } else {
//         // If not found, inform the requester that the word was not found
//         res.end(JSON.stringify({ error: "Word not found", totalRequests, totalEntries: dictionary.length }));
//       }
//     }

//       // Handle POST requests to add a new word and its definition 
//     else if (method === "POST") {
//       let body = "";
//       req.on("data", (chunk) => {
//         // Collect data chunks into the body
//         body += chunk.toString();
//       });
//       req.on("end", () => {
//         // Once all data is received, try to parse it as JSON
//         try {
//           const { word, definition } = JSON.parse(body);
//           // Validate the inputs
//           if (!word || typeof word !== "string" || !definition || typeof definition !== "string") {
//             res.writeHead(400, { "Content-Type": "application/json" });
//             res.end(JSON.stringify({ error: "Invalid input. Both word and definition must be strings." }));
//             return;
//           }
//           // Check if the word already exists
//           if (dictionary.some((entry) => entry.word === word)) {
//             res.writeHead(409, { "Content-Type": "application/json" });
//             res.end(JSON.stringify({ error: `The word '${word}' already exists.`, totalRequests, totalEntries: dictionary.length }));
//           } else {
//             // Add the new word and definition to the dictionary
//             dictionary.push({ word, definition });
//             res.writeHead(201, { "Content-Type": "application/json" });
//             res.end(JSON.stringify({
//               message: `Word '${word}' added successfully.`,
//               totalRequests,
//               totalEntries: dictionary.length
//             }));
//           }
//         } catch (e) {
//           // Handle JSON parsing errors
//           res.writeHead(400, { "Content-Type": "application/json" });
//           res.end(JSON.stringify({ error: "Bad request. Unable to parse JSON." }));
//         }
//       });
//     } else {
//         // Respond with 405 Method Not Allowed if any other method is used
//       res.writeHead(405, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ error: "Method not allowed" }));
//     }
//   } else {
//     // Respond with 404 Not Found if the path does not match "/api/definitions"
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Not Found" }));
//   }
// });

// // Start the server on the specified port from heroku or 8083 if not specified
// const PORT = process.env.PORT || 8083;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


const http = require("http");
const urlModule = require("url");

// Initialize dictionary as an array to store word-definition objects
let dictionary = [];
let totalRequests = 0; // Counter for total number of requests

const server = http.createServer((req, res) => {
  totalRequests++; // Increment total requests on each call

  // Set CORS headers to ensure cross-origin requests are handled
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Respond to preflight OPTIONS requests by confirming that the requested methods are allowed
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Extract the method and URL from the request
  const { method, url } = req;

  // Parse the URL to get query parameters and pathname
  const parsedUrl = urlModule.parse(url, true);
  const pathname = parsedUrl.pathname;

  // Process GET and POST requests on "/api/definitions" path
  if (pathname === "/api/definitions") {
    if (method === "GET") {
      // Handle GET requests to fetch a word's definition
      const { word } = parsedUrl.query; // Extract the word being searched for
      const entry = dictionary.find((entry) => entry.word === word); // Find the entry in the dictionary
      res.writeHead(200, { "Content-Type": "application/json" });
      if (entry) {
        // If the word is found, return the word and its definition
        res.end(JSON.stringify({ word: entry.word, definition: entry.definition, totalRequests, totalEntries: dictionary.length }));
      } else {
        // If not found, inform the requester that the word was not found
        res.end(JSON.stringify({ error: "Word not found", totalRequests, totalEntries: dictionary.length }));
      }
    } else if (method === "POST") {
      // Handle POST requests to add a new word and its definition 
      let body = "";
      req.on("data", (chunk) => {
        // Collect data chunks into the body
        body += chunk.toString();
      });
      req.on("end", () => {
        // Once all data is received, try to parse it as JSON
        try {
          const { word, definition } = JSON.parse(body);
          // Validate the inputs
          if (!word || typeof word !== "string" || !definition || typeof definition !== "string") {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid input. Both word and definition must be strings." }));
            return;
          }
          // Check if the word already exists
          if (dictionary.some((entry) => entry.word === word)) {
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: `The word '${word}' already exists.`, totalRequests, totalEntries: dictionary.length }));
          } else {
            // Add the new word and definition to the dictionary
            dictionary.push({ word, definition });
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
              message: `Word '${word}' added successfully.`,
              totalRequests,
              totalEntries: dictionary.length
            }));
          }
        } catch (e) {
          // Handle JSON parsing errors
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Bad request. Unable to parse JSON." }));
        }
      });
    } else {
      // Respond with 405 Method Not Allowed if any other method is used
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Method not allowed" }));
    }
  } else if (pathname === "/api/counts" && method === "GET") {
    // Return counts of words, definitions, and list of words and definitions
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ totalWords: dictionary.length, totalDefinitions: countTotalDefinitions(), words: getWords(), definitions: getDefinitions() }));
  } else {
    // Respond with 404 Not Found for unknown paths
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

// Function to count total definitions in the dictionary
function countTotalDefinitions() {
  let total = 0;
  dictionary.forEach(entry => {
    if (entry.definition) {
      total++;
    }
  });
  return total;
}

// Function to get a list of words
function getWords() {
  return dictionary.map(entry => entry.word);
}

// Function to get a list of definitions
function getDefinitions() {
  return dictionary.filter(entry => entry.definition).map(entry => entry.definition);
}

// Start the server on the specified port from heroku or 8083 if not specified
const PORT = process.env.PORT || 8083;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  // Log all words and their definitions stored in the dictionary
  console.log("All words and definitions stored in the dictionary:");
  dictionary.forEach(entry => {
    console.log(`Word: ${entry.word}, Definition: ${entry.definition}`);
  });
});

