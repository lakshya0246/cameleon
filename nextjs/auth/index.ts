import { withApiAuthRequired, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { TypedRequest } from "../http/server";
import { PageProps } from "../../types";

export function withAuth(
  component: (pageProps?: PageProps) => Promise<JSX.Element> | JSX.Element,
  returnTo = "/"
) {
  return withPageAuthRequired(component as () => Promise<JSX.Element>, {
    returnTo,
  });
}

export function apiWithAuth<T extends {}>(
  handlerFunction: (request: TypedRequest<T>) => any
) {
  return withApiAuthRequired(handlerFunction as any);
}
