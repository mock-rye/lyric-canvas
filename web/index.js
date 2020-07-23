const types = {
    '[j]':'adjective',
    '[n]':'noun',
    '[v]':'verb',
    '[a]':'adverb'
}

const languages = {
	'en': 'English',
	'es': 'Spanish'
}

function displayLangs(){
	var show = '';
	for(lang in languages){
		show += ('<option value="'+lang+'">'+languages[lang]+'</option>');
	}
	document.getElementById('language').innerHTML = show;
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


function processMadlibs(format, langWords){
	if(format === '') return 'Output would go here';
	output = format;
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
	
	document.getElementById('output').innerHTML = out;
}