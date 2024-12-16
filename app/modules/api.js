// Data fetching
export class PropertyApi {
  static async fetchProperties() {
    try {
      const response = await axios.get("./properties.json");
      return response.data.properties;
    } catch (error) {
      console.error("Error fetching properties:", error);
      throw new Error("Failed to load property data");
    }
  }
}