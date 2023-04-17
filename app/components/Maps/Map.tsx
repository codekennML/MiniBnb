import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState, useRef } from "react";



interface MapboxMapProps {
  initialOptions?: Omit<mapboxgl.MapboxOptions, "container">;
  onMapLoaded? : (map: mapboxgl.Map) => void;
  onMapRemoved? : () => void;
  center? : [lat : number , lng: number]
}

function MapboxMap({ initialOptions = {}, onMapLoaded, onMapRemoved, center }: MapboxMapProps) {
  const [map, setMap] = useState<mapboxgl.Map>();

  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: "pk.eyJ1IjoiY29kZWtlbm5tbCIsImEiOiJjbGRlcmFobjUwZ2M2M3BxcGhvbDBjMDR4In0.CdscqXOFjzxvwScgwy6Ysw",
      style: "mapbox://styles/mapbox/streets-v12",
      center: center,
      zoom: 12,
      ...initialOptions,
    });

    setMap(mapboxMap);

    if (onMapLoaded) mapboxMap.once("load", onMapLoaded);

        return () => {
      mapboxMap.remove();
      if (onMapRemoved) onMapRemoved();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="rounded-lg" ref={mapNode} style={{ width: "100%", height: "100%" }} />;
}

export default MapboxMap;