const http = require('http');
const fs = require('fs');

const imagePaths = ['image/nature_photo1.jpg', 'image/nature_photo2.jpg', 'image/nature_photo3.jpg', 'image/nature_photo4.jpg', 'image/nature_photo5.jpg'];

const server = http.createServer((req, res) => {
    // Start the HTML response
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<html><head>');
    res.write('<style>');
    // CSS animation for images
    res.write(`
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .image {
            margin: 5px;
            max-width: 19%;
            animation: slideIn 1s ease-in-out;
        }
    `);
    res.write('</style>');
    res.write('</head><body>');
    res.write('<h1>Welcome to Kumrat Valley!</h1>');
    res.write('Kumrat Valley is a picturesque valley located in the Upper Dir district of Khyber Pakhtunkhwa, Pakistan. The valley is known for its pristine beauty, with crystal-clear streams, lush green meadows, and snow-capped peaks. The area is home to several unique species of flora and fauna, including the Himalayan musk deer and the snow leopard. Kumrat Valley is a popular destination for trekkers, hikers, and nature lovers, offering a range of outdoor activities such as camping, fishing, and rafting. The valley is relatively undiscovered and unspoiled, making it an ideal destination for those seeking an off-the-beaten-path adventure.');
    // Create a container div for images
    res.write('<div style="display: flex; max-width: 100%;">');

    // Function to read image file and embed in HTML
    function readAndEmbedImage(imagePath, index) {
        return new Promise((resolve, reject) => {
            fs.readFile(imagePath, (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    // Set width of each image to occupy 20% of the screen width
                    const delayInSeconds = index * 2; // Delay in seconds
                    res.write(`<img class="image" style="animation-delay: ${delayInSeconds}s;" src="data:image/jpeg;base64,${Buffer.from(data).toString('base64')}" />`);
                    resolve();
                }
            });
        });
    }

    // Use Promise.all to ensure all images are read before sending the response
    Promise.all(imagePaths.map(readAndEmbedImage))
        .then(() => {
            // End the container div
            res.write('</div>');
            // End the HTML response
            res.write('</body></html>');
            res.end();
        })
        .catch((err) => {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
        });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
