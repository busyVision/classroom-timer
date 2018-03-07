const makeLunchString = function(menuStrings) {
	var result = "";
	for(var i = 0;i < menuStrings.length;i++) {
		result += menuStrings[i] + "<br>";
	}
	return result;
}
//AJAX
const getLunchData = function() {
	const request = new XMLHttpRequest();
	const lunchDate = new Date();
	request.onload = function() {
		var rawMenu = request.responseText;
		//parse the result
		var i = rawMenu.indexOf("]", rawMenu.indexOf(lunchDate.getDate() + "<br />[중식]", 20000)); //Start from the end of "[중식]" of today
		var buffer = "", readingName = false, menu = [], at = ' ';
		while(at !== "") {
			at = rawMenu.charAt(i);
			if(at === 'd') { //the end of today's <div> reached. 
				window.lunchMenu.innerHTML = makeLunchString(menu);
				return;
			}
			else if((!isNaN(parseFloat(at)) || at === '<') && readingName) {
				readingName = false; //Stop reading if a number(allergy information) or < is reached
				menu.push(buffer);
				buffer = "";
			}
			else if(at === '>') readingName = true;
			else if(readingName) buffer += at;
			i++;
		}
	}
	request.open("GET", "http://stu.<your region>.go.kr/sts_sci_md00_001.do?schulCode=<your code>&schulCrseScCode=<your code>&SchulKndScCode=<your code>&schYm=" + lunchDate.getFullYear() + (lunchDate.getMonth() + 1), true);
	request.send();
}