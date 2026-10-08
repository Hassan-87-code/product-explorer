const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts({
  search = "",
  category = "",
  sortBy = "",
  order = "",
  limit = 12,
  skip = 0,
  signal,
} = {}) {
  let url = "";

  if (search) {
    url =
      API_URL +
      "/products/search?q=" +
      encodeURIComponent(search) +
      "&limit=" +
      limit +
      "&skip=" +
      skip;
  } else if (category) {
    url =
      API_URL +
      "/products/category/" +
      encodeURIComponent(category) +
      "?limit=" +
      limit +
      "&skip=" +
      skip;
  } else {
    url =
      API_URL +
      "/products?limit=" +
      limit +
      "&skip=" +
      skip;
  }

  if (!category && !search && sortBy) {
    url += "&sortBy=" + encodeURIComponent(sortBy);
  }

  if (!category && !search && order) {
    url += "&order=" + encodeURIComponent(order);
  }

  const response = await fetch(url, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  const data = await response.json();

  return {
    items: data.products || [],
    total: data.total || 0,
    skip: data.skip || 0,
    limit: data.limit || limit,
  };
}

export async function getProductById(id, signal) {
  const response = await fetch(API_URL + "/products/" + id, {
    signal,
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Product not found.");
    }

    throw new Error("Failed to fetch product.");
  }

  return response.json();
}

export async function getCategories(signal) {
  const response = await fetch(API_URL + "/products/categories", {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories.");
  }

  return response.json();
}