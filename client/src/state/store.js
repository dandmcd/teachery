import { atom } from "jotai";

//Alerts
export const successAlertAtom = atom(false);
export const isPasswordChangedAtom = atom(false);
export const isSubmittingAtom = atom(false);
export const customErrorAtom = atom(null);
// Temporarily stores the token for change password and account verification
export const paramTAtom = atom("");

//Create and edit items
export const deckIdAtom = atom(null);
export const dropAtom = atom(null);
export const modalAtom = atom({
  toggleOn: false,
  modalId: 0,
  target: null,
  editImg: false,
  editFileText: null,
});

//Deck Bookmarks
export const bookmarkAtom = atom({
  toggleBookmarks: false,
  linkedToPage: false,
});

//Search Controller
export const searchAtom = atom({
  toggleOn: false,
  target: null,
  noResult: false,
  tagName: "",
  tags: [],
});
