from bs4 import BeautifulSoup
from lxml import etree
import json
import re


def filterParams():
    spellFile = 'C:\\Users\\Joey K\\Desktop\\DEV\\Personal\\DNDSA\\ALL_SPELL_DATA.json'

    filterFile = 'C:\\Users\\Joey K\\Desktop\\DEV\\Personal\\DNDSA\\scrape\\filter_options.json'

    with open(spellFile, 'r', encoding="utf8") as r:
        spellData = json.load(r)

    with open(filterFile, 'r', encoding="utf8") as r:
        filters = json.load(r)

    paramList = ['level', 'time', 'ritual', 'range', 'aoe_shape', 'aoe_size', 'components', 'duration',
                 'concentration', 'school', 'attack', 'effect', 'tags', 'classes', 'subclasses', 'source', 'paywall']
    print(len(paramList))

    for spell in spellData:
        for param in paramList:
            value = spell[param]
            if type(value) == list:
                for element in value:
                    if element not in filters[param]:
                        filters[param].append(element)
            else:
                if value not in filters[param]:
                    filters[param].append(value)

    with open(filterFile, 'w', encoding="utf8") as w:
        json.dump(filters, w, indent=1)


def alph():

    filterFile = 'C:\\Users\\Joey K\\Desktop\\DEV\\Personal\\DNDSA\\scrape\\filter_options.json'

    with open(filterFile, 'r', encoding="utf8") as r:
        filters = json.load(r)

    # print(filters['effect'])
    filters['aoe_shape'].sort()

    with open(filterFile, 'w', encoding="utf8") as w:
        json.dump(filters, w, indent=1)


def dedup():

    spellFile = 'C:\\Users\\Joey K\\Desktop\\DEV\\Personal\\DNDSA\\ALL_SPELL_DATA.json'

    filterFile = 'C:\\Users\\Joey K\\Desktop\\DEV\\Personal\\DNDSA\\scrape\\filter_options.json'

    with open(spellFile, 'r', encoding="utf8") as r:
        spellData = json.load(r)

    currMax = 0
    maxSpell = ""
    for spell in spellData:
        if(len(spell['tags']) > currMax):
            currMax = len(spell['tags'])
            maxSpell = spell['name']

    print(maxSpell)
    print(currMax)


dedup()
