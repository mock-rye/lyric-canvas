const types = {
    '[j]':'adjective',
    '[n]':'noun',
    '[v]':'verb',
    '[a]':'adverb'
}

function getWordset() {
	var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "web/allWords.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
	return json;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function getRandom(typ){
//	console.log(words['noun'][123]);
	let parts = words[typ];
//	console.log(parts);
	word = parts[getRndInteger(0, parts.length-1)];
//	console.log(word);
	return word;
}

function cleanUp(string){
	return string.replaceAll('  ', ' '); //double spaces for one space
}


function processMadlibs(A){
//	console.log(words['noun'][123]);
	output = A;
	for(type in types){
//		console.log(types[type]);
//		console.log(getRandom(type));
		while(output.includes(type)){
//			console.log(type)
			output = output.replace(type, ' ' + getRandom(types[type]));
		}
	}
	return cleanUp(output);
}

function madlibs(A){
//	console.log(words)
//	console.log('madlibs('+ A +')');
	var result = processMadlibs(A);
//	console.log(result);
	return result;
}

function getMadlibs(){
	var format = document.getElementById('format').value;
	var out = madlibs(format);
	if(out) document.getElementById('output').innerHTML = out;
	else document.getElementById('output').innerHTML = 'Output would go here';
}