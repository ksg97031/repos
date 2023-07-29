import * as React from 'react';
import './Content.css';
import getRepos from './useRepos'
import {OptionContext} from './OptionContext'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import GithubTokenPopup from './GithubTokenPopup';
import {useCookies} from 'react-cookie';

function formatNumber(num) {
  const units = ["", "k", "M", "B", "T"]; // Add more units as needed for larger numbers
  let unitIndex = 0;
  while (num >= 1000 && unitIndex < units.length - 1) {
    num /= 1000;
    unitIndex++;
  }

  // Otherwise, return the number formatted to one decimal place,
  // with the appropriate unit.
  const result = num.toFixed(1) + units[unitIndex];
  if (result.endsWith(".0")){
    return result.slice(0, -2) + units[unitIndex];
  }

  return result;
}

function topicClick(setSearchConditions, topic){
  setSearchConditions(previous  => [...previous , {value:topic, type:0}])
}

let exceedFlag = false;
const ListRepository = ({ org, searchConditions, setSearchConditions}) => {
  if (exceedFlag) {
    return false;
  }
  const [cookies, setCookie, removeCookie] = useCookies(['githubToken']);

  let pages = [1]
  if (cookies.githubToken) {
    pages = [1,2,3];
  }
  let mergedRepos = [];

  for (let i = 0; i < pages.length; i++) {
    const {repos} = getRepos(org.toLowerCase(), pages[i], cookies.githubToken);
    if (repos) {
      mergedRepos = mergedRepos.concat(repos);
    } else if (repos == false) {
      console.log('exceed limit');
      exceedFlag = true;
      removeCookie('githubToken', { path: '/' });
      break;
    }
  }

  let filterRepos = []
  if (searchConditions && searchConditions.length > 0 && mergedRepos.length > 0) {
    mergedRepos.map((repo) => {
      let isMatch = true;
      searchConditions.map((condition) => {
        let conditionValue = condition.value.toLowerCase();
        if (condition.type === 0) {
          if (!repo.topics.includes(conditionValue)) {
            isMatch = false;
          }
        }
        else if (condition.type === 1) {
          if (repo.topics.includes(conditionValue)) {
            isMatch = false;
          }
        }
        else if (condition.type === 2) {
          if (!repo.name.toLowerCase().includes(conditionValue)) {
            isMatch = false;
          }
        }
        else if (condition.type === 3) {
          if (repo.name.toLowerCase().includes(conditionValue)) {
            isMatch = false;
          }
        }
      });
      
      if (isMatch) {
        filterRepos.push(repo);
      }
    })
  }

  if (!filterRepos || filterRepos.length == 0) {
    return null;
  }

  const orgName = org[0].toUpperCase() + org.slice(1);
  const orgAvatar = filterRepos[0]['owner']['avatar_url'];
  return (
    <List sx={{ width: '32%', minWidth:350, maxWidth: 550, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={orgName} src={orgAvatar}/>
        </ListItemAvatar>
        <ListItemText primary={orgName}/>
      </ListItem>
      {filterRepos.map((repo, index) => (
        <React.Fragment key={index}>
          <ListItemButton key={'repo'+index} href={repo.html_url} target="_blank">
            <ListItemText primary={repo.name} secondary={repo.description} />
          
            <Box sx={{ m: 1, ml: 2 }} display="flex" alignItems="center">
              <Box mr={2}>
                <Typography variant="body1">{repo.language ? repo.language : 'Unknown'}</Typography>
              </Box>
              <StarOutlineIcon/>
              <Box mr={2}>
                <Typography variant="body1">{formatNumber(repo.stargazers_count)}</Typography>
              </Box>
            </Box>
          </ListItemButton>
          <ListItem key={'tag'+index}>
            <Stack direction="row" flexWrap="wrap">
              {repo.topics.map((topic, index) => (
                <Chip label={topic} key={index} sx={{ margin: 0.3 }} onClick={() => topicClick(setSearchConditions, topic)}/>
              ))}
            </Stack>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
}

function Content() {
  const {
    bigTechOrgs,
    cloudPlatformOrgs,
    searchConditions,
    setSearchConditions,
    securityOrgs,
  } = React.useContext(OptionContext);

  if (!bigTechOrgs || bigTechOrgs.length === 0) return <div></div>;

  return (
    <Box style={{ paddingTop: 20 }} display="flex" flexWrap="wrap" gap={1}>
      {Object.entries(bigTechOrgs).map(([organization, value]) => {
        if (value) {
          return <ListRepository key={organization} org={organization} searchConditions={searchConditions} setSearchConditions={setSearchConditions} />;
        }
        return null; // Return null for organizations with value set to false
      })}

      {Object.entries(cloudPlatformOrgs).map(([organization, value]) => {
        if (value) {
          return <ListRepository key={organization} org={organization} searchConditions={searchConditions} setSearchConditions={setSearchConditions} />;
        }
        return null; // Return null for organizations with value set to false
      })}

      {Object.entries(securityOrgs).map(([organization, value]) => {
        if (value) {
          return <ListRepository key={organization} org={organization} searchConditions={searchConditions} setSearchConditions={setSearchConditions} />;
        }
        return null; // Return null for organizations with value set to false
      })}
    </Box>
  );
}

export default Content;