import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import 'leaflet-gpx'; // Import the GPX plugin


export default class LeafletGpx extends Component {
  @service('ember-leaflet') leaflet; // Accessing ember-leaflet service
  
  lat = 45.519743;
  lng = -122.680522;
  zoom = 10;

  @tracked map;
  @tracked show = false;

  @action
  setupMap(mapInstance) {
    console.log("mapInstance: ", mapInstance)
    console.log(leaflet)
    this.map = mapInstance.target;
 // Use the service to get the Leaflet map instance
    this.loadGpx();
  }

  loadGpx() {
    if (!this.map) {
      console.error('Map instance is not available');
      return;
    }

    const url = '/assets/blauwe-lus.gpx';
    const options = {
      async: true,
      polyline_options: { color: 'red' },
    };

    new leaflet.GPX(url, options).on('loaded', (e) => {
      this.map.fitBounds(e.target.getBounds());
    }).addTo(this.map);
  }


  // GEMEENTE + PRIJZEN TABLE
  @tracked municipalities; // array of objects; each object has 'postalCode', 'name', 'uri' and 'cost'

  @action
  async fetchMunicipalities() {
    const fileId = "66e9eed8a09931000d000006"; // TODO: should not be hardcoded

    const response = await fetch(`/gpx/municipalities?id=${fileId}`, {
      method: "GET",
    });
    const body = await response.json();

    this.municipalities = body.map((municipality) => {
      return {
        ...municipality,
        cost: this.fetchCost(municipality.uri),
      };
    });
  }

  // Hackathon: mocked for now
  fetchCost(municipalityUri) {
    console.log("Fetching cost for municipality ...:", municipalityUri);
    return Math.floor(Math.random() * (125 - 25 + 1)) + 25;
  }

  get totalCost() {
    if (!this.municipalities) return 0;

    return this.municipalities.reduce(
      (total, municipality) => total + municipality.cost,
      0
    );
  }
}
