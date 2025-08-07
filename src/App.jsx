import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./Card";

function App() {
  const [score, setScore] = useState(0);
  const [bestscore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const apiKey = "6a83e0a70b6ab4920e5404e876a316274a434cc3";
      // Use a more reliable proxy or your own backend if possible
      // const url = `https://corsproxy.io/?https://www.giantbomb.com/api/characters/?api_key=${apiKey}&format=json&field_list=id,name,image`;
      const url = `/api/characters/?api_key=${apiKey}&format=json&field_list=id,name,image`;

      try {
        const response = await fetch(url);

        // Check if the response is OK and is JSON
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.results) {
          const limitedCard = data.results.slice(0,10);

          setCards(limitedCard);
        } else {
          setCards([]);
        }
      } catch (error) {
        console.error("Error Fetching Data :", error);
        setCards([]);
      }
    };
    fetchCharacters();
  }, []);

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
              image={card.image.icon_url}
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
