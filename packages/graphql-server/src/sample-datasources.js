import {RESTDataSource} from "apollo-datasource-rest"

export class MySampteDatasource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://34.76.108.27/api/';
  }

  async getById(id, type) {
    return this.get(`${type}/${id}`);
  }

  // force 1 day ttl for all requests
  cacheOptionsFor() {
    return { ttl: 60 * 60 * 24 }
  }
}
