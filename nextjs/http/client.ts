"use client";
import useSWRMutation from "swr/mutation";
export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export const useMutation = <Payload extends any, Response = {}, Error = {}>(
  route: string,
  fetcher: Parameters<
    typeof useSWRMutation<Response, Error, string, Payload>
  >[1],
  args?: Parameters<typeof useSWRMutation<Response, Error, string, Payload>>[2]
) => useSWRMutation<Response, Error, string, Payload>(route, fetcher, args);

export type MutationFetcher<T = any> = (
  url: string,
  payload: { arg: T }
) => Promise<T>;

export const deleteItem: MutationFetcher<{
  id: string;
}> = async (url, payload) => {
  const res = await fetch(`${url}`, {
    method: "DELETE",
    headers: {},
    body: JSON.stringify(payload.arg),
  });
  return await (res.json() as Promise<{ id: string }>);
};

export async function addItem<T = any>(
  url: string,
  payload: { arg: T }
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: {},
    body: JSON.stringify(payload.arg),
  });
  return await (res.json() as Promise<T>);
}
