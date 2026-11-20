
import { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { campusLocations } from './campusLocations'

const LocationSelector = ({ onLocationSelect }) => {
  useMapEvents({
    click(event) {
      onLocationSelect([
        event.latlng.lat,
        event.latlng.lng,
      ])
    },
  })

  return null
}

const CampusMap = ({
  reports = [],
  onLocationSelect,
  campusId,
  onCampusChange,
}) => {
  const [internalCampusId, setInternalCampusId] = useState(
    campusLocations[0].id
  )

  const [selectedLocation, setSelectedLocation] = useState(null)

  // Use the campus supplied by the parent component,
  // or the internal selection when no campusId is supplied.
  const currentCampusId = campusId ?? internalCampusId

  const selectedCampus =
    campusLocations.find((campus) => campus.id === currentCampusId) ||
    campusLocations[0]

  const handleCampusChange = (event) => {
    const newCampusId = event.target.value

    if (onCampusChange) {
      onCampusChange(newCampusId)
    } else {
      setInternalCampusId(newCampusId)
    }

    setSelectedLocation(null)

    if (onLocationSelect) {
      onLocationSelect(null)
    }
  }

  const handleLocationSelect = (coordinates) => {
    setSelectedLocation(coordinates)

    if (onLocationSelect) {
      onLocationSelect(coordinates)
    }
  }

  return (
    <div className="w-full space-y-4">
      <div>
        <label
          htmlFor="campus-select"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Select campus
        </label>

        <select
          id="campus-select"
          value={selectedCampus.id}
          onChange={handleCampusChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        >
          {campusLocations.map((campus) => (
            <option key={campus.id} value={campus.id}>
              {campus.name}
            </option>
          ))}
        </select>
      </div>

      <MapContainer
        key={selectedCampus.id}
        center={selectedCampus.coordinates}
        zoom={15}
        scrollWheelZoom={true}
        className="h-[450px] w-full rounded-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationSelector onLocationSelect={handleLocationSelect} />

        {/* Campus marker */}
        <Marker position={selectedCampus.coordinates}>
          <Popup>
            <strong>{selectedCampus.name}</strong>
          </Popup>
        </Marker>

        {/* Existing report markers */}
        {reports.map((report) => (
          report.coordinates && (
            <Marker
              key={report._id}
              position={report.coordinates}
            >
              <Popup>
                <strong>{report.title}</strong>
                <br />
                {report.category}
                <br />
                Status: {report.status}
              </Popup>
            </Marker>
          )
        ))}

        {/* Selected report location */}
        {selectedLocation && (
          <Marker position={selectedLocation}>
            <Popup>Selected report location</Popup>
          </Marker>
        )}
      </MapContainer>

      <p className="text-sm text-gray-600">
        Click on the map to select the location of your report.
      </p>
    </div>
  )
}

export default CampusMap
