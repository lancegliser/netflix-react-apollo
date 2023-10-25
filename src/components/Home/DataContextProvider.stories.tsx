import { IDataContext } from "./DataContext";
import { Meta } from "@storybook/react";
import { ContentSuggestionsQueryHookResult } from "../../generated/types";

export const dataContextStoryDefaults: IDataContext = {
  suggestionsQuery: {
    loading: false,
    data: {
      content: {
        suggestions: {
          dynamic: [
            {
              displayName: undefined,
              items: [
                {
                  id: "1234",
                  primary: "Primary",
                  secondary: "Secondary",
                },
              ],
            },
          ],
        },
      },
    },
    error: undefined,
  } as ContentSuggestionsQueryHookResult,
};

export const dataContextStoryLoading: IDataContext = {
  suggestionsQuery: {
    loading: true,
    data: undefined,
    error: undefined,
  } as ContentSuggestionsQueryHookResult,
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta = {
  title: "DataContextProvider",
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  includeStories: ["Primary"],
};

export default meta;

export const Primary = () => <p>See components</p>;
