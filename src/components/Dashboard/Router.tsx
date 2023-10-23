import React from "react";
import { generatePath, Outlet, RouteObject } from "react-router-dom";

export const routeDashboardSearchTitle = "Content";
export const routeContentInfo: RouteObject = {
  path: `item/:id`,
  // async lazy() {
  //   const { default: Component } = await import("../Dashboard/Page");
  //   return {
  //     Component,
  //   };
  // },
};

export type GenerateDashboardSearchPath = (
  params: RouteDashboardSearchParams,
) => string;
export type RouteDashboardSearchParams = {
  id: string;
};
export type RouteDashboardSearchQueryParams = {};
export const generateContentInfoUri: GenerateDashboardSearchPath = (params) => {
  const path = generatePath(
    [contentRouter.path, routeContentInfo.path].join("/"),
    {},
  );
  return generateContentUriQueryString(path);
};

const generateContentUriQueryString = (
  basePath: string,
  searchParams: RouteDashboardSearchQueryParams = {},
): string => {
  const filteredSearchParams = Object.entries(searchParams).reduce(
    (entries, [key, value]) => {
      switch (typeof value) {
        case "undefined":
        case "object":
          return entries;
        case "boolean":
          entries[key] = !!value ? "1" : "0";
          return entries;
        case "bigint":
        case "number":
          entries[key] = `${value}`;
          return entries;
        case "string":
          entries[key] = value;
          return entries;
        default:
          throw new Error(
            `Unhandled search query param value: `,
            value || undefined,
          );
      }
    },
    {} as Record<string, string>,
  );
  const urlSearchParams = new URLSearchParams(filteredSearchParams);

  // Safari doesn't support URLSearchParams.size, it's always undefined.
  // https://caniuse.com/mdn-api_urlsearchparams_size
  const size = Array.from(urlSearchParams.keys()).length;
  return basePath + (size > 0 ? "?" + urlSearchParams.toString() : "");
};

export const routeContentGenre: RouteObject = {
  path: `/genre/:id`,
  // async lazy() {
  //   const { default: Component } = await import("../Dashboard/Page");
  //   return {
  //     Component,
  //   };
  // },
};

export type GenerateContentGenreUriParams = {
  id: string;
};
export const generateContentGenreUri = (
  params: GenerateContentGenreUriParams,
) => {
  const path = generatePath(
    [contentRouter.path, routeContentGenre.path].join("/"),
    params,
  );
  return generateContentUriQueryString(path);
};

// Primary route
export const contentRoutesTitle = "Content";
export const contentRouter: RouteObject = {
  path: `/content`,
  element: <Outlet />,
  children: [routeContentInfo, routeContentGenre],
};
