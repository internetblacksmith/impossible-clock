// Special digit value the seven-segment CSS uses to render "blank" segments.
export const HIDDEN_DIGIT = "10";

export function zeroPad(n) {
  return String(n).padStart(2, "0");
}

// Returns the (position)-th digit (0 or 1) of date.<getter>() as a string,
// zero-padded to two characters; or HIDDEN_DIGIT when `enabled` is false.
export function digit(date, getter, position, enabled) {
  if (!enabled) return HIDDEN_DIGIT;
  return zeroPad(getter(date))[position];
}

export function status(flag) {
  return flag ? "on" : "off";
}

export function statusClass(hour, minute, second) {
  return `${status(hour)}-${status(minute)}-${status(second)}`;
}
