export function updateLocationName(locationName) {
  const locationElement = document.querySelector(".location");
  if (locationElement) {
    locationElement.textContent = locationName;
  }
}
