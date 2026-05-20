const BASE_URL = "https://janardhan-portfolio-server.vercel.app/api/v1";

export async function apiRequest(path: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      (data && data.message) || `Request failed with status ${response.status}`
    );
  }

  return data;
}

// 1. Projects API
export const projectsApi = {
  getAll: (searchParams?: string) => 
    apiRequest(`/projects${searchParams ? `?${searchParams}` : ""}`),
  create: (payload: any) => 
    apiRequest("/projects", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  delete: (id: string) => 
    apiRequest(`/projects/${id}`, {
      method: "DELETE",
    }),
};

// 2. Blogs API
export const blogsApi = {
  getAll: (searchParams?: string) => 
    apiRequest(`/blogs${searchParams ? `?${searchParams}` : ""}`),
  create: (payload: any) => 
    apiRequest("/blogs", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  delete: (id: string) => 
    apiRequest(`/blogs/${id}`, {
      method: "DELETE",
    }),
};

// 3. Skills API
export const skillsApi = {
  getAll: (searchParams?: string) => 
    apiRequest(`/skills${searchParams ? `?${searchParams}` : ""}`),
  create: (payload: any) => 
    apiRequest("/skills", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (id: string, payload: any) => 
    apiRequest(`/skills/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
};

// 4. Experiences API
export const experiencesApi = {
  getAll: (searchParams?: string) => 
    apiRequest(`/experiences${searchParams ? `?${searchParams}` : ""}`),
  create: (payload: any) => 
    apiRequest("/experiences", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
