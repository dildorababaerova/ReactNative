import { useState, useEffect } from "react";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);
    const response = await fetch("http://192.168.100.38:5000/api/repositories");
    const json = await response.json();
    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    // console.log(
    //   "Hermes:",
    //   global.HermesInternal ? "✅ активен" : "❌ не активен",
    // );
    fetchRepositories();
  }, []);

  return {
    repositories,
    loading,
    refetch: fetchRepositories,
  };
};

export default useRepositories;
