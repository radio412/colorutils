# Colorutils for Heatmapping
This is a simple color function set for dynamic range heat mapping. Any number of colors can be input with weighting, and measure sets can be converted to colors. Alpha is supported.

## Working with the library:
Before jumping into the examples below, let's define some example colors to work with. The library accepts colors as 4 position arrays (r, g, b, a) in 0-255 format:
```sh
Red = [255, 0, 0, 255];
Yellow =  [254, 232, 75, 255];
Green = [142, 196, 73, 255];
Blue = [21, 137, 208, 255];
```
## Create a simple fade

Call rgbaFadeSet with an array, alternating between colors and span values:
```sh
colorutils.rgbaFadeSet([Red, 100, Yellow]); // creates 100 colors between red and yellow
colorutils.rgbaFadeSet([Red, 70, Yellow, 30, Blue]); //creates 70 colors between red and yellow and 30 between yellow and blue.
```
The Results of which can be used to create a legend with any method you choose. Here I used divs:
![Alt text](http://i.imgur.com/gjkc688.png)

## Convert numeric data to positions along the color spectrum

You can feed the results of the rgbaFadeSet function back into the convertMeasuresToColors function. Values can be negative, and a domain may be specified. Setting the domain does not clamp! Color functions should not be in charge of clamping anything.

```sh
var colorSet = colorutils.rgbaFadeSet([Red, 70, Yellow, 30, Blue]);
var measures = [-54,23,12,16,-68,-24,19,22,-15,44,33,78,11];
var domain = [-100,100];
var measureColors = colorutils.convertMeasuresToColors(measures, colorSet, domain);
```
## Formatting the output for css, kml, etc
The method rgbaFadeSet returns an array with 4 child arrays: [Rs,Gs,Bs,As]. You can also use colorutils to pass the resulting colorSet into the method convertRGBAArrays to receive an array of colors formatted to different types. Available functions are colorutils.rgbToHex, colorutils.rgbToXHex, colorutils.rgbToHexPound, colorutils.rgbToCSSRGB, and colorutils.rgbToHexForKML. You can also pass in an anonymous function which receives r, g, b, and a as parameters. If no formatting function is supplied, it defaults to rgbToCSSRGB. The KML color converter is handy for working with KML in mapping such as googlemaps and leaflet.

```sh
var colorSet = colorutils.rgbaFadeSet([Red, 70, Yellow, 30, Blue]);
var hexSet = colorutils.convertRGBAArrays(colorSet);
var hexSet = colorutils.convertRGBAArrays(colorSet, colorutils.rgbToHexPound);
var test = colorutils.convertRGBAArrays(colorSet, function(r,g,b,a){ 
		console.log(r,g,b,a);
});
```

The method convertMeasuresToColors accepts a formatter in exactly the same fashion, with the same default as rgbaFadeSet. 

```sh
var colorSet = colorutils.rgbaFadeSet([Red, 70, Yellow, 30, Blue]);
colorutils.convertMeasuresToColors(measures, colorSet, [-100,100]);
colorutils.convertMeasuresToColors(measures, colorSet, [-100,100], colorutils.rgbToHexPound);
colorutils.convertMeasuresToColors(measures, colorSet, [-100,100],  function(r,g,b,a){ 
		console.log(r,g,b,a);
});
```

You can also transform an array defined as [r,g,b,a] with the same conversion functions:
```sh
var hexPound = colorutils.convertRGBAArrays([100,100,200,1], colorutils.rgbToHexPound);
console.log(hexPound);
```


## Working with log values
You may find that using log values derived from your data may lead to better differentiation between colors. A log function is supplied in the utility. For parameters, you supply values, the log base and if you'd like to compensate for negative values. The last parameter which compensates for negative values preserves the value domain span by shifting all values above zero by the lowest number encountered in the data. So a data set of -3, 1, and 4 becomes 0, 4, 7 because -3 is the lowest value and its absolute value is applied to every value in the set. A log set is then produced capable of mapping to a color. Such a domain shift and log conversion should be documented and explained to the user. The usage us simple.

````sh
var measures = [-54,23,12,16,-68,-24,19,22,-15,44,33,78,11];
logMeasures = colorutils.convertMeasuresToLog(measures, 10, true);
````


## Apply the output to a view
Results can be used to color the measures any way you wish. Here I simply populated divs and set the background color:

Divs (a working example is in zip file):

![](http://i.imgur.com/G1KYAwi.png)

Using the library to color objects in three.js:
![](http://i.imgur.com/EBAJLYQ.png)

 



