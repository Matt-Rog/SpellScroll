import FilterList from "../components/Filters/FilterList"
import FilterButton from "../components/Filters/FilterButton"



export default function FilterComponents(props) {
    
    return [
        {
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
        name: "Casting Time",
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
        name: "Level",
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
        name: "Level",
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
    ]
}