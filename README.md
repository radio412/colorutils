# Color utilities for Datasets
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
The method rgbaFadeSet returns an array with 4 child arrays: [Rs,Gs,Bs,As]. You can also use colorutils to pass the resulting colorSet into the method convertRGBAArrays to receive an array 
