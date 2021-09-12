import Tile from "./Tile"

const Board = ({mines, onReavelMine}) => {
    return (
        <div className="board">
            {mines.map((row, i) => (
            <div className='row' key={i}>
                {row.map((mine, j) => (
                    <Tile key={j} onReavelMine={(e) => onReavelMine(e, mine)}  mine={mine}></Tile>
                ))}
            </div>
            ))}
        </div>
    )
}

export default Board
