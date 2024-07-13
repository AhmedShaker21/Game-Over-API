export class Game {

    constructor(gameid) {
        this.gameid = gameid
    }

    async getGameDetails() {
        const options = {
            method: 'GET',
            headers: {
		'x-rapidapi-key': 'd25b75fd90mshbf4c19dd7c95a41p128ed1jsn3929b25b7fa6',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.gameid}`, options)
        const response = await api.json();
        console.log(response)

        return response;
    };


}