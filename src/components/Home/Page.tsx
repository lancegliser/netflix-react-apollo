import React from "react";
import { Helmet } from "react-helmet-async";
import { routeHomeTitle } from "./Router";
import App from "../App/App";
import { getMetaTitle } from "../../utils/meta";
import { Card, CardContent, Link, Typography } from "@mui/material";

const Page: React.FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <title>{getMetaTitle([routeHomeTitle])}</title>
      </Helmet>
      <App>
        <Card sx={{ maxWidth: "66%", margin: "1rem auto 0" }}>
          <CardContent>
            <Typography gutterBottom>
              Edit <code>src/App.tsx</code> and save to reload.
            </Typography>

            <Typography>
              <Link href={"https://react.dev/"}>Learn React</Link>
            </Typography>
          </CardContent>
        </Card>
      </App>
    </>
  );
};
export default Page;
