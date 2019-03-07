//retrieve and store deck of cards api

(function() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  //fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AC,3D,3S,4C,AD`) //is using one deck of cards
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
        //fetch('https://www.mikecaines.com/cards/royalflush.json') //works
        //fetch('https://www.mikecaines.com/cards/straightflush.json') //works
        //fetch('https://www.mikecaines.com/cards/fourofakind.json') //works
        //fetch('https://www.mikecaines.com/cards/fullhouse.json')
        //fetch('https://www.mikecaines.com/cards/flush.json') //works
        //fetch('https://www.mikecaines.com/cards/highstraight.json') //works
       // fetch('https://www.mikecaines.com/cards/lowstraight.json') //works
        //fetch('https://www.mikecaines.com/cards/threeofakind.json') //works
       // fetch('https://www.mikecaines.com/cards/twopair.json')
        //fetch('https://www.mikecaines.com/cards/pair.json') //works
        //fetch('https://www.mikecaines.com/cards/acehigh.json') //works 
      fetch(`https://deckofcardsapi.com/api/deck/${json.deck_id}/draw/?count=5`) // is displaying 5 cards


      .then(function(response) {
          //json.deck_id was change so it matches current deck id, grabbed 5 cards from the deck of cards above from that ID
          return response.json();
        })
        .then(function(json) {
        
          for (var i = 0; i < json.cards.length; i++) {
            //document.write(`<img src ="${json.cards[i].image}">`); 
            //var deltCards = json.cards[i].image;
            document.getElementById("card-images").innerHTML += "<img src='" + json.cards[i].image + "'/>";
          }
          var orderedDeck = [];
          var cardValues = [
            "ACE",
            "KING",
            "QUEEN",
            "JACK",
            "10",
            "9",
            "8",
            "7",
            "6",
            "5",
            "4",
            "3",
            "2"
          ];

          //looping through card values, pushing them in order to a new array
          //two loops 
          // have to actually put them in order here
          for (var i = 0; i < cardValues.length; i++ ){
            for(var j = 0; j < json.cards.length; j++){
              if(json.cards[j].value.includes(cardValues[i])){
                orderedDeck.push(json.cards[j]);

              }

            }
          }
          console.log(orderedDeck);

          //checks for matching suits
          function isFlush() {
            var suitCount = 1;
            for (var i = 0; i < orderedDeck.length; i++) {
              if (orderedDeck[i].suit === orderedDeck[i + 1].suit) {
                suitCount ++;
              } else {
                return false;
              }
              if (suitCount === 5) {
                return true;
              }
            }
          }
          //checks for incrementing values
          function isStraight() {
            //indexOf() finds the elemet in an array
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
            //if the element from cardValues exists in the delted cards array then find it and count it into a counter until it hits 5
           
            var valuesCount = 1;
            //had to adjust length to subtract one so it doesnt 
            //break from trying to compare to an undefined card (where its 6 because it doesnt exist)
            for (var i = 0; i < orderedDeck.length - 1; i++) {
              if (
                cardValues.indexOf(orderedDeck[i].value) ===
                cardValues.indexOf(orderedDeck[i + 1].value) - 1 ) {
                valuesCount ++;
              } else {
                return false;
              }
              if (valuesCount === 5) {
                return true;
              }
            }
          }

          function lowStraight(){
            if(orderedDeck[0].value === "ACE" && 
              orderedDeck[1].value === "5" &&
              orderedDeck[2].value === "4" &&
              orderedDeck[3].value === "3" &&
              orderedDeck[4].value === "2"){
                return true;

              }else{
                return false;
              }

          }
          

          function pairChecker() { //will handle a pair
            var countedMatch = 1;
            for (var i = 0; i < orderedDeck.length -1; i++) {
              //is the value of the first card equal to the value of the second card
              
                if (orderedDeck[i].value === orderedDeck[i + 1].value) {
                  countedMatch ++;
                }
              
          
            }
            if( countedMatch === 2){
              return true;
            }else{
              return false;
            }
          }

          function isTwoPair(){
            if(orderedDeck[1].value === orderedDeck[0].value &&
              orderedDeck[3].value === orderedDeck[4].value){
                return true;
              }
              else if(orderedDeck[1].value === orderedDeck[2].value &&
                orderedDeck[3].value === orderedDeck[4].value){
                  return true;
                }else if( orderedDeck[1].value === orderedDeck[0].value &&
                  orderedDeck[2].value === orderedDeck[3]){
                    return true;
                  }else {
                    return false;
                  }

          }

          
          function threeOfKind(){//handles three of kind and full house
            var counter = 1;
            for (var i = 0; i < orderedDeck.length -1; i++){
              if(orderedDeck[i].value === orderedDeck[i + 1].value){
                counter ++;

              }
            }if(counter === 3){
              return true;
            }else{
              return false;
            }

          }
          function fullhouse(){
            var counter = 1;
            if(orderedDeck[1].value === orderedDeck[0].value &&
              orderedDeck[2].value === orderedDeck[0].value &&
              orderedDeck[3].value === orderedDeck[4].value){
                return true;
              }else if(orderedDeck[1].value === orderedDeck[0].value &&
                orderedDeck[2].value === orderedDeck[4].value &&
                orderedDeck[3].value === orderedDeck[4].value){
                  return true;
                }else{
                  return false;
                }
           
              
              
          }

          function fourOfKind(){ // four of the values must be the same
            var countedMatch = 1;
            
            for(var i = 0; i < orderedDeck.length - 1; i++){
              //if the current value equals the value in the next area od the array then count it as a pair
              if(orderedDeck[i].value === orderedDeck[i + 1].value){
                countedMatch ++;

              }

              }if(countedMatch === 4){
                return true;

              }else{
                return false;
              }

            }

          function isRoyal(){
            
              if(orderedDeck[0].value === "ACE" && 
              orderedDeck[1].value === "KING" &&
              orderedDeck[2].value === "QUEEN" &&
              orderedDeck[3].value === "JACK" &&
              orderedDeck[4].value === "10"){
                return true;

              }else{
                return false;
              }
            }

           
          
          //////////////////////////////////RANKS/////////////////////////////////////////
          if(isFlush() && isRoyal()){
            //document.write("WOW look at you go! You got a Royal Flush!");
            document.getElementById("your-cards").innerHTML = "!!!!!!!#%^%#$ YOU GOT A ROYAL FLUSH !!!@$%!!!";
          } //STRAIGHT FLUSH has consec nums and same symbols
          else if(isStraight() && isFlush() ){
            //document.write("Whoa hold on, you got a Straight Flush.");
            document.getElementById("your-cards").innerHTML = "You got a Straight flush";
          }//FLUSH all suits are the same
          else if(fullhouse()){
            //document.write("It's a FULL HOUSE.");
            document.getElementById("your-cards").innerHTML = "You got a FULL HOUSE";
          }else if(fourOfKind()){
            //document.write("Awesome! You got a Four of a Kind!");
            document.getElementById("your-cards").innerHTML = "You got a Four of a Kind";
          }
          else if(isFlush()){
           // document.write("Hey good on you, you got a flush."); 
           document.getElementById("your-cards").innerHTML = "You got a flush";
            //STAIGHT just consecutive nums
          }else if(isStraight() || lowStraight()){
            //document.write("Ou, you got a Straight.");
            document.getElementById("your-cards").innerHTML = "You got a STRAIGHT";
          }else if(isTwoPair()){
            //document.write("Not just one pair, but you got Two Pair!")
            document.getElementById("your-cards").innerHTML = "You got Two Pairs";
          }else if(threeOfKind()){
            //document.write("Lucky! You got a Three of a Kind.");
            document.getElementById("your-cards").innerHTML = "You got a Three of a Kind";
          }else if(pairChecker()){
           // document.write("Congrats, a pair.")
           document.getElementById("your-cards").innerHTML = "You got a Pair";
          }
          else{
           // document.write("You got a High card, better than nothing.")
           document.getElementById("your-cards").innerHTML = "You got a High card";
          }

          
          console.log(json);
        });
      console.log(json);
    });
})();


//pseudocode//////////////////////////////////////////////////////////////////////////////////////////////////////
//reorder cards in a new array so go through original hand and place them in order * done
//access suits from card objects in json to obtain symbols
// the array can be remade like this var orderedDeck =  ['A','K','Q','J','T','9','8','7','6','5','4','3','2']*done
//
//ROYALE FLUSH = includes a,k,q,j, t of the array and same symbol from a symbol array
//STRAIFHT FLUSH consecutive numbers  and same symbol from symbol array
//FOuR OF A KIND=  has 4 out of 5 same cards in the array(checks for duplicates)
//FULL HOUSE = 3 of the same number with 2 of the same number
//FLUSH= checks symbol array for all duplicates
//STRAIGHT = consecurtive numbers
//THREE OF A KIND= 3 duplicates from cards array
//TWO PAIR = two pairs no symbol checking
//PAIR= two cards same rank, no symbol checking
//HIGH CARD = else
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

