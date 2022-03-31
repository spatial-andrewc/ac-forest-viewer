import { API_BASE_URL } from "../common/constants";

/**
 * Async await functions used to query the API 
 */

const forestError = new Error(
  "There was an issue collecting the forest information"
);

export const getForestOverviews = async ({
  page,
  forestType,
  searchQuery,
}: {
  page: number;
  forestType: string;
  searchQuery: string;
}) => {
  const params = new URLSearchParams({
    page: `${page}`,
    size: `${6}`,
  });

  if (forestType) {
    params.append("forest_type", forestType);
  }
  if (searchQuery) {
    params.append("search_query", searchQuery);
  }

  const response = await fetch(`${API_BASE_URL}/forests?${params.toString()}`);
  if (!response.ok) {
    throw forestError;
  }
  return response.json();
};

export const getForest = async ({
  forestId,
}: {
  forestId: string | undefined;
}) => {
  if (!forestId) {
    return;
  }
  const response = await fetch(`${API_BASE_URL}/forests/${forestId}`);
  if (!response.ok) {
    throw forestError;
  }
  return response.json();
};
