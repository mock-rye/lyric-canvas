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
    typ = types[typ]
    return str(words[typ][rand.randint(0,len(words[typ]))])

def madlibs(phrase):
    for t in types:
        for i in range(phrase.count(t)):
            phrase = phrase.replace(t, ' ' + getRandom(t) + ' ',1)
    return phrase.strip().replace('  ',' ')



while True:
    print(madlibs(input()))
