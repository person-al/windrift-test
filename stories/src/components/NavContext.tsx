import * as React from "react";

export enum Pages {
  CurrStatus = "POEM",
  About = "STORY",
  Home = "LAND",
}

export enum TutorialStep {
  None = "NONE",
  Rules = "RULES",
  Image = "IMAGE",
  TokenList = "TOKENLIST",
}

export type NavContextType = {
  currPage: Pages;
  setCurrPage: (p: Pages) => void;
  tutorialState: TutorialStep;
  setTutorialState: (_: TutorialStep) => void;
};

export const NavContext = React.createContext<NavContextType>({
  currPage: Pages.About,
  setCurrPage: (_: Pages) => {},
  tutorialState: TutorialStep.None,
  setTutorialState: (_: TutorialStep) => {},
});

export const useNavContext = (): NavContextType => {
  return React.useContext(NavContext);
};
