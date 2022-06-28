import FilterList from "../components/Filters/FilterList"
import FilterButton from "../components/Filters/FilterButton"



export default function FilterComponents(props) {
    
    return [
        {
        name: "Class",
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
        }
    ]
}