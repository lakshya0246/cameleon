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

type MutationFetcherArgs<T = any> = [string, { arg: T }];
export async function deleteItem(...args: MutationFetcherArgs<{ id: string }>) {
  const res = await fetch(`${args[0]}`, {
    method: "DELETE",
    headers: {},
    body: JSON.stringify(args[1].arg),
  });
  return await (res.json() as Promise<{ id: string }>);
}

export async function updateItem<T = any>(
  ...args: MutationFetcherArgs<T>
): Promise<T> {
  return fetch(args[0], {
    method: "PUT",
    headers: {},
    body: JSON.stringify(args[1].arg),
  }).then((res) => res.json());
}

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
