import {  useState } from "react";
import "./App.css";
import { Card } from "./Card";
import initalCards from "./card.json"

function App() {
  const [score, setScore] = useState(0);
  const [bestscore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  const limitedCard = initalCards.slice(0,10);
  const [cards, setCards] = useState(limitedCard);


  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      if (bestscore < score) {
        setBestScore(score);
      }
      setScore(0);
      setClickedCards([]);
    } else {
      setScore(score + 1);
      setClickedCards((prevList) => {
        return [...prevList, id];
      });
    }
    const shuffledCards = shuffleCards(cards);
    setCards(shuffledCards);
  };

  function shuffleCards(array) {
    //make a shallow copy of state:
    const newArray = [...array];
    // Use a for loop to iterate backward through the array
    for (let i = newArray.length - 1; i > 0; i--) {
      // Generate a random index 'j' from 0 up to 'i'
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements at indices 'i' and 'j'
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  return (
    <>
      <h1>Memory Game</h1>
      <h3>Get points by clicking on an image but don't click on any more than once!</h3>
      <div>
        <p>Score : {score}</p>
        <p>Best Score : {bestscore}</p>
      </div>
        <div className="cardContainer">
          {cards.map((card) => (
            <Card
              key={card.id}
              image={card.icon_url}
              name={card.name}
              id={card.id}
              onHandleClick={handleCardClick}
            />
          ))}
        </div>
    </>
  );
}

export default App;
