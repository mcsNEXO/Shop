import { useLocation } from "react-router-dom";

export default function useGenderTypeCategory() {
  const location = useLocation();

  let gender = null;
  let type = null;
  let category = null;

  if (location.pathname.includes("/w")) {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (pathSegments.length >= 4) {
      gender = pathSegments[1];
      type = pathSegments[2];
      category = pathSegments[3];
    }
  }

  return { gender, type, category };
}
