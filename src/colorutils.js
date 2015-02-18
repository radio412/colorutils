/*
Copyright 2015 Jeff Berg
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
   
*/
colorutils = function() {
    return this
};
colorutils.rgbaFadePair = function(start, end, spread) {
    var Rs = colorutils.getSpread(start[0], end[0], spread);
    var Gs = colorutils.getSpread(start[1], end[1], spread);
    var Bs = colorutils.getSpread(start[2], end[2], spread);
    var Alphas = colorutils.getSpread(start[3], end[3], spread);
    return [Rs, Gs, Bs, Alphas]
};
colorutils.getSpread = function(start, end, fidelity) {
    var minVal = Math.min(start, end);
    var maxVal = Math.max(start, end);
    var difference = maxVal - minVal;
    var iterator = difference / (fidelity-1);
    var out = [minVal];
    var step = minVal;
    for (var e = 1; e < fidelity; e++) {
        step += iterator;
        out.push(step);
    }
    if (start > end) {
        out.reverse()
    }
    return out;
};

colorutils.rgbaFadeSet = function(parts){
	var out = [[],[],[],[]];//rgba
	for(var i = 0; i<parts.length; i){
		var start = parts[i];
		if(i == parts.length-1){
			break;
		}
		var span = parts[i+1];
		var end = parts[i+2];
		result = colorutils.rgbaFadePair(start,end,span);
		for(var j=0 ; j<4; j++){
			out[j] = out[j].concat(result[j]);
		}
		i = i+2;
	}
	return out;
}
colorutils.convertMeasuresToColors = function(valuearr, colorSet, minMax, f){
	arr = [].concat(valuearr);
	if(minMax!=undefined){
		arr.push(minMax[0]);
		arr.push(minMax[1]);
	}
	var maxVal = Math.max.apply(Math, arr);
	var minVal = Math.min.apply(Math, arr);
	if(minVal<0){
		for(var i in arr){
			arr[i] = arr[i] + Math.abs(minVal);
		}
		var maxVal = maxVal + Math.abs(minVal);
	}
	if(minVal>0){
		for(var i in arr){
			arr[i] = arr[i] - (minVal);
		}
		var maxVal = maxVal - (minVal);
	}
	var out = [];
	for(var i=0;i<arr.length;i++){
		var position = Math.round((arr[i]/maxVal)*(colorSet[0].length-1));
		var rgb = "";
		var r = Math.round(colorSet[0][position]);
		var g = Math.round(colorSet[1][position]);
		var b = Math.round(colorSet[2][position]);
		var a = Math.round(colorSet[3][position]);
		if(f == undefined){
			out.push(colorutils.rgbToCSSRGB(r,g,b,a));
		}else{
			out.push(f(r,g,b,a));
		}
	}
	
	if(minMax != undefined){
		out = out.slice(0, out.length-2);
	}
	return out;
}
colorutils.convertRGBAArrays = function(colorSet, f){
	var len = colorSet[0].length;
	if(f == undefined){
		f = colorutils.rgbToCSSRGB;
	}
	var out = [];
	for(var i=0; i < len; i++){
		var rgba = "";
		var r = Math.round(colorSet[0][i]);
		var g = Math.round(colorSet[1][i]);
		var b = Math.round(colorSet[2][i]);
		var a = Math.round(colorSet[3][i]);
		out.push(f(r,g,b,a));
	}
	return out;
}

colorutils.rgbToHex = function(r, g, b, a) {
    return colorutils.toHex(r) + colorutils.toHex(g) + colorutils.toHex(b) + colorutils.toHex(a);
};
colorutils.rgbToXHex = function(r, g, b) {
    return "0x" + colorutils.toHex(r) + colorutils.toHex(g) + colorutils.toHex(b);
};
colorutils.rgbToXHexPound = function(r, g, b) {
    return "#" + colorutils.toHex(r) + colorutils.toHex(g) + colorutils.toHex(b);
};
colorutils.rgbToCSSRGB = function(r, g, b, a) {
    return "rgba(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + "," + (Math.round(a) / 255) + ")";
};
colorutils.rgbToHexForKML = function(r, g, b, a) {
    return colorutils.toHex(a) + colorutils.toHex(g) + colorutils.toHex(b) + colorutils.toHex(r);
};
colorutils.toHex = function(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) {
        return "00"
    }
    n = Math.max(0, Math.min(n, 255));
    var base = "0123456789ABCDEF";
    return base.charAt((n - n % 16) / 16) + base.charAt(n % 16)
};

colorutils.to255 = function(n) {
    return parseInt(n, 16)
};
colorutils.xHexto255 = function(h) {
    h = h.split("0x")[1].toString();
    var r = colorutils.to255(h.substring(0, 2));
    var g = colorutils.to255(h.substring(2, 4));
    var b = colorutils.to255(h.substring(4, 6));
    var a = colorutils.to255(h.substring(6, 8));
    return colorutils.rgbToCSSRGB(r, g, b, a);
};
colorutils.xHextoRGBAArray = function(h) {
    h = h.split("0x")[1].toString();
    var r = colorutils.to255(h.substring(0, 2));
    var g = colorutils.to255(h.substring(2, 4));
    var b = colorutils.to255(h.substring(4, 6));
    var a = colorutils.to255(h.substring(6, 8));
    return [r, g, b, a];
};
colorutils.convertCSSrgbToHex = function(str){
str = str.toString().toLowerCase();
    var rgb = str.split("(")[1].split(")")[0].split(" ").join("").split(",");
    var r = colorutils.toHex(Number(rgb[0]));
    var g = colorutils.toHex(Number(rgb[1]));
    var b = colorutils.toHex(Number(rgb[2]));	
    return "#"+r+g+b;
}
