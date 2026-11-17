export const nav = [
  { href: "/host", label: "Host a charger" },
  { href: "/charge", label: "Charge your EV" },
  { href: "/about", label: "About" },
] as const;

export const socketOptions = [
  { value: "15a", label: "15A household socket" },
  { value: "3.3", label: "About 3.3 kW charger" },
  { value: "7.2", label: "7.2 kW or faster" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const vehicleOptions = [
  { value: "scooter", label: "Scooter or motorcycle" },
  { value: "auto", label: "Auto or three-wheeler" },
  { value: "car", label: "Car" },
  { value: "several", label: "More than one" },
] as const;
