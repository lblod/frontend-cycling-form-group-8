import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class GemeentenPrijzen extends Component {
  @tracked municipalities; // array of objects; each object has 'postalCode', 'name' and 'uri'

  @action
  async fetchMunicipalities() {
    const fileId = "66e9eed8a09931000d000006"; // TODO: should not be hardcoded

    const response = await fetch(`/gpx/municipalities?id=${fileId}`, {
      method: "GET",
    });
    this.municipalities = await response.json();
    console.log(this.municipalities);
  }
}
