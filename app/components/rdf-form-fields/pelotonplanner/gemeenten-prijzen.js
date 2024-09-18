import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class GemeentenPrijzen extends Component {
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
}
