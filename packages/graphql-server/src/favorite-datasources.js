import {RESTDataSource} from "apollo-datasource-rest"

export class MyFavoriteDatasource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5000/favorite';
    this.cacheOptionsFor(0);
  }

  async addFavorite(url) {
    console.log(`📌 {url:${url}}`)
    return this.post(`/`, {url: url});
  }

  async getFavorite() {
    return this.get(`/`);
  }

  async removeFavorite(url) {
    return this.post(`/`, {url: url, delete:true});
  }

  async getNumberOfFavorites(url) {
    const result = await this.get(`/?url=${url}`);
    return result.length || 0
  }

  async isFavorite(url) {
    if (this.context.token) {
      const result = await this.get(`/?url=${url}`);
      console.log(`💡 result ${result} == ${this.context.token}`)
      return result.includes(this.context.token);
    }
    return false;
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
