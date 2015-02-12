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
colorutils.convertMeasuresToColors = function(valuearr, colorSet, minMax){
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
		var a = Math.round(colorSet[3][position])/255;
		out.push("rgba("+r+","+g+","+b+","+a+")");
	}
	if(minMax != undefined){
		out = out.slice(0, out.length-2);
	}
	return out;
}
