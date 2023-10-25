import { Decorator } from "@storybook/react";
import { Card, CardContent } from "@mui/material";

export const withCard: Decorator = (Story) => {
  return (
    <Card>
      <CardContent>
        <Story />
      </CardContent>
    </Card>
  );
};
