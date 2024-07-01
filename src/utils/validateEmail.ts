export const validateEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    return false;
  }
  const [localPart, domainPart] = email.split("@");
  if (!localPart || !domainPart) {
    return false;
  }
  if (localPart.length > 64) {
    return false;
  }
  if (domainPart.length > 255) {
    return false;
  }
  if (domainPart.indexOf(".") === -1) {
    return false;
  }
  const domainParts = domainPart.split(".");
  for (const part of domainParts) {
    if (
      part.length < 2 ||
      !/^[a-zA-Z0-9-]+$/.test(part) ||
      /^-|-$/.test(part)
    ) {
      return false;
    }
  }

  return true;
};
