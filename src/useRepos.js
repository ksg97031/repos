import { useState, useEffect } from 'react';

export default function getRepos(org) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    try {
      let response = fetch(
        `https://repos-api.onrender.com/api/${org}`,
      );
      let responseJson = response.json();
      setRepos(responseJson);
    } catch (error) {
      console.error(error);
    }
  }, [org]);

  return {
    repos
  };
}