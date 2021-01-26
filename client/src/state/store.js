import { atom } from "jotai";

export const successAlertAtom = atom(false);
export const isSubmittingAtom = atom(false);
export const deckIdAtom = atom(null);

export const dropAtom = atom(null);

export const modalAtom = atom({
  toggleOn: false,
  modalId: 0,
  target: null,
  editImg: false,
  editFileText: null,
});
