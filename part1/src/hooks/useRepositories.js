import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

export const useRepositories = (variables) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const repositories = data?.repositories.edges.map((edge) => edge.node) || [];

  return {
    repositories,
    loading,
    error,
  };
};

// DEEPSEEK option
// import { useQuery } from "@apollo/client";
// import { GET_REPOSITORIES } from "../graphql/queries";

// export const useRepositories = (variables) => {
//   const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
//     variables,
//     fetchPolicy: "cache-and-network",
//   });
//   const handleFetchMore = () => {
//     const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
//     if (!canFetchMore) return;
//     fetchMore({
//       variables: {
//         after: data.repositories.pageInfo.endCursor,
//         ...variables,
//       },
//     });
//   };

//   const repositories = data?.repositories.edges.map((edge) => edge.node) || [];

//   return {
//     repositories,
//     fetchMore: handleFetchMore,
//     loading,
//     ...result,
//   };
// };

// import { useState, useEffect } from "react";

// const useRepositories = () => {
//   const [repositories, setRepositories] = useState();
//   const [loading, setLoading] = useState(false);

//   const fetchRepositories = async () => {
//     setLoading(true);
//     const response = await fetch("http://192.168.100.38:5000/api/repositories");
//     const json = await response.json();
//     setLoading(false);
//     setRepositories(json);
//   };

//   useEffect(() => {
//     // console.log(
//     //   "Hermes:",
//     //   global.HermesInternal ? "✅ активен" : "❌ не активен",
//     // );
//     fetchRepositories();
//   }, []);

//   return {
//     repositories,
//     loading,
//     refetch: fetchRepositories,
//   };
// };

// export default useRepositories;
