const mapStyle = [
        {
          featureType: "all",
          stylers: [{ color: "#E6E6FA" }],
        },
        { featureType: "water", stylers: [{ color: "#F0F8FF" }] },
        {
          featureType: "all",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "administrative.province",
          elementType: "geometry.stroke",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "geometry.stroke",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          stylers: [{ visibility: "off" }],
        },
      ]

     export default mapStyle;