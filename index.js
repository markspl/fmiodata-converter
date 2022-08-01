/**
 * FMIDATA Converter - Fetch and convert XML data to JSON
 * Author: Markus Palomäki (github/markspl)
 */

const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());

// Front page
const getFrontpage = (req, res) => {
    res.send("Front page");
};

// Get weather
const getWeather = (req, res) => {
    res.send("wip");
};

// All available sites
app.get("/", getFrontpage);
app.get("/weather", getWeather);
app.get("*", (req, res) => {
    res.status(404).send("Not found");
});

app.listen(PORT, () => {
    console.log(`Up and running on port ${PORT}.`)
});