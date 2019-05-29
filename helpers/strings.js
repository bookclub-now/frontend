export const capitalize = input =>
  input
    .toString()
    .charAt(0)
    .toUpperCase() + input.toString().slice(1);
