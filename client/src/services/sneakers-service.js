export default class SneakersService {
    _apiBase = 'http://localhost:3000'

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}` + 
                `, received ${res.status}`);
        }
        return await res.json();
    }

    async getItems() {
        return await this.getResource('/sneakers/');
    }

    async getItem(id) {
        const res = this.getResource('/sneakers/');
        const item = res.find((el) => {
            return el.id === +id;
        })
        return item;
    }
}