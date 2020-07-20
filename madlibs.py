import json
import random as rand
fWords = open('allWords.json','r')
words = json.load(fWords)
types = {
    '[j]':'adjective',
    '[n]':'noun',
    '[v]':'verb',
    '[a]':'adverb'
}    

def getRandom(typ):
    return str(words[typ][rand.randint(0,len(words[typ]))])

def madlibs(phrase):
    for t in types:
        for i in range(phrase.count(t)): ## yes this has to be done, otherwise it just replaces all occurrences with the same word
            phrase = phrase.replace(t, ' ' + getRandom(types[t]) + ' ',1)
    return phrase.strip().replace('  ',' ') ## just doing some cleanup just in case :shrug:



print(madlibs(input()))
