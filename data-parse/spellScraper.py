from bs4 import BeautifulSoup
from lxml import etree
import json
import re


def main():
    url = "C:\\Users\\Joey K\\Desktop\\DEV\\Personal\\DNDSA\\scrape\\27.txt"
    page = open(url, encoding='utf-8')
    soup = BeautifulSoup(page.read(), features='lxml')

    titles = soup.find_all('a', class_='link')
    names = []
    links = []
    for title in titles:
        names.append(title.text)
        links.append("https://www.dndbeyond.com/" + title.get('href'))

    # Name-getter
    for name in names:
        print(name)

    bodies = soup.find_all('div', class_='more-info-body')
    footers = soup.find_all('div', class_='more-info-footer')

    # print('Bodies: ' + str(len(bodies)))
    # print('Footers: ' + str(len(footers)))
    # print('Names: ' + str(len(names)))

    if (len(bodies) == len(names)):
        # Cycling through the spells
        for n in range(len(names)):

            name = names[n]
            body = bodies[n]

            with open('C:\\Users\\Joey K\\Desktop\\DEV\\Personal\\DNDSA\\ALL_SPELL_DATA.json', 'r', encoding="utf8") as r:
                spellData = json.load(r)

            # Defining ID
            id = len(spellData)
            if len(spellData) != 0:
                for spell in spellData:
                    if(spell['name'] == name):
                        id = spell['ID']

            link = links[n]

            # Defining rest of fields
            if body.find('div', class_="ddb-blocked-content") != None:
                block = body.find(
                    'div', class_="ddb-blocked-content-body-text-secondary")
                footers.insert(n, "BLOCKED")

                # Find/clean level
                level = cleanLevel(soup.find_all(
                    'div', class_="row spell-level")[n].text.strip())

                # Find/clean school
                schoolRaw = soup.find_all('div', class_="row spell-school")[n]
                school = schoolRaw.find(
                    'div')['class'][1].lower().capitalize()

                # Find/clean time
                time = soup.find_all(
                    'div', class_="row spell-cast-time")[n].text.strip()
                if "*" in time:
                    time = time.replace("*", "").strip()

                # Find/clean duration
                duration = soup.find_all(
                    'div', class_="row spell-duration")[n].text.strip()
                if "*" in duration:
                    duration = duration.replace("*", "").strip()

                # Find/clean ritual
                if((soup.find_all('div', class_="row spell-name")[n]).find('i', class_="i-ritual") != None):
                    ritual = "YES"
                else:
                    ritual = "NO"

                # Find/clean range
                rangeRaw = soup.find_all('div', class_="row spell-range")[n]
                potentialRange = rangeRaw.find('span', class_="range-distance")
                if potentialRange != None:
                    rangeValue = potentialRange.text.strip()
                else:
                    rangeValue = rangeRaw.text.strip()
                aoeShape = "None"
                aoeSize = "None"
                if(rangeRaw.find('span', class_="aoe-size") != None):
                    aoeShape = (rangeRaw.find('i'))[
                        'class'][0][6:].lower().capitalize()
                    aoeSize = rangeRaw.find(
                        'span', class_="aoe-size").text.replace('(', "").replace(')', "").strip()

                # Find/clean attack
                attack = soup.find_all(
                    'div', class_="row spell-attack-save")[n].text
                if attack == None:
                    attack = "None"
                else:
                    attack = attack.strip()

                # Find/clean effect
                effect = soup.find_all(
                    'div', class_="row spell-damage-effect")[n].text
                if effect == None:
                    effect = "None"
                else:
                    effect = effect.replace('(...)', "").strip()

                # Find/clean concentration
                if((soup.find_all('div', class_="row spell-name")[n]).find('i', class_="i-concentration") != None):
                    concentration = "YES"
                else:
                    concentration = "NO"

                # Find/clean components
                components = []
                componentsRaw = soup.find_all(
                    'div', class_="row spell-name")[n].find_all('span')
                for span in componentsRaw:
                    if not span.has_attr('span'):
                        spans = span.find_all('span')
                        if(len(spans) > 1):
                            components = spans[2].text
                            components = cleanComponents(components)

                # Find/clean description
                descriptionRaw = body.find(
                    'div', class_="ddb-blocked-content-body-text-secondary").text.strip()
                description = [descriptionRaw]

                blurb = "None"
                blurbParent = "None"
                tags = []
                classes = []
                subclasses = []

                # Find/clean source
                source = body.find(
                    'div', class_="ddb-blocked-content-body-text-main").text.strip()

                paywall = "TRUE"
            else:
                block = body.find(
                    'div', class_="ddb-statblock ddb-statblock-spell")
                footer = footers[n]
                blurbParent = "None"
                paywall = "FALSE"

                # Find/clean level
                level = cleanLevel(((block.find('div', class_="ddb-statblock-item ddb-statblock-item-level")
                                     ).find('div', class_="ddb-statblock-item-value")).text.strip())

                # Find/clean casting time
                timeRaw = ((block.find('div', class_="ddb-statblock-item ddb-statblock-item-casting-time")
                            ).find('div', class_="ddb-statblock-item-value"))
                if(timeRaw.find('i', class_="i-ritual") != None):
                    ritual = "YES"
                    time = ("".join(timeRaw.findAll(
                        text=True, recursive=False))).strip()
                else:
                    ritual = "NO"
                    time = timeRaw.text.strip()
                if '*' in time:
                    time = time.replace('*', "").strip()

                # Find/clean range
                rangeRaw = ((block.find('div', class_="ddb-statblock-item ddb-statblock-item-range-area")
                             ).find('div', class_="ddb-statblock-item-value"))
                if(rangeRaw.find('span', class_="aoe-size") != None):
                    if(rangeRaw.find('i') != None):
                        aoeShape = (rangeRaw.find('i'))[
                            'class'][0][6:].lower().capitalize()
                    else:
                        aoeShape = "None"
                    rangeValue = ("".join(rangeRaw.findAll(
                        text=True, recursive=False))).replace('(...)', "").strip()
                    aoeSize = rangeRaw.find(
                        'span', class_="aoe-size").text.replace('(', "").replace(')', "").strip()
                else:
                    aoeShape = "None"
                    rangeValue = rangeRaw.text.replace('(...)', "").strip()
                    aoeSize = "None"

                # Find/clean components
                components = ((block.find('div', class_="ddb-statblock-item ddb-statblock-item-components")
                               ).find('div', class_="ddb-statblock-item-value")).text
                if '*' in components:
                    components = components.replace('*', "")
                components = cleanComponents(components.split(', '))

                # Find/clean duration
                durationRaw = ((block.find('div', class_="ddb-statblock-item ddb-statblock-item-duration")
                                ).find('div', class_="ddb-statblock-item-value"))
                if(durationRaw.find('i', class_="i-concentration") != None):
                    concentration = "YES"
                    duration = ("".join(durationRaw.findAll(
                        text=True, recursive=False))).strip()
                else:
                    concentration = "NO"
                    duration = durationRaw.text.strip()

                # Find/clean school
                school = ((block.find('div', class_="ddb-statblock-item ddb-statblock-item-school")
                           ).find('div', class_="ddb-statblock-item-value")).text.strip()

                # Find/clean attack
                attack = ((block.find('div', class_="ddb-statblock-item ddb-statblock-item-attack-save")
                           ).find('div', class_="ddb-statblock-item-value")).text.strip()

                # Find/clean effect
                effect = ((block.find('div', class_="ddb-statblock-item ddb-statblock-item-damage-effect")
                           ).find('div', class_="ddb-statblock-item-value")).text.replace('(...)', "").strip()

                # Find/clean description
                descriptionRaw = body.find(
                    'div', class_="more-info-body-description")
                paragraphs = descriptionRaw.find_all(['p', 'li'])
                description = []
                for para in paragraphs:
                    text = para.text
                    if(para.name == 'li'):
                        text = ' • ' + para.text
                    description.append(text)

                # Find/clean blurb
                blurbRaw = (body.find(
                    'div', class_="more-info-body-description")).find('span')
                blurb = "None"
                if blurbRaw != None and blurbRaw.has_attr('class') and 'blurb' in blurbRaw['class'][0]:
                    className = blurbRaw['class'][0]
                    if('(' in blurbRaw.text or ')' in blurbRaw.text):
                        blurb = re.split('\(|\)', blurbRaw.text)[1]
                    else:
                        blurb.replace("* -", "")
                    blurbParent = className.replace("-blurb", "")

                # Find/clean tags
                tagsRaw = (footer.find(
                    'div', class_="more-info-footer-tags")).find_all('div', class_="tag")
                tags = []
                for tag in tagsRaw:
                    tags.append(tag.text.strip())

                # Find/clean classes
                classesRaw = (footer.find(
                    'div', class_="more-info-footer-tags more-info-footer-classes")).find_all('div', class_="tag")
                classes, subclasses = cleanClasses(classesRaw)

                # Find/clean source
                source = (footer.find(
                    'div', class_="more-info-footer-source")).text.strip()

            tempSpell = {
                'ID': id,
                'link': link,
                'name': name,
                'level': level,
                'time': time.replace('*', "").strip(),
                'ritual': ritual.replace('*', "").strip(),
                'range': rangeValue.replace('*', "").strip(),
                'aoe_shape': aoeShape.replace('*', "").strip(),
                'aoe_size': aoeSize.replace('*', "").strip(),
                'components': components,
                'duration': duration.replace('*', "").strip(),
                'concentration': concentration,
                'school': school,
                'attack': attack.replace('*', "").strip(),
                'effect': effect.replace('*', "").strip(),
                'description': description,
                'blurb': blurb,
                'blurb_parent': blurbParent,
                'tags': tags,
                'classes': classes,
                'subclasses': subclasses,
                'source': source.replace('*', "").strip(),
                'paywall': paywall
            }
            pretty = json.dumps(tempSpell, indent=4)
            print('\n\n' + name)
            print(pretty)

            # Adding temp_spell to spell_data
            if id < len(spellData):
                spellData[id] = tempSpell
            else:
                spellData.append(tempSpell)

            with open('C:\\Users\\Joey K\\Desktop\\DEV\\Personal\\DNDSA\\ALL_SPELL_DATA.json', 'w', encoding="utf8") as w:
                json.dump(spellData, w, indent=1)


def cleanLevel(raw):
    if raw != None:
        match raw:
            case "Cantrip":
                return 0
            case _:
                return int(raw[0])
    else:
        return 20


def cleanComponents(raw):
    if raw != None and len(raw) != 0:
        components = []
        for comp in raw:
            comp = comp.strip()
            match comp:
                case "V":
                    components.append("Verbal")
                case "S":
                    components.append("Somatic")
                case "M":
                    components.append("Material")
        return components
    else:
        return []


def cleanClasses(raw):
    if raw != None and len(raw) != 0:
        classList = ["Artificer", "Bard", "Cleric", "Druid",
                     "Paladin", "Ranger", "Sorcerer", "Warlock", "Wizard"]
        classes = []
        subclasses = []
        for item in raw:
            item = item.text.strip()
            if item in classList:
                classes.append(item)
            else:
                subclasses.append(item)
        return classes, subclasses

    else:
        return [], []


main()
