const API_URL = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';


const fetchSingleIssue = async id => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  return await res.json();
};

const fetchAllIssues = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};
