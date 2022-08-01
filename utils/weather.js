/**
 * FMIODATA Converter - Fetch and convert XML data to JSON
 * Author: Markus Palomäki (github/markspl)
 * 
 * weather - Fetch data from The Finnish Meteorological Institute's Open Data (FMIODATA)
 * https://en.ilmatieteenlaitos.fi/open-data
 * 
 * "The Finnish Meteorological Institute has made its data sets freely available for public use.
 * The data sets are available in machine-readable, digital format. There are also some computer programs
 * developed at the Institute that have released as open-source code."
 * 
 * The data is licensed using CC BY 4.0
 * https://creativecommons.org/licenses/by/4.0/deed
 * 
 * Example address:
 * https://opendata.fmi.fi/wfs?request=getFeature&storedquery_id=fmi::forecast::hirlam::surface::point::timevaluepair&place=Tampere
 */

const xml2js = require("xml2js");
const axios = require("axios");

const getLabels = require("./labels.js").getLabels;

// Dev
const fs = require("fs");
const testXML = fs.readFileSync("./test/weather-input.xml", "utf-8");

/**
 * Fetch location's forecast data from `opendata.fmi.fi`
 * @param {string} location - Given location
 */
const getForecast = async function (location = "Helsinki") {
    // Construct request address
    //const endpoint = "https://opendata.fmi.fi/wfs?";
    //const request = `request=getFeature&storedquery_id=fmi::forecast::hirlam::surface::point::timevaluepair&place=${location}`;
    //const address = endpoint + request;

    //const req = await axios.get(address);

    // Parse XML to JSON using xml2js
    // ignoreAttrs = ignore all XML attributes and only create text nodes
    // mergeAttrs = Merge attributes and child elements as properties of the parent
    const parser = new xml2js.Parser({
        ignoreAttrs: false,
        mergeAttrs: true
    });
    let result = {};

    //const convert = await parser.parseStringPromise(req.data, (err, data) => {
    parser.parseString(testXML, (err, data) => {
        result.err = err;
        result.data = data;
    });

    // At this point, XML converted to JSON (raw text without cleaning)
    // console.log(JSON.stringify(result.data));

    // Clean raw JSON
    const cleaned = await cleanJSON(location, result.data);

    // Result
    console.log(JSON.stringify(cleaned));
}

/**
 * Clean JSON and return needed information only
 * @param {string} data - Fetched JSON result
 */
const cleanJSON = async (location, data) => {
    let cleanedData = {};

    const collection = data["wfs:FeatureCollection"]["wfs:member"];

    cleanedData.location = location;
    cleanedData.measurements = {};

    let measurementData = ["", "", ""];

    for (let i = 0; i < collection.length; i++) {
        let m = collection[i]["omso:PointTimeSeriesObservation"][0]["om:result"][0]["wml2:MeasurementTimeseries"][0];
        let measurement = m["gml:id"][0];

        // Name for the measurement
        let measurementID = measurement.split("-").pop();

        // Update measurement information
        getLabels(measurementID, measurementData);

        // Start populating data starting with label and symbol
        cleanedData.measurements[measurementID] = {
            "label": measurementData[0],
            "symbol": measurementData[1],
            "values": []
        };

        // Add values (time, value)
        for (let j = 0; j < m["wml2:point"].length; j++) {
            cleanedData.measurements[measurementID].values.push({
                "time": m["wml2:point"][j]["wml2:MeasurementTVP"][0]["wml2:time"][0],
                "value": m["wml2:point"][j]["wml2:MeasurementTVP"][0]["wml2:value"][0]
            });
        }
    }

    return (cleanedData);
}

getForecast();