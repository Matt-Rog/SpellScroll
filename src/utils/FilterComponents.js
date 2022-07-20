import FilterList from "../components/Filters/FilterList"
import FilterButton from "../components/Filters/FilterButton"



export default function FilterComponents(props) {
    
    return [
        {
        title: "Level",
        name: "Level",
        prompt: "Filter by level",
        options: [0,1,2,3,4,5,6,7,8,9],
        component: 
            <FilterList
            name="Level"
            optionName="Select level"
            options={[0,1,2,3,4,5,6,7,8,9]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Level}
            ></FilterList>
        },
        {
        title: "Class",
        name: "Classes",
        prompt: "Filter by classes",
        options: ["Artificer", "Bard", "Cleric","Druid","Paladin","Ranger","Sorcerer","Warlock","Wizard"],
        component:
            <FilterList
            name="Classes"
            optionName="Select classes"
            options={["Artificer", "Bard", "Cleric","Druid","Paladin","Ranger","Sorcerer","Warlock","Wizard"]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Classes}
            ></FilterList>
        },
        {
        title: "Subclass",
        name: "Subclasses",
        prompt: "Filter by subclasses",
        options: [
            "Alchemist",
            "Arcana Domain",
            "Armorer",
            "Artillerist",
            "Battle Smith",
            "Circle of Spores",
            "Circle of Wildfire",
            "Circle of the Land (Arctic)",
            "Circle of the Land (Coast)",
            "Circle of the Land (Desert)",
            "Circle of the Land (Forest)",
            "Circle of the Land (Grassland)",
            "Circle of the Land (Mountain)",
            "Circle of the Land (Swamp)",
            "Circle of the Land (Underdark)",
            "Death Domain",
            "Forge Domain",
            "Grave Domain",
            "Knowledge Domain",
            "Life Domain",
            "Light Domain",
            "Nature Domain",
            "Oath of Conquest",
            "Oath of Devotion",
            "Oath of Glory",
            "Oath of Redemption",
            "Oath of Vengeance",
            "Oath of the Ancients",
            "Oath of the Crown",
            "Oath of the Open Sea",
            "Oath of the Watchers",
            "Oathbreaker",
            "Order Domain",
            "Peace Domain",
            "Tempest Domain",
            "The Archfey",
            "The Celestial",
            "The Fathomless",
            "The Fiend",
            "The Genie",
            "The Great Old One",
            "The Hexblade",
            "The Undead",
            "The Undying",
            "Trickery Domain",
            "Twilight Domain",
            "War Domain"
           ],
        component:
            <FilterList
            name="Subclasses"
            optionName="Select subclasses"
            options={[
                "Alchemist",
                "Arcana Domain",
                "Armorer",
                "Artillerist",
                "Battle Smith",
                "Circle of Spores",
                "Circle of Wildfire",
                "Circle of the Land (Arctic)",
                "Circle of the Land (Coast)",
                "Circle of the Land (Desert)",
                "Circle of the Land (Forest)",
                "Circle of the Land (Grassland)",
                "Circle of the Land (Mountain)",
                "Circle of the Land (Swamp)",
                "Circle of the Land (Underdark)",
                "Death Domain",
                "Forge Domain",
                "Grave Domain",
                "Knowledge Domain",
                "Life Domain",
                "Light Domain",
                "Nature Domain",
                "Oath of Conquest",
                "Oath of Devotion",
                "Oath of Glory",
                "Oath of Redemption",
                "Oath of Vengeance",
                "Oath of the Ancients",
                "Oath of the Crown",
                "Oath of the Open Sea",
                "Oath of the Watchers",
                "Oathbreaker",
                "Order Domain",
                "Peace Domain",
                "Tempest Domain",
                "The Archfey",
                "The Celestial",
                "The Fathomless",
                "The Fiend",
                "The Genie",
                "The Great Old One",
                "The Hexblade",
                "The Undead",
                "The Undying",
                "Trickery Domain",
                "Twilight Domain",
                "War Domain"
               ]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Subclasses}
            ></FilterList>
        },
        {
        title: "School",
        name: "School",
        prompt: "Filter by school",
        options: ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"],
        component: 
            <FilterList
            name="School"
            optionName="Select school"
            options={["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.School}
            ></FilterList>
        },
        {
        title: "Comps.",
        name: "Components",
        prompt: "Filter by components",
        options: ["Material", "Verbal", "Somatic"],
        component: 
            <FilterButton
            name="Components"
            optionName="Select components"
            options={["Material", "Verbal", "Somatic"]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Components}
            ></FilterButton>
        },
        {
        title: "Time",
        name: "Time",
        prompt: "Filter by casting time",
        options: ["1 Action", "1 Bonus Action" ,"1 Reaction", "1 Minute", "10 Minutes", "1 Hour", "8 Hours", "12 Hours", "24 Hours", "Special"],
        component: 
            <FilterList
            name="Time"
            optionName="Select casting time"
            options={["1 Action", "1 Bonus Action" ,"1 Reaction", "1 Minute", "10 Minutes", "1 Hour", "8 Hours", "12 Hours", "24 Hours", "Special"]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Time}
            ></FilterList>
        },
        {
        title: "Ritual",
        name: "Ritual",
        prompt: "Filter by ritual",
        options: ["YES", "NO"],
        component: 
            <FilterButton
            name="Ritual"
            optionName="Select ritual"
            options={["YES", "NO"]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Ritual}
            ></FilterButton>
        },
        {
        title: "Range",
        name: "Range",
        prompt: "Filter by range",
        options: ["Self","Touch","Sight","5 ft","10 ft","15 ft","20 ft","30 ft","60 ft","90 ft","100 ft","120 ft","150 ft","300 ft","500 ft","1,000 ft","1 mile","500 miles","Unlimited"],
        component: 
            <FilterList
            name="Range"
            optionName="Select range"
            options={["Self","Touch","Sight","5 ft","10 ft","15 ft","20 ft","30 ft","60 ft","90 ft","100 ft","120 ft","150 ft","300 ft","500 ft","1,000 ft","1 mile","500 miles","Unlimited"]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Range}
            ></FilterList>
        },
        {
        title: "Duration",
        name: "Duration",
        prompt: "Filter by duration",
        options: ["Instantaneous","1 Round","6 Rounds","1 Minute","10 Minutes","1 Hour","2 Hours","6 Hours","8 Hours","24 Hours","1 Day","7 Days","10 Days","30 Days","Until Dispelled","Until Dispelled or Triggered","Special"],
        component: 
            <FilterList
            name="Duration"
            optionName="Select duration"
            options={["Instantaneous","1 Round","6 Rounds","1 Minute","10 Minutes","1 Hour","2 Hours","6 Hours","8 Hours","24 Hours","1 Day","7 Days","10 Days","30 Days","Until Dispelled","Until Dispelled or Triggered","Special"]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Duration}
            ></FilterList>
        },
        {
        title: "Conc.",
        name: "Concentration",
        prompt: "Filter by concentration",
        options: ["YES", "NO"],
        component: 
            <FilterButton
            name="Concentration"
            optionName="Select concentration"
            options={["YES", "NO"]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Concentration}
            ></FilterButton>
        },
        {
        title: "Effect",
        name: "Effect",
        prompt: "Filter by effect",
        options: [
            "Acid",
            "Additional",
            "Banishment",
            "Blinded",
            "Bludgeoning",
            "Buff",
            "Charmed",
            "Cold",
            "Combat",
            "Communication",
            "Control",
            "Creation",
            "Deafened",
            "Debuff",
            "Deception",
            "Detection",
            "Dunamancy",
            "Environment",
            "Exploration",
            "Fire",
            "Force",
            "Foreknowledge",
            "Frightened",
            "Healing",
            "Invisible",
            "Lightning",
            "Movement",
            "Necrotic",
            "Negation",
            "None",
            "Paralyzed",
            "Petrified",
            "Piercing",
            "Poison",
            "Prone",
            "Psychic",
            "Radiant",
            "Restrained",
            "Shapechanging",
            "Slashing",
            "Social",
            "Stunned",
            "Summoning",
            "Teleportation",
            "Thunder",
            "Unconscious",
            "Utility",
            "Warding"
           ],
        component: 
            <FilterList
            name="Effect"
            optionName="Select effect"
            options={[
                "Acid",
                "Additional",
                "Banishment",
                "Blinded",
                "Bludgeoning",
                "Buff",
                "Charmed",
                "Cold",
                "Combat",
                "Communication",
                "Control",
                "Creation",
                "Deafened",
                "Debuff",
                "Deception",
                "Detection",
                "Dunamancy",
                "Environment",
                "Exploration",
                "Fire",
                "Force",
                "Foreknowledge",
                "Frightened",
                "Healing",
                "Invisible",
                "Lightning",
                "Movement",
                "Necrotic",
                "Negation",
                "None",
                "Paralyzed",
                "Petrified",
                "Piercing",
                "Poison",
                "Prone",
                "Psychic",
                "Radiant",
                "Restrained",
                "Shapechanging",
                "Slashing",
                "Social",
                "Stunned",
                "Summoning",
                "Teleportation",
                "Thunder",
                "Unconscious",
                "Utility",
                "Warding"
               ]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Effect}
            ></FilterList>
        },
        {
            title: "ATK/Save",
            name: "Attack",
            prompt: "Filter by attack/save",
            options: [
                "None",
                "CHA Save",
                "CON Save",
                "DEX Save",
                "INT Save",
                "Melee",
                "Ranged",
                "STR Save",
                "WIS Save"
               ],
            component: 
                <FilterList
                name="Attack"
                optionName="Select attack/save"
                options={[
                    "None",
                    "CHA Save",
                    "CON Save",
                    "DEX Save",
                    "INT Save",
                    "Melee",
                    "Ranged",
                    "STR Save",
                    "WIS Save"
                   ]}
                setFilterProp={(params) => props.setFilterProp(params)}
                filter={props.filter}
                selected={props.filter?.Attack}
                ></FilterList>
            },
        {
        title: "Source",
        name: "Source",
        prompt: "Filter by source",
        options: [
            "Acquisitions Incorporated",
            "Basic Rules",
            "Critical Role",
            "Elemental Evil Player's Companion",
            "Explorer's Guide to Wildemount",
            "Fizban's Treasury of Dragons",
            "Guildmasters' Guide to Ravnica",
            "Icewind Dale: Rime of the Frostmaiden",
            "Lost Laboratory of Kwalish",
            "Player's Handbook",
            "Strixhaven: A Curriculum of Chaos",
            "Sword Coast Adventurer's Guide",
            "Tasha\u2019s Cauldron of Everything",
            "Xanathar's Guide to Everything"
           ],
        component: 
            <FilterList
            name="Source"
            optionName="Select source"
            options={[
                "Acquisitions Incorporated",
                "Basic Rules",
                "Critical Role",
                "Elemental Evil Player's Companion",
                "Explorer's Guide to Wildemount",
                "Fizban's Treasury of Dragons",
                "Guildmasters' Guide to Ravnica",
                "Icewind Dale: Rime of the Frostmaiden",
                "Lost Laboratory of Kwalish",
                "Player's Handbook",
                "Strixhaven: A Curriculum of Chaos",
                "Sword Coast Adventurer's Guide",
                "Tasha\u2019s Cauldron of Everything",
                "Xanathar's Guide to Everything"
               ]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Source}
            ></FilterList>
        },
        {
        title: "AOE",
        name: "Aoe_size",
        prompt: "Filter by AOE",
        options: ["None","1 ft","5 ft","10 ft","15 ft","20 ft","30 ft","40 ft","50 ft","60 ft","100 ft","150 ft","200 ft","1 mile","5 miles","2,500 ft2","40,000 ft2"],
        component: 
            <FilterList
            name="Aoe_size"
            optionName="Select AOE"
            options={["None","1 ft","5 ft","10 ft","15 ft","20 ft","30 ft","40 ft","50 ft","60 ft","100 ft","150 ft","200 ft","1 mile","5 miles","2,500 ft2","40,000 ft2"]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Aoe_size}
            ></FilterList>
        },
        {
        title: "Shape",
        name: "Aoe_shape",
        prompt: "Filter by AOE Shape",
        options: [
            "None",
            "Cone",
            "Cube",
            "Cylinder",
            "Line",
            "Sphere",
            "Square"
           ],
        component: 
            <FilterList
            name="Aoe_shape"
            optionName="Select AOE Shape"
            options={[
                "None",
                "Cone",
                "Cube",
                "Cylinder",
                "Line",
                "Sphere",
                "Square"
               ]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Aoe_shape}
            ></FilterList>
        },
        {
        title: "Tags",
        name: "Tags",
        prompt: "Filter by tags",
        options: [
            "Banishment",
            "Bard",
            "Buff",
            "Charmed",
            "Communication",
            "Control",
            "Creation",
            "Damage",
            "Debuff",
            "Deception",
            "Detection",
            "Druid",
            "Environment",
            "Exploration",
            "Foreknowledge",
            "Healing",
            "Movement",
            "Negation",
            "Oath of the Open Sea",
            "Ranger",
            "Scrying",
            "Shapechanging",
            "Social",
            "Sorcerer",
            "Summoning",
            "Teleportation",
            "Utility",
            "Warding",
            "Warlock",
            "Wizard"
           ],
        component: 
            <FilterList
            name="Tags"
            optionName="Select tags"
            options={[
                "Banishment",
                "Bard",
                "Buff",
                "Charmed",
                "Communication",
                "Control",
                "Creation",
                "Damage",
                "Debuff",
                "Deception",
                "Detection",
                "Druid",
                "Environment",
                "Exploration",
                "Foreknowledge",
                "Healing",
                "Movement",
                "Negation",
                "Oath of the Open Sea",
                "Ranger",
                "Scrying",
                "Shapechanging",
                "Social",
                "Sorcerer",
                "Summoning",
                "Teleportation",
                "Utility",
                "Warding",
                "Warlock",
                "Wizard"
               ]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Tags}
            ></FilterList>
        },
    ]
}