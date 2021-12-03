import {RESTDataSource} from "apollo-datasource-rest"

export class MyFavoriteDatasource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5000/favorite';
  }

  async addFavorite(body) {
    console.log(`📌 {url:${body}}`)
    return this.post(`/`, {url: body});
  }

  async getFavorite() {
    return this.get(`/`);
  }

  async isFavorite(url) {
    return this.get(`/?url=${url}`);
  }

  willSendRequest(request) {
    if (this.context.token) {
      request.headers.set('Authorization', this.context.token);
    }
 }

  // force 1 day ttl for all requests
  cacheOptionsFor() {
    return { ttl: 60 * 60 * 24 }
  }
}
