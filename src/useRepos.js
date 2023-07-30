import { useState, useEffect } from 'react';

export default function getRepos(org) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.API_URL}/${org}`,
    ).then((res) => res.json())
    .then((data) => setRepos(data));
  }, []);

  return {
    repos
  };
}