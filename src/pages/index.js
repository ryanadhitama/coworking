import LocationCard from "@/components/location";
import SwitchMode from "@/components/switch-mode";
import { locations } from "@/utils/location";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useMemo, useRef, useState } from "react";

export default function Home() {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  const mapRef = useRef();
  const handleLocationClick = (location) => {
    setSelectedLocationId(location.id);
    if (mapRef.current) {
      mapRef.current.flyTo(location.coordinates, 15); // Fly to the selected location
    }
  };

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/coworking"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      <Head>
        <title>Coworking Space</title>
      </Head>
      <div className="flex flex-col-reverse md:flex-row h-screen">
        {/* Left section with search, list/grid, and toggle */}
        <div className="w-full md:w-1/3 p-5 overflow-y-auto bg-gray-100 h-[60vh] md:h-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
            <h2 className="text-2xl font-bold mb-3 md:mb-0">
              Co-working Spaces
            </h2>
            <SwitchMode viewMode={viewMode} onSwitchMode={setViewMode} />
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name or address"
            className="w-full mb-5 p-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <ul
            className={`${
              viewMode === "grid" ? "grid grid-cols-2 gap-4" : "space-y-4"
            }`}
          >
            {filteredLocations.map((location) => (
              <LocationCard
                location={location}
                key={location.id}
                onClick={() => handleLocationClick(location)}
              />
            ))}
          </ul>
        </div>

        {/* Right section with map */}
        <div className="w-full md:w-2/3 h-[40vh] md:h-full">
          <Map
            locations={filteredLocations} // Pass filtered locations to the map
            mapRef={mapRef}
            selectedLocationId={selectedLocationId}
          />
        </div>
      </div>
    </>
  );
}
