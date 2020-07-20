import sys
import json
from SPARQLWrapper import SPARQLWrapper, JSON

endpoint_url = "https://query.wikidata.org/sparql"
file = open('allWords.json','w+')

lang = 'Q1860'

categories = {
  'noun': 'Q1084',
  'adverb': 'Q380057',
  'adjective': 'Q34698',
  'verb': 'Q24905'
}

results = {}

query_base = """SELECT ?lexeme ?lemma WHERE {
  ?lexeme dct:language wd:$LANGUAGE.
  ?lexeme wikibase:lexicalCategory wd:$CATEGORY.
  ?lexeme wikibase:lemma ?lemma.
}"""


def get_results(endpoint_url, query):
    user_agent = "WDQS-example Python/%s.%s" % (sys.version_info[0], sys.version_info[1])
    # TODO adjust user agent; see https://w.wiki/CX6
    sparql = SPARQLWrapper(endpoint_url, agent=user_agent)
    sparql.setQuery(query)
    sparql.setReturnFormat(JSON)
##  [i]['lemma']['value']
    out = sparql.query().convert()['results']['bindings']
    out = [out[i]['lemma']['value'] for i in range(len(out))]
    return out
    
def process_query(language, category):
    query = query_base.replace('$LANGUAGE', language)
    query = query.replace('$CATEGORY', category)
    print(query)
    return query


for cat in categories:
    results[cat] = get_results(endpoint_url, process_query(lang, categories[cat]))

json.dump(results, file, indent=4)
file.close()
exit()
