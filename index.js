// Loading libraries
const express = require('express');
const morgan = require('morgan');
const fortuneCookies = require('fortune-cookie');
const cors = require('cors');

const cookies = () => {
    const idx = Math.floor(Math.random() * fortuneCookies.length);
    return fortuneCookies[idx];
}

// Configuration
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;

// Create an instance of express
const app = express();

// Use morgan to log all request. Use the combined form;
app.use(morgan('combined'));

// Resources
// GET /api/cookie
// Add CORS, chaining middleware
app.get('/api/cookie', cors(), (req, res, next) => {
    const count = parseInt(req.query['count']) || 1;

    res.status(200);
    res.type('application/json');
    if (count == 1) {
        res.json({ cookie: cookies() })
    }
    else {
        const c = [];
        for (let i = 0; i < count; i++) {
            c.push({cookie: cookies()});
        };
        res.json(c);
    };
});

app.use(express.static(__dirname + '/frontend'))

// Start up application
app.listen(PORT, () => {
    console.info(`Application started on PORT ${PORT} at ${new Date()}`);
});