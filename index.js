/**
 * FMIODATA Converter - Fetch and convert XML data to JSON
 * Author: Markus Palomäki (github/markspl)
 */

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());

// Front page
const getFrontpage = (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
};

// Get weather
const getWeather = async (req, res) => {
    const location = req.params.location;
    res.send(`Location: ${location}<br><br>WIP`);
};

// All available sites
app.get("/", getFrontpage);
app.get("/weather", (req, res) => {
    res.send("Weather forecast API");
})
app.get("/weather/:location", getWeather);

// Show README correctly
app.use("/README.md", express.static(__dirname + "/README.md"));
app.use("/images/", express.static(__dirname + "/images/"));

// Not found fallback
app.get("*", (req, res) => {
    res.status(404).send("Not found");
});

app.listen(PORT, () => {
    console.log(`Up and running on port ${PORT}.`)
});