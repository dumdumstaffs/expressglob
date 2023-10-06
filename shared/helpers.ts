export const capitalise = (str: string) => {
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
};

export const capitaliseSentence = (sentence: string) => {
  return sentence
    .split(" ")
    .map((word) => capitalise(word))
    .join(" ");
};

export const ensureArray = <T>(item: T | T[]) => {
  if (Array.isArray(item)) return item;
  else if (item === undefined || item === null) return [];
  else return [item];
};

export const arrayIncludes = <Haystack>(
  needle: any,
  haystack: ReadonlyArray<Haystack>,
): needle is Haystack => {
  if (haystack.includes(needle as Haystack)) return true;

  return false;
};
