#BLACKJACK CODING TEST

**Applicants are politely asked not to disseminate or discuss the details of this coding test to others.**

###THE BLACKJACK GAME

Blackjack is a game of cards using a standard deck of cards of 4 suits (**Hearts**, **Diamonds**, **Clubs** and **Spades**), each of which has the following cards (**2**, **3**, **4**, **5**, **6**, **7**, **8**, **9**, **10**, **Jack**, **Queen**, **King**, **Ace**), and a **Deck** of cards consists of one of each combination (2 of Hearts, 2 of Diamonds, 2 of Clubs, etc).

In the game Blackjack, the cards have the following values:

* 2-10: The value of the card number.
* Jack, Queen and King: 10.
* Ace: 1 or 11 (whichever gives the closest score to 21 without busting)

The object of the game is to beat the dealer, which can be done in a number of ways:

* Get 21 points on the player's first two cards (called a blackjack), without a dealer blackjack;
* Reach a final score higher than the dealer without exceeding 21; or
* Let the dealer draw additional cards until his or her hand exceeds 21.

The dealer must hit until his or her cards total 17 or more points. Players win if they do not bust and have a total that is higher than the dealer's.

The dealer loses if he or she busts or has a lesser hand than the player who has not busted.

If the player and dealer have the same total, this is called a "push", this is classed as a draw.

###TASK

Please commit your work after 2 hours. Feel free to spend as much time as you want to improve your code, but do that in a separate set of commits.
Don't worry if you do not finish, we will be looking at the quality of solution as well as how much was achieved.

A template at index.html has been provided for you to build off.

Implement the basic blackjack game in JavaScript, using whatever frameworks, libraries or tooling you desire. The game should:

* Be between the **Dealer** (Computer), and the **Player**

* Clicking **New Game**, should
	* Reset from any previous game
	* Shuffle the **Deck** of 52 cards
	* Deal 1 card to the **Player**
	* Deal 1 card to the **Dealer**
	* Deal another card to the **Player**

* The **Player** can then **Hit**, in which another card is dealt. The Player can choose to **Hit** until he decides to **Stick** or he goes **Bust** (greater than 21)

* The **Player** can **Stick**, in which his turn is over

* Now the **Dealer's** turn, the Computer deals automatically until the **Dealer** reaches 17 or greater, or is **Bust** (greater than 21)

* On conclusion of the **Dealer's** turn, or the **Player** going **Bust**, a banner of the outcome is shown (the **Player** Wins, Loses or Draws)



###IMPORTANT NOTES

* The markup `index.html` boilerplate **should be used as is**, apart from any clearly marked templates in the markup.

* `blackjack.css` contains convenience classes that **must be used** for representing cards, `D2` for example represents the `2 of Diamonds`.

* The markup of a card **must** be the following: 
	```html
	<div class="card {card_class}"></div>
	```
	where `{card_class}` is one of the convenience classes mentioned above

* The markup of the result banner **must** be the following: 
	```html
	<div class="result alert {alert-status}">{message}</div>
	```
	where `{alert-status}` maps from the game result to a Bootstrap class and `message` maps from the game result to the message listed below:

	| Game Result   | Bootstrap CSS class | Message  |
	| ------------- |:-------------:|:-------------:
	| WIN           | alert-success | PLAYER WINS  |
	| DRAW          | alert-info    | DRAW         |
	| LOSS          | alert-danger  | PLAYER LOSES |


* The shuffle function available at `window.shuffle` **must be used** by your code; it takes an `Array` of any type and returns a new shuffled `Array` back.

* Each item in the `Array` passed to `window.shuffle`, **must have** a `toString` function which returns the utility class representing a card outlined above ie `CK` represents the `King of Clubs`.

* If you have any time remaining, focus on testing.