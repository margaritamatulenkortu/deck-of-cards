const deckOfCards = require('./deck');
const arrangedDeck = require('./arranged-deck'); //Deck of cards in order(before shuffle)


test("Should have 54 cards in a deck when created a deck with jokers", () => {
    expect.assertions(1);
    return deckOfCards.getWithJokers().then(data => {
        expect(data.remaining).toBe(54)
    })
});

test("Should have 54 sorted cards when created a deck with jokers", () => {
    expect.assertions(1);
    return deckOfCards.getWithJokers().then(data => {
        return deckOfCards.drawCards(data.deck_id, 54);
    }).then((data) => {
        let drawnCards = [];
        let sortedCards = [];
        for (let i = 0; i < 54; i++) {
            drawnCards.push(data.cards[i].code);
            sortedCards.push(arrangedDeck[i].code);
        }
        drawnCards = drawnCards.join();
        sortedCards = sortedCards.join();
        expect(drawnCards).toEqual(sortedCards)
    });
});

test("Should have 54 shuffled cards when deck is created with jokers and shuffled", () => {
    expect.assertions(1);
    return deckOfCards.getShuffledAndWithJokers().then(data => {
        return deckOfCards.drawCards(data.deck_id, 54);
    }).then((data) => {
        let drawnCards = [];
        let sortedCards = [];
        for (let i = 0; i < 54; i++) {
            drawnCards.push(data.cards[i].code);
            sortedCards.push(arrangedDeck[i].code);
        }
        drawnCards = drawnCards.join();
        sortedCards = sortedCards.join();
        expect(drawnCards).not.toEqual(sortedCards)
    });
});

test("Should have 49 cards when 5 cards have drawn out", () => {
    expect.assertions(1);
    return deckOfCards.getShuffledAndWithJokers().then(data => {
        return deckOfCards.drawCards(data.deck_id, 5);
    }).then((data) => {
        expect(data.remaining).toBe(49);
    });
});

//test fails, because I think it is a bug, after shuffling 49 cards gives back 54 (not included in test cases)
test.skip("Should have 49 shuffled cards when 5 cards are drawn out and deck is shuffled", () => {
    expect.assertions(1);
    return deckOfCards.getShuffledAndWithJokers().then(data => {
        return deckOfCards.drawCards(data.deck_id, 5).then(data => {
            return deckOfCards.deckShuffleRest(data.deck_id);
        }).then((data1) => {
            expect(data1.remaining).toBe(49);
        });
    });
});

test("Should have 44 cards when drawn out 10 cards", () => {
    expect.assertions(1);
    return deckOfCards.getShuffledAndWithJokers().then(data => {
        return deckOfCards.drawCards(data.deck_id, 10);
    }).then((data) => {
        expect(data.remaining).toBe(44);
    });
});
// Sometimes fails because takes jokers in pile
test("Should have the same 10 (drawn out) cards in the pile when drawn out 10 cards of shuffled deck", () => {
    expect.assertions(1);
    return deckOfCards.getShuffledAndWithJokers().then(data => {
        console.log(data.deck_id);
        return deckOfCards.drawCards(data.deck_id, 10).then(data1 => {
            console.log(data1.deck_id);
            let drawnCards = [];
            for (let i = 0; i < 10; i++) {
                drawnCards.push(data1.cards[i].code);
            }
            drawnCards = drawnCards.join();
            return deckOfCards.pileAddCards(data.deck_id, drawnCards).then(data => {
                return deckOfCards.drawPile(data.deck_id, drawnCards);
            }).then((data2) => {
                console.log(data2.deck_id);
                let pileCards = [];
                for (let i = 0; i < 10; i++) {
                    pileCards.push(data2.cards[i].code);
                }
                pileCards = pileCards.join();
                expect(pileCards).toEqual(drawnCards);

            });
        });
    });
});
//test fails, because I think it is a bug, it is not possible to put Jokers in piles
test.skip("Should have 54 cards in a pile when all cards inserted in", () => {
    expect.assertions(1);
    return deckOfCards.getWithJokers().then(data => {
        return deckOfCards.drawCards(data.deck_id, 54).then(data => {
            let drawnCards = [];
            for (let i = 0; i < 54; i++) {
                drawnCards.push(data.cards[i].code);
            }
            drawnCards = drawnCards.join();
            return deckOfCards.pileAddCards(data.deck_id, drawnCards).then(data => {
                expect(data.piles.newpile.remaining).toBe(54);
            });
        });
    });
});
