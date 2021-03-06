/**Returns an Array of Strings sliced from toCut.
 * The Strings will all have length of chunkLen, except the last one which may be 1~chunkLen-chars long.
 * @param toCut {String} The String to cut up.
 * @param chunkLen {integer} The length of resulting strings. It will be floored if it isn't an integer.
 * @param atEnd {String} The String to attach at the end of each cut Strings except the last one. Defaults to an empty one.
 * @returns {Array} An Array containing the cut Strings. null if chunkLen is smaller than 1.*/
const cutUp = function(toCut, chunkLen, atEnd) {
	if(chunkLen <= 0)
		return null;
	if(!Number.isInteger(chunkLen))
		chunkLen = Math.floor(chunkLen);
	atEnd = atEnd != undefined ? atEnd : "";

	const result = [];
	for(var i = 0;i < toCut.length;i += chunkLen) {
		if(i + chunkLen < toCut.length)
			result.push(toCut.slice(i, i + chunkLen) + atEnd);
		else
			result.push(toCut.slice(i, i + chunkLen));
	}
	return result;
};

/**Returns a String with every element in menuStrings separated by a <br>.
 * Splits up entries longer than lenLimit into separate lenLimit chars-long entries. See cutUp() for details.
 * @param menuStrings {Array} The Array containing the names of the entries in the menu.
 * @param lenLimit {integer} The longest possible length of a line. Pass 0 or a negative value to disable limit. Defaults to 0.
 * @returns {String} The String. An empty one if menuStrings isn't an Array or is empty.*/
const makeMenuString = function(menuStrings, lenLimit) {
	if(!Array.isArray(menuStrings))
		return "";
	lenLimit = lenLimit != undefined ? lenLimit : 0

	var result = "";
	for(var i = 0;i < menuStrings.length;i++) {
		if(lenLimit > 0 && menuStrings[i].length > lenLimit) {
			result += makeMenuString(cutUp(menuStrings[i], lenLimit, '-'));
		}
		else
			result += menuStrings[i] + "<br>";
	}
	return result;
};

/**Constructs a timetable String from an Array of Strings.
 * @param subjects {Array} The Array containing names of the subjects.
 * @param nextTime {integer} The index of the next(current if inside a class) in subjects.
 * @returns {String} A String with the next subject inside a span with id "current". An empty one if subjects is empty.*/
const makeTimetableString = function(subjects, nextTime) {
	if(!Array.isArray(subjects))
		return "";

	var tableString = "";
	for(var i = 0;i < subjects.length;i++) {
		if(i === nextTime) {
			tableString += "<span id=\"current\">" + subjects[i] + "</span>, ";
		}
		else
			tableString += subjects[i] + ", ";
	}
	return tableString.substr(0, tableString.length - 2);
};

/**Returns milliseconds from the last midnight at given hours(time), minutes and seconds from the midnight.
 * You can also pass a Date(or any object that has functions getHours, getMinutes and getSeconds as a member) to time;
 * minutes and seconds will be ignored in that case.*/
const milFromMidnight = function(time, minutes, seconds) {
	if(time.getHours && time.getMinutes && time.getSeconds) {
		return time.getTime() - new Date(time).setHours(0, 0, 0, 0);
	}
	else {
		seconds = seconds != null ? seconds : 0;
		return time * 3600000 + minutes * 60000 + seconds * 1000;
	}
}