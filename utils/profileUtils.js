export function getInitialProfileValues(user) {
  if (!user) {
    return {
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
      userRole: "",
    };
  }

  const nameParts = user.name?.split(" ") || [];

  return {
    firstName: user.firstName || nameParts[0] || "",
    lastName: user.lastName || nameParts.slice(1).join(" ") || "",
    phone: user.phone || "",
    city: user.city || "",
    userRole: user.userRole || "",
  };
}
