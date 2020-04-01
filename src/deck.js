const axios = require("axios");
const deckOfCards = {
//new 52 cards in deck and adding jokers (2 cards) to deck
    getWithJokers: () => {
        const url = 'https://deckofcardsapi.com/api/deck/new/?jokers_enabled=true';
        return axios
            .get(url)
            .then(res => res.data)
    },

    //pull all cards from deck
    drawCards: (deck_id, number) => {
        const url = 'https://deckofcardsapi.com/api/deck/' + deck_id + '/draw/?count='+number+'&jokers_enabled=true';
        return axios
            .get(url)
            .then(res => res.data)
    },
    //shuffled deck
    getShuffledAndWithJokers: () => {
        const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?jokers_enabled=true';
        return axios
            .get(url)
            .then(res => res.data)
    },

    //shuffle rest cards after pulling out cards
    deckShuffleRest: (deck_id) => {
        const url = 'https://deckofcardsapi.com/api/deck/' + deck_id + '/shuffle/?jokers_enabled=true';
        console.log(url);
        return axios
            .get(url)
            .then(res => res.data)
    },


    pileAddCards: (deck_id, cards) => {
        const url = 'https://deckofcardsapi.com/api/deck/' + deck_id + '/pile/newpile/add/?cards=' + cards;
        console.log(url);
        return axios
            .get(url)
            .then(res => res.data)
    },


    drawPile: (deck_id, cards) => {
        const url = 'https://deckofcardsapi.com/api/deck/' + deck_id + '/pile/newpile/draw/?cards=' + cards;
        console.log(url);
        return axios
            .get(url)
            .then(res => res.data)
    },
};

module.exports = deckOfCards;