const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

const hostname = 'localhost';
const port = 9876;
const windowSize = 10;
let windowNumbers = [];

app.use(cors());

app.get('/numbers', async (req, res) => {
    try {
        const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE1MTY3NDQ0LCJpYXQiOjE3MTUxNjcxNDQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQ3Y2JlOGNkLTI3ZTctNDdkNy1iNGIyLTVhYzcwMDNmNmE5YyIsInN1YiI6ImRoYXJzaGFuYWd1bmFrYXJAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiU2FtcGxlIiwiY2xpZW50SUQiOiI0N2NiZThjZC0yN2U3LTQ3ZDctYjRiMi01YWM3MDAzZjZhOWMiLCJjbGllbnRTZWNyZXQiOiJKV0haUW5WZHZ6Wmx5TlFaIiwib3duZXJOYW1lIjoiRGhhcnNoYW5hIFNocmVlIiwib3duZXJFbWFpbCI6ImRoYXJzaGFuYWd1bmFrYXJAZ21haWwuY29tIiwicm9sbE5vIjoiOTIxMzIxMjQzMDA4In0.UkjbbPk85QkKlU4piGyAhHdMX9qxnGtqIzvJMaAxMWM' }
        const numberId = req.params.numberid;
        const url = 'http://20.244.56.144/test/fibo';

        const response = await axios.get(url,{headers});
        console.log(response.data);
        const newNumbers = response.data.numbers;
        
        if (response.status !== 200 || !newNumbers || !Array.isArray(newNumbers)) {
            return res.status(500).json({ error: "Failed to fetch numbers from the test server" });
        }
        windowNumbers = updateWindowNumbers(windowNumbers, newNumbers);
        const average = calculateAverage(windowNumbers);
        return res.status(200).json({ 
            numbers: newNumbers, 
            windowPrevState: windowNumbers.slice(0, windowNumbers.length - newNumbers.length), 
            windowCurrState: windowNumbers, 
            avg: average 
        });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

function updateWindowNumbers(windowNumbers, newNumbers) {
    const updatedNumbers = [...windowNumbers, ...newNumbers].slice(-windowSize);
    return [...new Set(updatedNumbers)];
}

function calculateAverage(numbers) {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});