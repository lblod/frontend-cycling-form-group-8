import Component from "@glimmer/component";
import { action } from "@ember/object";

export default class GemeentenPrijzen extends Component {
  @action
  async fetchMunicipalities() {
    const fileId = "66e9eed8a09931000d000006"; // TODO: should not be hardcoded

    const response = await fetch(`/gpx/municipalities?id=${fileId}`, {
      method: "GET",
    });
    const body = await response.json();
    console.log(body);
  }
}
