import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import Add from '@mui/icons-material/Add';
import { createTheme } from '@mui/material/styles';
import './Header.css'
import {bigTechs, cloudPlatforms, secTechs} from './OptionContext'
import {OptionContext} from './OptionContext'

const OrgCheckbox = ({ organization, state }) => {
    const [orgs, setOrgs] = state;

    const handleChange = (event) => {
        const { name, checked } = event.target;
        setOrgs({ ...orgs, [name]: checked });
    };    

    return (
        <FormControlLabel label={organization} control={
            <Checkbox checked={orgs[organization]} sx={{color: "gray"}} name={organization} onChange={handleChange}/>
        }/>
    );
}

function Header() {
    const  {
        bigTechOrgs,
        setBigTechOrgs,
        cloudPlatformOrgs,
        setCloudPlatformOrgs,
        searchConditions, 
        setSearchConditions,
        securityOrgs,
        setSecurityOrgs
    } = React.useContext(OptionContext);

    const [choseCondtion, setChoseCondtion] = React.useState(0);
    const choseHandleChange = (event) => {
        setChoseCondtion(event.target.value);
    };
    
    const conditionTypeColor = ["springgreen", "orangered", "mediumaquamarine", "darkorange"]
    return (
        <div className="App-header">
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gap: 1,
                    gridTemplateRows: 'auto',
                    gridTemplateAreas: `"bigTechCheckbox bigTechCheckbox bigTechCheckbox bigTechCheckbox bigTechCheckbox bigTechCheckbox bigTechCheckbox"
                    "cloudCheckbox cloudCheckbox cloudCheckbox cloudCheckbox cloudCheckbox cloudCheckbox cloudCheckbox"
                    "securityCheckbox securityCheckbox securityCheckbox securityCheckbox securityCheckbox securityCheckbox securityCheckbox"
                    "searchCondition searchCondition searchCondition searchCondition searchCondition searchInputField conditionList"`,
                }}
                >
                
                <Box sx={{ gridArea: 'bigTechCheckbox', display: 'flex', alignItems: 'flex-start' }} >
                    {bigTechs.map((organization, index) => {
                        return (
                            <OrgCheckbox key={"bc"+index} organization={organization} state={[bigTechOrgs, setBigTechOrgs]}/>
                        );
                    })}            
                </Box>
               
                <Box sx={{ gridArea: 'cloudCheckbox', display: 'flex', alignItems: 'flex-start' }}>
                    {cloudPlatforms.map((organization, index) => {
                        return (
                            <OrgCheckbox key={"cc"+index} organization={organization} state={[cloudPlatformOrgs, setCloudPlatformOrgs]} />
                        );
                    })}
                </Box>

                <Box sx={{ gridArea: 'securityCheckbox', display: 'flex', alignItems: 'flex-start' }}>
                    {secTechs.map((organization, index) => {
                        return (
                            <OrgCheckbox key={"cc"+index} organization={organization} state={[securityOrgs, setSecurityOrgs]} />
                        );
                    })}
                </Box>

                <Box sx={{ gridArea: 'searchCondition', display: 'flex', alignItems: 'flex-start'}}>
                    {searchConditions.map((condition, index) => {
                        return (
                            <Fab key={index} size="small" variant="extended" sx={{ m: 1, backgroundColor: conditionTypeColor[condition.type] }} onClick={(ev) => {                                
                                setSearchConditions(searchConditions.filter((_, i) => i !== index))
                            }}>
                                {condition.value}
                            </Fab>
                        );
                    })}
                </Box>

                <Box sx={{ gridArea: 'searchInputField' }}>
                    <FormControl>
                        <TextField id="standard-basic" label="Enter" variant="standard" placeholder='python' onKeyDown={(ev) => {
                            if (ev.key === 'Enter') {
                                setSearchConditions(previous  => [...previous , {value:ev.target.value, type:choseCondtion}])
                                ev.preventDefault();
                            }
                        }}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ gridArea: 'conditionList' }}>
                    <FormControl>                           
                        <InputLabel>Condition</InputLabel>
                        <Select
                            labelId="select-condition-label"
                            id="condition-select"
                            value={choseCondtion}
                            label="Condition"
                            onChange={choseHandleChange}
                        >
                            <MenuItem value={0}>Tag (Include)</MenuItem>
                            <MenuItem value={1}>Tag (Exclude)</MenuItem>
                            <MenuItem value={2}>Name (Include)</MenuItem>
                            <MenuItem value={3}>Name (Exclude)</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </div>
    );
}

export default Header;