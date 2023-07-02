export default class Api {
  static cache: { [key: string]: any } = {};
  static async request(url: string) {
    if (this.cache[url]) {
      return this.cache[url]
    }
    const res = await fetch(url);
    const data = await res.json();
    this.cache[url] = data;
    return data;
  }
}