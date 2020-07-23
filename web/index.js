const types = {
    '[j]':'adjective',
    '[n]':'noun',
    '[v]':'verb',
    '[a]':'adverb'
}

function displayLangs(){
	
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

function cleanUp(string){
	return string.replaceAll('  ', ' '); //double spaces for one space
}

function getRandom(typ, langWords){
	let parts = langWords[typ];
	word = parts[getRndInteger(0, parts.length-1)];
	return word;
}


function processMadlibs(A, langWords){
	output = A;
	for(type in types){
		while(output.includes(type)){
//			console.log(type)
			output = output.replace(type, ' ' + getRandom(types[type], langWords));
		}
	}
	return cleanUp(output);
}

function getMadlibs(){
	var language = document.getElementById('language').value;
	var langWords = words[language];
	var format = document.getElementById('format').value;
	
	var out = processMadlibs(format, langWords);
	
	var outplace = document.getElementById('output');
	if(out) outplace.innerHTML = out;
	else outplace.innerHTML = 'Output would go here';
}