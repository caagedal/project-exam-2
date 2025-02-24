import React from "react";
import { Wifi, Car, Coffee, Dog, Users } from "lucide-react";

const Amenities = ({ meta, maxGuests }) => {
  const amenities = [
    { name: "WiFi", available: meta.wifi, icon: Wifi },
    { name: "Parking", available: meta.parking, icon: Car },
    { name: "Breakfast", available: meta.breakfast, icon: Coffee },
    { name: "Pets", available: meta.pets, icon: Dog },
  ];

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-neutral-dark mb-2">Amenities</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Max Guests */}
        <div className="flex items-center gap-2 text-neutral-dark font-medium">
          <Users className="w-5 h-5 text-green fill-green" />
          Max Guests: {maxGuests}
        </div>

        {/* Amenities */}
        {amenities.map(({ name, available, icon: Icon }) => (
          <div key={name} className="flex items-center gap-2 text-neutral-dark font-medium">
            <Icon
              className={`w-5 h-5 ${
                available ? "text-green fill-green" : "text-[--color-warning] fill-[--color-warning]"
              }`}
            />
            {name}: <span className={available ? "text-green" : "text-[--color-warning]"}>{available ? "Yes" : "No"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
