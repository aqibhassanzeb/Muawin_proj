export const MAX_FILE_SIZE = 10485760;
export const ACCEPTED_ATTACHMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "text/plain",
  "image/jpeg",
  "image/png",
  "image/jpg",
];
const headers = new Headers();
headers.append(
  "X-CSCAPI-KEY",
  "R05jbFZnTXpUbU8wQ2lxS2NWVkUzOXl4aFhPWlVrZm9DNTFrVzhSRQ=="
);

export const requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};
