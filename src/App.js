import Die from "./components/Die"
import React from "react"
import {nanoid} from "nanoid"
import Confetti from "./utils/Confetti"

function App() {
  const [dice,setDice] = React.useState(allNewDice())
  const [tenzies,setTenzies] = React.useState(false)
  

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const allSameValue = dice.every(die => die.value === dice[0].value)

    if(allHeld && allSameValue){
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie(max = 6){
    return {
      value: Math.floor(Math.random() * max + 1), 
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    return Array.from({length: 10}, () => generateNewDie())
  }

  function rollDice(){
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    }else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }
  

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
      {...die, isHeld: !die.isHeld} : 
      die
    }))
  }

  const diceElements = dice.map(
    (x) => <Die key={x.id} value={x.value} isHeld={x.isHeld} holdDice={() => holdDice(x.id)}/>
    ); 

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}
export default App;
