import dynamic from "next/dynamic";
import Head from "next/head";
import { useMemo, useRef, useState } from "react";

export default function Home() {
  const [locations] = useState([
    {
      id: 1,
      name: "GoWork - Pacific Place",
      image: "/images/coworking-a.png", // Add your image paths here
      address: "Pacific Place Mall, SCBD, Jakarta",
      coordinates: [-6.2251, 106.8088],
    },
    {
      id: 2,
      name: "WeWork - Revenue Tower",
      image: "/images/coworking-b.png",
      address: "Revenue Tower, SCBD, Jakarta",
      coordinates: [-6.2258, 106.8093],
    },
    {
      id: 3,
      name: "CoHive - Plaza Kuningan",
      image: "/images/coworking-c.png",
      address: "Plaza Kuningan, Jakarta Selatan",
      coordinates: [-6.2101, 106.8329],
    },
    {
      id: 4,
      name: "Multivision Tower",
      image: "/images/coworking-d.png",
      address: "Multivision Tower, Kuningan, Jakarta Selatan",
      coordinates: [-6.2204, 106.8296],
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const mapRef = useRef();
  const [selectedLocationId, setSelectedLocationId] = useState(null);
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
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setViewMode("list")}
              >
                List
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setViewMode("grid")}
              >
                Grid
              </button>
            </div>
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
              <li
                key={location.id}
                onClick={() => handleLocationClick(location)}
                className="p-3 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-200"
              >
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold">{location.name}</h3>
                <p className="text-sm text-gray-600">{location.address}</p>
              </li>
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
