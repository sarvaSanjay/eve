import requests
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut

def get_location_coordinates(location):
    try:
        geolocator = Nominatim(user_agent="geoapiExercises")
        location = geolocator.geocode(location)
        return location.latitude, location.longitude
    except GeocoderTimedOut:
        return None

def find_nearby_places(lat, lon, place_type):
    overpass_url = "http://overpass-api.de/api/interpreter"
    query = f"""
    [out:json];
    (
      node["{place_type}"](around:5000,{lat},{lon});
      way["{place_type}"](around:5000,{lat},{lon});
      relation["{place_type}"](around:5000,{lat},{lon});
    );
    out center;
    """
    response = requests.get(overpass_url, params={'data': query})
    data = response.json()
    places = []
    for element in data['elements']:
        if 'tags' in element:
            name = element['tags'].get('name', 'Unnamed')
            place_lat = element['lat'] if 'lat' in element else element['center']['lat']
            place_lon = element['lon'] if 'lon' in element else element['center']['lon']
            places.append({'name': name, 'lat': place_lat, 'lon': place_lon})
    return places

def find_closest_place(places, lat, lon):
    if not places:
        return None
    return min(places, key=lambda place: (place['lat'] - lat)**2 + (place['lon'] - lon)**2)

def main():
    coordinates = (43.660250746098406, -79.39731944061882)

    if coordinates:
        lat, lon = coordinates
        print(f"Coordinates: {lat}, {lon}")

        public_transport = find_nearby_places(lat, lon, "public_transport")
        parks = find_nearby_places(lat, lon, "leisure=park")

        closest_transport = find_closest_place(public_transport, lat, lon)
        closest_park = find_closest_place(parks, lat, lon)

        if closest_transport:
            print(f"Closest public transport: {closest_transport['name']} at ({closest_transport['lat']}, {closest_transport['lon']})")
        else:
            print("No nearby public transport found.")

        if closest_park:
            print(f"Closest park: {closest_park['name']} at ({closest_park['lat']}, {closest_park['lon']})")
        else:
            print("No nearby parks found.")
    else:
        print("Could not find the location. Please try again.")

if __name__ == "__main__":
    main()
