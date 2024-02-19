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


const http = require('http');
const url = require('url');

let dictionary = [];
let requestCount = 0;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const wordQuery = parsedUrl.query.word;
    const path = parsedUrl.pathname;
    requestCount++;

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Enable CORS
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // POST request to add a new definition
    if (req.method === 'POST' && path === '/api/definitions') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const entry = JSON.parse(body);
            const existingEntry = dictionary.find(d => d.word === entry.word);
            if (existingEntry) {
                res.end(JSON.stringify({ message: `Warning! '${entry.word}' already exists.`, requestCount, dictionaryLength: dictionary.length }));
            } else {
                dictionary.push(entry);
                res.end(JSON.stringify({ message: `Request #${requestCount}: New entry recorded: "${entry.word} : ${entry.definition}"`, requestCount, dictionaryLength: dictionary.length }));
            }
        });

    // GET request to retrieve a definition
    } else if (req.method === 'GET' && path === '/api/definitions/') {
        const definition = dictionary.find(d => d.word === wordQuery);
        if (definition) {
            res.end(JSON.stringify({ message: `Request #${requestCount}: Found`, word: definition.word, definition: definition.definition }));
        } else {
            res.end(JSON.stringify({ message: `Request #${requestCount}: word '${wordQuery}' not found!` }));
        }

    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

const PORT = 3000; // Use the appropriate port for your configuration
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

