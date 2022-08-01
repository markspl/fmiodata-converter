<h1 align="center">FMIODATA-CONVERTER</h1>
<h3 align="center">from XML to JSON</h3>

- - -

This API is for to fetch data from The Finnish Meteorological Institute's Open Data, and convert it from `XML` to `JSON`.

The data is **forecast data**, which is updated every 6 hours. It shows, for example, temperature from 2m height, air pressure, cloud coverage, the amount of rain etc 48 hours forward.

>ℹ **This converter uses HIRLAM-model which use FMI will be discontinued in September 2022.**
>
>*"--, HARMONIE (MEPS) model is capable of 2.5 km horizontal resolution (compared to 7.5 km of HIRLAM) and able to predict small scale phenomena more accurately."*

- - -

### `WeatherSymbol3` parameters

The data also includes `WeatherSymbol3` parameters, which is described in [fmidev's opendata-resources](https://github.com/fmidev/opendata-resources/)

<details>
<summary>Click to open/close</summary>

```bash
ID WEATHER
1  clear / selkeää
2  partly cloudy / puolipilvistä
3  clouds / pilvistä
21 light showers / heikkoja sadekuuroja
22 showers / sadekuuroja
23 heavy showers voimakkaita sadekuuroja
31 light rain / heikkoa vesisadetta
32 rain / vesisadetta
33 heavy rain / voimakasta vesisadetta
41 light snow showers / heikkoja lumikuuroja
42 snow showers / lumikuuroja
43 heavy snow showers / voimakkaita lumikuuroja
51 light snow / heikkoa lumisadetta
52 snowfall / lumisadetta
53 heavy snow / voimakasta lumisadetta
61 thunderstorms / ukkoskuuroja
62 heavy thunderstorms / voimakkaita ukkoskuuroja
63 thunderstorms / ukkosta
64 heavy thunderstorms / voimakasta ukkosta
71 weak sleet / heikkoja räntäkuuroja
72 sleet / räntäkuuroja
73 heavy sleet / voimakkaita räntäkuuroja
81 light sleet / heikkoa räntäsadetta
82 showers / räntäsadetta
83 heavy sleet / voimakasta räntäsadetta
91 mist / utua
92 fog / sumua
```
</details>

### JSON output data explained
<details open>
<summary>Click to open/close</summary>

```json
{
  "place": "Jyvaskyla",                             // Location. Returns 400 if [Bad Request]
  "measurements": {
    "DewPoint": {                                   // Measurement type
      "label": "Dew point",                         // Description for the data
      "symbol": "°C",                               // Symbol for the measurement. If doesn't have = ""
      "values": [{                                  // Array[{time,value}]
              "time": "2021-03-28T20:00:00Z",       // Time for the forecast
              "value": "-2.6"                       // Predicted value at the time
          }, {
              "time": "2021-03-28T21:00:00Z",
              "value": "-2.85"
          }
      ]
    },
    "GeopHeight": {...},                            // Geopotential height         ""
    "HighCloudCover": {...},                        // High cloud cover            %
    "Humidity": {...},                              // Humidity                    %
    "LandSeaMask": {...},                           // Land-sea mask               ""
    "LowCloudCover": {...},                         // LowCloudCover               %
    "MaximumWind": {...},                           // Maximum wind speed          m/s
    "MediumCloudCover": {...},                      // Medium cloud cover          %
    "Precipitation1h": {...},                       // Precipitation amount 1 hour mm/h
    "PrecipitationAmount": {...},                   // Precipitation amount        mm
    "Pressure": {...},                              // Air pressure                hPa
    "RadiationDiffuseAccumulation": {...},          // Diffuse short wave radiation accumulation at the surface   J/m^2
    "RadiationGlobalAccumulation": {...},           // Global radiation accumulation                              J/m^2
    "RadiationLWAccumulation": {...},               // Long wave radiation accumulation                           J/m^2
    "RadiationNetSurfaceLWAccumulation": {...},     // Net thermal radiation accumulation at the surface          J/m^2
    "RadiationNetSurfaceSWAccumulation": {...},     // Net short wave radiation accumulation at the surface       J/m^2
    "Temperature": {...},                           // Air temperature             °C
    "TotalCloudCover": {...},                       // Total cloud cover           %
    "WeatherSymbol3": {...},                        // Weather                     ""
    "WindDirection": {...},                         // Wind                        deg
    "WindGust": {...},                              // Wind gust                   m/s
    "WindSpeedMS": {...},                           // Wind speed                  m/s
    "WindUMS": {...},                               // U-component of wind vector  m/s
    "WindVMS": {...}                                // V-component of wind         m/s
  }
}
}
```

</details>

- - -
## Example

### Snip from XML input data (original file: 6569 rows)
<details>
<summary>Click to open/close</summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<wfs:FeatureCollection
    timeStamp="2022-08-01T13:37:03Z"
    numberMatched="24"
    numberReturned="24"
    xmlns:wfs="http://www.opengis.net/wfs/2.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:om="http://www.opengis.net/om/2.0"
    xmlns:omso="http://inspire.ec.europa.eu/schemas/omso/3.0"
    xmlns:ompr="http://inspire.ec.europa.eu/schemas/ompr/3.0"
    xmlns:gml="http://www.opengis.net/gml/3.2"
    xmlns:gmd="http://www.isotc211.org/2005/gmd"
    xmlns:gco="http://www.isotc211.org/2005/gco"
    xmlns:swe="http://www.opengis.net/swe/2.0"
    xmlns:gmlcov="http://www.opengis.net/gmlcov/1.0"
    xmlns:sam="http://www.opengis.net/sampling/2.0"
    xmlns:sams="http://www.opengis.net/samplingSpatial/2.0"
    xmlns:wml2="http://www.opengis.net/waterml/2.0"
    xmlns:target="http://xml.fmi.fi/namespace/om/atmosphericfeatures/1.1"
    xsi:schemaLocation="http://www.opengis.net/wfs/2.0 http://schemas.opengis.net/wfs/2.0/wfs.xsd
    http://www.opengis.net/gmlcov/1.0 http://schemas.opengis.net/gmlcov/1.0/gmlcovAll.xsd
    http://www.opengis.net/sampling/2.0 http://schemas.opengis.net/sampling/2.0/samplingFeature.xsd
    http://www.opengis.net/samplingSpatial/2.0 http://schemas.opengis.net/samplingSpatial/2.0/spatialSamplingFeature.xsd
    http://www.opengis.net/swe/2.0 http://schemas.opengis.net/sweCommon/2.0/swe.xsd
    http://inspire.ec.europa.eu/schemas/omso/3.0 https://inspire.ec.europa.eu/schemas/omso/3.0/SpecialisedObservations.xsd
    http://inspire.ec.europa.eu/schemas/ompr/3.0 https://inspire.ec.europa.eu/schemas/ompr/3.0/Processes.xsd
    http://www.opengis.net/waterml/2.0 http://schemas.opengis.net/waterml/2.0/waterml2.xsd
    http://xml.fmi.fi/namespace/om/atmosphericfeatures/1.1 https://xml.fmi.fi/schema/om/atmosphericfeatures/1.1/atmosphericfeatures.xsd">

    
<wfs:member>
        <omso:PointTimeSeriesObservation gml:id="WFS-qW_<long-string>--Temperature">
	        
	    <om:phenomenonTime xlink:href="#time-interval-1-1"/>
	    <om:resultTime xlink:href="#time-1-1"/>

	    <om:procedure xlink:href="http://xml.fmi.fi/inspire/process/hirlam"/>
	                <om:parameter>
                <om:NamedValue>
                    <om:name xlink:href="https://inspire.ec.europa.eu/codeList/ProcessParameterValue/value/numericalModel/analysisTime"/>
                    <om:value>
                        <gml:TimeInstant gml:id="analysis-time-1-1-Temperature--"> 
                            <gml:timePosition>2022-08-01T06:00:00Z</gml:timePosition>
                           
                        </gml:TimeInstant>
                    </om:value>
                </om:NamedValue>
            </om:parameter>

            <om:observedProperty  xlink:href="https://opendata.fmi.fi/meta?observableProperty=forecast&amp;param=Temperature&amp;language=eng"/>
	                <om:featureOfInterest>
                <sams:SF_SpatialSamplingFeature gml:id="enn-s-1-1-Temperature">
          <sam:sampledFeature>
		<target:LocationCollection gml:id="sampled-target-1-1-Temperature">
		    <target:member>
		    <target:Location gml:id="forloc-geoid-634963-pos-Temperature">
		        <gml:identifier codeSpace="http://xml.fmi.fi/namespace/stationcode/geoid">634963</gml:identifier>
			<gml:name codeSpace="http://xml.fmi.fi/namespace/locationcode/name">Tampere</gml:name>
			<gml:name codeSpace="http://xml.fmi.fi/namespace/locationcode/geoid">634963</gml:name>
			<target:representativePoint xlink:href="#point-634963-Temperature"/>
			<target:country codeSpace="http://xml.fmi.fi/namespace/location/country">Finland</target:country>
			<target:timezone>Europe/Helsinki</target:timezone>
			<target:region codeSpace="http://xml.fmi.fi/namespace/location/region">Finland</target:region>	   			
		    </target:Location></target:member>
		</target:LocationCollection>
 	   </sam:sampledFeature>
                <sams:shape>
                    <gml:MultiPoint gml:id="foi-multipoint-1-1-Temperature">
                        <gml:pointMembers> 
                           <gml:Point gml:id="point-634963-Temperature" srsName="http://www.opengis.net/def/crs/EPSG/0/4258" srsDimension="2">
                               <gml:name>Tampere</gml:name>
                               <gml:pos>61.49911 23.78712 </gml:pos>
                           </gml:Point>
                        </gml:pointMembers>
                    </gml:MultiPoint>
                </sams:shape>
            </sams:SF_SpatialSamplingFeature>
        </om:featureOfInterest>
                        <om:result>
                    <wml2:MeasurementTimeseries gml:id="mts-1-1-Temperature">  
                        <wml2:point>
                            <wml2:MeasurementTVP> 
                                      <wml2:time>2022-08-01T14:00:00Z</wml2:time>
				      <wml2:value>23.27</wml2:value> 
                            </wml2:MeasurementTVP>
                        </wml2:point>                          
                        <wml2:point>
                            <wml2:MeasurementTVP> 
                                      <wml2:time>2022-08-01T15:00:00Z</wml2:time>
				      <wml2:value>21.39</wml2:value> 
                            </wml2:MeasurementTVP>
                        </wml2:point>                          
                        <wml2:point>
                            <wml2:MeasurementTVP> 
                                      <wml2:time>2022-08-01T16:00:00Z</wml2:time>
				      <wml2:value>20.99</wml2:value> 
                            </wml2:MeasurementTVP>
                        </wml2:point>                          
                        <wml2:point>
                            <wml2:MeasurementTVP> 
                                      <wml2:time>2022-08-01T17:00:00Z</wml2:time>
				      <wml2:value>19.99</wml2:value> 
                            </wml2:MeasurementTVP>
                        </wml2:point>                          
                        <wml2:point>
                            <wml2:MeasurementTVP> 
                                      <wml2:time>2022-08-01T18:00:00Z</wml2:time>
				      <wml2:value>18.36</wml2:value> 
                            </wml2:MeasurementTVP>
                        </wml2:point>                          
                        <wml2:point>
                            <wml2:MeasurementTVP> 
                                      <wml2:time>2022-08-01T19:00:00Z</wml2:time>
				      <wml2:value>17.56</wml2:value> 
                            </wml2:MeasurementTVP>
                        </wml2:point>                          
                        <wml2:point>
                            <wml2:MeasurementTVP> 
                                      <wml2:time>2022-08-01T20:00:00Z</wml2:time>
				      <wml2:value>17.02</wml2:value> 
                            </wml2:MeasurementTVP>
                        </wml2:point>                          
                        <wml2:point>
                            <wml2:MeasurementTVP> 
                                      <wml2:time>2022-08-01T21:00:00Z</wml2:time>
				      <wml2:value>15.99</wml2:value> 
                            </wml2:MeasurementTVP>
                        </wml2:point>                          
                        <wml2:point>
                            <wml2:MeasurementTVP> 
                                      <wml2:time>2022-08-01T22:00:00Z</wml2:time>
				      <wml2:value>15.67</wml2:value> 
                            </wml2:MeasurementTVP>
                        </wml2:point>                          
                        <wml2:point>
                            <wml2:MeasurementTVP> 
                                      <wml2:time>2022-08-01T23:00:00Z</wml2:time>
				      <wml2:value>15.02</wml2:value> 
                            </wml2:MeasurementTVP>
                        </wml2:point>                          
                        <wml2:point>
                            <wml2:MeasurementTVP> 
                                      <wml2:time>2022-08-02T00:00:00Z</wml2:time>
				      <wml2:value>14.44</wml2:value> 
                            </wml2:MeasurementTVP>
                        </wml2:point>
                    </wml2:MeasurementTimeseries>
                </om:result>
        </omso:PointTimeSeriesObservation>
    </wfs:member>
</wfs:FeatureCollection>
```
</details>

### Same as JSON after parsing and cleaning (3605 rows)
<details open>
<summary>Click to open/close</summary>

```json
{
    "place": "Helsinki",
    "measurements": {
        "Temperature": {
            "label": "Air temperature",
            "symbol": "°C",
            "values": [
            {
                "time": "2022-08-01T14:00:00Z",
                "value": "23.27"
            },
            {
                "time": "2022-08-01T15:00:00Z",
                "value": "21.39"
            },
            {
                "time": "2022-08-01T16:00:00Z",
                "value": "20.99"
            },
            {
                "time": "2022-08-01T17:00:00Z",
                "value": "19.99"
            },
            {
                "time": "2022-08-01T18:00:00Z",
                "value": "18.36"
            },
            {
                "time": "2022-08-01T19:00:00Z",
                "value": "17.56"
            },
            {
                "time": "2022-08-01T20:00:00Z",
                "value": "17.02"
            },
            {
                "time": "2022-08-01T21:00:00Z",
                "value": "15.99"
            },
            {
                "time": "2022-08-01T22:00:00Z",
                "value": "15.67"
            },
            {
                "time": "2022-08-01T23:00:00Z",
                "value": "15.02"
            },
            {
                "time": "2022-08-02T00:00:00Z",
                "value": "14.44"
            }
        }
    }
}
```
- - -

- Open Data License - Finnish Meteorological Institute:
 - English: https://en.ilmatieteenlaitos.fi/open-data-licence
 - Finnish: https://www.ilmatieteenlaitos.fi/avoin-data-lisenssi
- Creative Commons page: https://creativecommons.org/licenses/by/4.0/deed.fi

><br><a href="https://ilmatieteenlaitos.studio.crasman.fi/bank/julkinen__public/fmiodata"><img src="images/il-avoin-data-logo-rgb.png" alt="FMIODATA" width="200"/></a>
><br>Data is protected with Creative Commons Attribution 4.0 International license.<br><br>

- - -

## To-Do
- Show fetched and cleaned data on the api
- Change from HIRLAM model to more accurate HARMONIE (MEPS)
- API for fetching current weather