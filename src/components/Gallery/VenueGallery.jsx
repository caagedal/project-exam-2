import React from "react";
import DesktopGallery from "./DesktopGallery";
import MobileGallery from "./MobileGallery";

const VenueGallery = ({ images }) => {
  return (
    <div className="mx-auto">
      <DesktopGallery images={images} />
      <MobileGallery images={images} />
    </div>
  );
};

export default VenueGallery;
