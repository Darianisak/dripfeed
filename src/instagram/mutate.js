"use strict";

export const Targets = {
  DRAWER_REELS: 0,
  DRAWER_EXPLORE: 1,
  PAGE_SUGGESTIONS: 2,
};

// `HOME` probably should not contain the content of default - that should
// be managed as part of Operate, I think?
//
export const Pages = {
  DEFAULT: [Targets.DRAWER_EXPLORE, Targets.DRAWER_REELS],
  HOME: [
    Targets.DRAWER_EXPLORE,
    Targets.DRAWER_REELS,
    Targets.PAGE_SUGGESTIONS,
  ],
};

export function operate() {}
