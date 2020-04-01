## Deck of Cards An API Test

https://deckofcardsapi.com/  
Tested on MacOS Mojave, Node v12.14.1.

In the project there are 8 tests. Two of them are skipped, because they failed.

In the test: "Should have 49 shuffled cards when 5 cards are drawn out and deck is shuffled"
When 5 cards drawn from deck, after shuffling rest cards it gives back full deck. 

Expected value to be:
  49

Received:
  54
  
In the test: "Should have the same 10 (drawn out) cards in the pile when drawn out 10 cards of shuffled deck".
Sometimes it fails because takes jokers in pile.
 
  
In the test: "Should have 54 cards in a pile when all cards inserted in"

Expected value to be:
  54

Received:
  52

From this it can be deduced that it is not possible to put Jokers in pile.
  

  

### Installation

1. cmd: `node install`
2. cmd: `jest`