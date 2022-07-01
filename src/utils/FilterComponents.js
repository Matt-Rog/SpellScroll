import FilterList from "../components/Filters/FilterList"
import FilterButton from "../components/Filters/FilterButton"



export default function FilterComponents(props) {
    
    return [
        {
        title: "Class",
        name: "Class",
        prompt: "Select classes",
        options: ["Artificer", "Bard", "Cleric","Druid","Paladin","Ranger","Sorcerer","Warlock","Wizard"],
        component:
            <FilterList
            name="Class"
            optionName="Classes"
            options={["Artificer", "Bard", "Cleric","Druid","Paladin","Ranger","Sorcerer","Warlock","Wizard"]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Class}
            ></FilterList>
        },
        {
        title: "Level",
        name: "Level",
        prompt: "Select levels",
        options: [1,2,3,4,5,6,7,8,9],
        component: 
            <FilterList
            name="Level"
            optionName="Level Range"
            options={[0,1,2,3,4,5,6,7,8,9]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Level}
            ></FilterList>
        },
        {
        title: "School",
        name: "School",
        prompt: "Select schools",
        options: ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"],
        component: 
            <FilterList
            name="School"
            optionName="School"
            options={["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.School}
            ></FilterList>
        },
        {
        title: "Components",
        name: "Components",
        prompt: "Select components",
        options: ["Material", "Verbal", "Somatic"],
        component: 
            <FilterButton
            name="Components"
            optionName="Components"
            options={["Material", "Verbal", "Somatic"]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Components}
            ></FilterButton>
        },
        {
        title: "Time",
        name: "Time",
        prompt: "Select times",
        options: ["1 Reaction", "1 Minute", "10 Minutes", "1 Hour", "8 Hours", "12 Hours", "24 Hours"],
        component: 
            <FilterList
            name="Casting Time"
            optionName="Casting Time"
            options={["1 Reaction", "1 Minute", "10 Minutes", "1 Hour", "8 Hours", "12 Hours", "24 Hours"]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.CastingTime}
            ></FilterList>
        },
        {
        title: "Concentration",
        name: "Concentration",
        prompt: "Select concentration",
        options: ["Yes", "No"],
        component: 
            <FilterButton
            name="Concentration"
            optionName="Select concentration"
            options={["Yes", "No"]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Concentration}
            ></FilterButton>
        },
        {
        title: "Ritual",
        name: "Ritual",
        prompt: "Select ritual",
        options: ["Yes", "No"],
        component: 
            <FilterButton
            name="Ritual"
            optionName="Select ritual"
            options={["Yes", "No"]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Ritual}
            ></FilterButton>
        },
        {
        title: "Source",
        name: "Source",
        prompt: "Filter by source",
        options: ["Charmed", "Combat", "Communication", "Compulssion", "Control", "Creation", "Damage", "Debuff", "Deception", "Detection", "Dunamancy", "Environment", "Exploration", "Foreknowledge", "Healing", "Movement", "Negation", "Psionic", "Scrying", "Shapechanging", "Social", "Special", "Summoning", "Teleportation", "Utility", "Waring"],
        component: 
            <FilterList
            name="Source"
            optionName="Select source"
            options={["Banishment", "Buff", "Charmed", "Combat", "Communication", "Compulssion", "Control", "Creation", "Damage", "Debuff", "Deception", "Detection", "Dunamancy", "Environment", "Exploration", "Foreknowledge", "Healing", "Movement", "Negation", "Psionic", "Scrying", "Shapechanging", "Social", "Special", "Summoning", "Teleportation", "Utility", "Waring"]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Source}
            ></FilterList>
        },
        {
        title: "Tags",
        name: "Tags",
        prompt: "Filter by tags",
        options: ["Banishment", "Buff", "Charmed", "Combat", "Communication", "Compulssion", "Control", "Creation", "Damage", "Debuff", "Deception", "Detection", "Dunamancy", "Environment", "Exploration", "Foreknowledge", "Healing", "Movement", "Negation", "Psionic", "Scrying", "Shapechanging", "Social", "Special", "Summoning", "Teleportation", "Utility", "Warding"],
        component: 
            <FilterList
            name="Tags"
            optionName="Select tags"
            options={["Banishment", "Buff", "Charmed", "Combat", "Communication", "Compulssion", "Control", "Creation", "Damage", "Debuff", "Deception", "Detection", "Dunamancy", "Environment", "Exploration", "Foreknowledge", "Healing", "Movement", "Negation", "Psionic", "Scrying", "Shapechanging", "Social", "Special", "Summoning", "Teleportation", "Utility", "Warding"]}
            setFilterProp={(params) => props.setFilterProp(params)}
            filter={props.filter}
            selected={props.filter?.Tags}
            ></FilterList>
        },
    ]
}