export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  request(endPoint, method, body) {
    return fetch(
      `${this._baseUrl}/${endPoint}`,
      {
        method: method,
        headers: this._headers,
        body:JSON.stringify(body)
      }
    ).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }
}
