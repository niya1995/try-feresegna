"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface BusTrackingMapProps {
  trip: any
}

export function BusTrackingMap({ trip }: BusTrackingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [marker, setMarker] = useState<any>(null)

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        initializeMap()
        return
      }

      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initializeMap
      document.head.appendChild(script)
    }

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return

      // Create map centered on the current bus location
      const googleMap = new window.google.maps.Map(mapRef.current, {
        center: trip.coordinates.current,
        zoom: 10,
        mapTypeId: "roadmap",
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false,
      })

      // Create a marker for the bus
      const busMarker = new window.google.maps.Marker({
        position: trip.coordinates.current,
        map: googleMap,
        title: `Bus ${trip.busNumber}`,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/bus.png",
          scaledSize: new window.google.maps.Size(32, 32),
        },
      })

      // Create markers for start and end points
      new window.google.maps.Marker({
        position: trip.coordinates.start,
        map: googleMap,
        title: trip.stops[0].name,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
          scaledSize: new window.google.maps.Size(32, 32),
        },
      })

      new window.google.maps.Marker({
        position: trip.coordinates.end,
        map: googleMap,
        title: trip.stops[trip.stops.length - 1].name,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
          scaledSize: new window.google.maps.Size(32, 32),
        },
      })

      // Draw the route path
      const path = new window.google.maps.Polyline({
        path: [trip.coordinates.start, trip.coordinates.current, trip.coordinates.end],
        geodesic: true,
        strokeColor: "#0000FF",
        strokeOpacity: 0.7,
        strokeWeight: 2,
      })

      path.setMap(googleMap)

      setMap(googleMap)
      setMarker(busMarker)
      setMapLoaded(true)
    }

    if (trip) {
      loadGoogleMapsScript()
    }

    return () => {
      const script = document.querySelector(`script[src*="maps.googleapis.com"]`)
      if (script) {
        script.remove()
      }
    }
  }, [trip])

  useEffect(() => {
    if (map && marker && trip) {
      // Update the bus marker position
      marker.setPosition(trip.coordinates.current)
      map.setCenter(trip.coordinates.current)
    }
  }, [trip?.coordinates.current, map, marker])

  return (
    <Card className="w-full">
      <CardContent className="p-2">
        {!mapLoaded && (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading map...
          </div>
        )}
        <div ref={mapRef} className="h-[400px] w-full rounded-md" />
      </CardContent>
    </Card>
  )
}
