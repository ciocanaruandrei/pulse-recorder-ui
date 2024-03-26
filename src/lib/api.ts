import ky from "ky";

type RequestParams = {
  method: string;
  url: string;
  body?: any;
  query?: Record<string, string | number>;
};

export default async function apiRequest<T>({ method, url, body, query }: RequestParams): Promise<T> {
  const reqUrl = import.meta.env.VITE_BASE_URL + "/api" + url;
  try {
    const res = await ky(reqUrl, {
      method,
      body: JSON.stringify(body),
      searchParams: query,
    }).json();

    return <T>res;
  } catch (err: any) {
    if (err.name === "HTTPError") {
      throw new Error(await err.response.json());
    }
    console.log(err);
    throw new Error("Unexpected error");
  }
}
