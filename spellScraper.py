import requests
from bs4 import BeautifulSoup

spellList = [
    "Abi-Dalzim’s Horrid Wilting",
    "Absorb Elements",
    "Acid Arrow",

]

URL = "https://www.dndbeyond.com/spells/abi-dalzims-horrid-wilting"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")
spellContent = soup.find("div", class_="page-title")
print(spellContent.text)