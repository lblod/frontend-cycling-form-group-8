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

    const url = '/blauwe-lus.gpx';
    const options = {
      async: true,
      polyline_options: { color: 'red' },
    };

    new leaflet.GPX(url, options).on('loaded', (e) => {
      this.map.fitBounds(e.target.getBounds());
    }).addTo(this.map);
  }
}
