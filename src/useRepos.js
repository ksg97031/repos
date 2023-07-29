import { useState, useEffect } from 'react';

export default function getRepos(org) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch(
      //`http://127.0.0.1:8000/api/${org}`,
      `https://repos-api.onrender.com/api/${org}`,
    ).then((res) => res.json())
    .then((data) => setRepos(data));
  }, []);

  return {
    repos
  };
}