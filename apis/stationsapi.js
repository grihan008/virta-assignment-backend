const { RESTDataSource } = require('apollo-datasource-rest');

class StationsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.test.virtaglobal.com/';
  }

  async getStations() {
    return this.get('stations');
  }

  async getStation(id) {
    return this.get(`stations/${id}`);
  }
}

module.exports = StationsAPI;
