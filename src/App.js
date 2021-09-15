import { useState, useEffect } from 'react'
import Board from './componets/Board'
import Header from './componets/Header'
import Timer from './componets/Timer'

const App = () => {

  // TO DO
  // Add Win Condition
  // Option For Setting Difficulty
  // Smarter Game Over
  const [settings, setSettings] = useState({"height": 16, "width": 30, "mines": 99, "minesLeft":99, "flagsPlaced":0})
  const [board, setMines] = useState([])


  useEffect(() => {
    const minesTest = generateMines(settings.width,settings.height, settings.mines)
    setMines(minesTest)
    setSettings({...settings, flagsPlaced:0})
  }, []) 

  const generateMines = (width, height, mines) => {
    let minesArray = []
    for (var i = 0; i< height; i++){
      minesArray[i] = []
      for (var j =0; j < width; j++){
        minesArray[i][j] = { "isBomb": false, "isReaveled": false, "minesCount": "", "x": j, "y": i}
      }
    }
    let mineTiles = []
    for (var n = 0; n< mines; n++){
      i = Math.floor(Math.random() * height)
      j = Math.floor(Math.random() * width)

      while(isCordsInArr(mineTiles, [i,j])){
        i = Math.floor(Math.random() * height)
        j = Math.floor(Math.random() * width)
      }

      mineTiles.push([i,j])
      // debugger
      minesArray[i][j].isBomb = true
    }
    return minesArray
  }

  const isCordsInArr = (oldArray, newCords) => {
    for (let cords of oldArray ){
      if(newCords[0] === cords[0] && newCords[1] === cords[1]){
        return true
      }
    }
    return false
  }

  //return the amount of mines around a tile
  const countMines = (mine) => {
      let minesCounter = 0
      let x = mine.x
      let y = mine.y

      // count the mines around the tile. need to check all 8 spots
      if( y !==0 && x !==0 && board[y-1][x-1].isBomb ){
        minesCounter ++
      }
      if( x !== 0 && board[y][x-1].isBomb ){
        minesCounter ++
      }
      if( x !== 0 && y !== board.length-1 && board[y+1][x-1].isBomb ){
        minesCounter ++
      }
      if( y !== board.length-1  && board[y+1][x].isBomb ){
        minesCounter ++
      }
      if( x !== board[0].length-1 && y !== board.length-1 && board[y+1][x+1].isBomb ){
        minesCounter ++
      }
      if( x !== board[0].length-1 && board[y][x+1].isBomb ){
        minesCounter ++
      }
      if( x !== board[0].length-1 && y !==0 && board[y-1][x+1].isBomb ){
        minesCounter ++
      }
      if( mine.y !== 0 && board[mine.y-1][x].isBomb ){
        minesCounter ++
      }
      return minesCounter
  }

  const GetUnvisitedNeighbors = (tile) => {
    
    let unvisitedNeighbors = []
    let x = tile.x
    let y = tile.y

    // count the mines around the tile. need to check all 8 spots
    if( y !==0 && x !==0 && !board[y-1][x-1].isReaveled ){
      unvisitedNeighbors.push(board[y-1][x-1])
    }
    if( x !== 0 && !board[y][x-1].isReaveled ){
      unvisitedNeighbors.push(board[y][x-1])
    }
    if( x !== 0 && y !== board.length-1 && !board[y+1][x-1].isReaveled ){
      unvisitedNeighbors.push(board[y+1][x-1])
    }
    if( y !== board.length-1  && !board[y+1][x].isReaveled ){
      unvisitedNeighbors.push(board[y+1][x])
    }
    if( x !== board[0].length-1 && y !== board.length-1 && !board[y+1][x+1].isReaveled ){
      unvisitedNeighbors.push(board[y+1][x+1])
    }
    if( x !== board[0].length-1 && !board[y][x+1].isReaveled ){
      unvisitedNeighbors.push(board[y][x+1])
    }
    if( x !== board[0].length-1 && y !==0 && !board[y-1][x+1].isReaveled ){
      unvisitedNeighbors.push(board[y-1][x+1])      
    }
    if( y !== 0 && !board[y-1][x].isReaveled ){
      unvisitedNeighbors.push(board[y-1][x])

    }
    return unvisitedNeighbors
  }

  const ReavelMine = (mine) => {
    const newBoard = board
    if( mine.isBomb ){
      //Game Over
      alert("Game Over 💣")
      setMines(generateMines(settings.width,settings.height, settings.mines))
      setSettings({...settings, flagsPlaced:0, minesLeft:settings.mines})
      return "💣"
    }
    newBoard[mine.y][mine.x].minesCount = countMines(mine)
    newBoard[mine.y][mine.x].isReaveled = true
    setMines(
      [...newBoard]
    )
    if(mine.minesCount === 0){
      let unvisitedNeighbors = GetUnvisitedNeighbors(mine)
      unvisitedNeighbors.map(neighbor => ReavelMine(neighbor))
    }
  }

  const OnTileAction = (event, mine) =>{
    event.preventDefault()
    if (event.button === 0 && mine.minesCount !== "🚩"){
      ReavelMine(mine)
    }
    if (event.button === 1){
      // If You Want Here Is The Part Where You Add Middle Click
      console.log("middle click")
    }
    if(event.button === 2 && event.buttons === 2){
      const newBoard = board
      if( mine.minesCount === "" ){
        newBoard[mine.y][mine.x].minesCount = "🚩"
        let newSettings = {...settings, flagsPlaced: settings.flagsPlaced++}
        setSettings(newSettings)
        if(newBoard[mine.y][mine.x].isBomb){
          setSettings(prevState => { return { ...prevState, minesLeft: settings.minesLeft--} })

          settings.minesLeft === 1 && settings.flagsPlaced === settings.mines - 1 && WinGame() 
        }
      }
      else if( mine.minesCount === "🚩" ){
        setSettings(prevState => { return { ...prevState, flagsPlaced: settings.flagsPlaced--} })
        newBoard[mine.y][mine.x].minesCount = ""
        if(newBoard[mine.y][mine.x].isBomb){
          setSettings(prevState => { return { ...prevState, minesLeft: settings.minesLeft++} })
        }
      }
      

      setMines(
        [...newBoard]
      )
    }
  }

  const WinGame = () =>{
    alert("You Won! ✨")
    setMines(generateMines(settings.width,settings.height, settings.mines))
    setSettings({...settings, flagsPlaced:0, minesLeft:settings.mines})
  }

  const reSetBoard = (newSettings) => {
    const newBoard = generateMines(newSettings.width,newSettings.height, newSettings.mines)
    setMines([...newBoard])
    setSettings({...newSettings, minesLeft:newSettings.mines, flagsPlaced: 0})
  }

  return (
    <div>
      <Header reSetBoard={ reSetBoard } mine={settings.mines - settings.flagsPlaced}/>
      {/* <Timer></Timer> */}
      <Board onReavelMine={OnTileAction} mines={board}/>
    </div>
  )
}

export default App

