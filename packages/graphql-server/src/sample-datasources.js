import {RESTDataSource} from "apollo-datasource-rest"

export class MySampleDatasource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://34.76.108.27/api/';
  }

  async getById(id, type) {
    return this.get(`${type}/${id}`);
  }

  async getAllByTypes(type) {
    return this.get(`${type}/`);
  }

  async getAllItemsById(ids, type) {
    console.log(`⚡️ /${type}?ids=${ids.join? ids.join("|") : ids}`)
    return this.get(`/${type}?ids=${ids.join? ids.join("|") : ids}`);
  }

  // force 1 day ttl for all requests
  cacheOptionsFor() {
    return { ttl: 60 * 60 * 24 }
  }
}
