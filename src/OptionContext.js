import React, { useState, createContext } from 'react';
import { useCookies } from 'react-cookie';

export const OptionContext = createContext();

export default function OptionProvider({children}) {
  const [bigTechOrgs, setBigTechOrgs] = useState(initialBigTechState);
  const [cloudPlatformOrgs, setCloudPlatformOrgs] = React.useState(initialCloudPlatformState);
  const [securityOrgs, setSecurityOrgs] = React.useState(initialSecurityState);

  const searchParams = new URLSearchParams(document.location.hash.substring(1));
  let initSearchConditions = [];
  searchParams.forEach((type, org) => {
    initSearchConditions.push({value: org, type: parseInt(type)});
  });
  
  if (initSearchConditions.length == 0) {
    initSearchConditions = [{value:'security', type:0}];
  }
  
  const [searchConditions, setSearchConditions] = React.useState(initSearchConditions);
  React.useEffect(() => {
    const searchParams = new URLSearchParams();
    for (const key in searchConditions) {
        const {value, type} = searchConditions[key];
        if (searchConditions.hasOwnProperty(key)) {
            searchParams.append(value, type);
        }
    }

    const queryString = searchParams.toString();
    location.hash = queryString;
  }, [searchConditions]);

  return (
    <OptionContext.Provider value={
        {
        bigTechOrgs,
        setBigTechOrgs,
        cloudPlatformOrgs,
        setCloudPlatformOrgs,
        searchConditions, 
        setSearchConditions,
        securityOrgs,
        setSecurityOrgs
        }
    }>
        {children}
    </OptionContext.Provider>
  );
}

export const bigTechs = ['Microsoft', 'Google', 'Apache', 'Facebook', 'Alibaba', 'Tencent', 'Airbnb', 'Netflix', "Cloudflare", "Uber", "Oracle", "Yahoo"];
export const cloudPlatforms = ['AWS', 'Azure', 'GoogleCloudPlatform', 'Kubernetes', 'Docker', 'CNCF', 'Cilium','RedHatOfficial'];
export const secTechs = ['OWASP', 'OWASP-Amass', 'MITRE', 'ProjectDiscovery', 'PortSwigger', 'ZAProxy', 'Caido', 'OSS-Review-Toolkit'];

export const initialCloudPlatformState = cloudPlatforms.reduce((acc, item) => {
    return {
      ...acc,
      [item]: true,
    };
}, {});

export const initialBigTechState = bigTechs.reduce((acc, item) => {
  return {
    ...acc,
    [item]: true,
  };
}, {});

export const initialSecurityState = secTechs.reduce((acc, item) => {
  return {
    ...acc,
    [item]: true,
  };
}, {});
