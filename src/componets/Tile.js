const Tile = ({mine, onReavelMine}) => {
    return (
        <>
            <div className={`tile ${mine.minesCount === "🚩" ? "" : mine.minesCount === "" || "number"}`} onMouseDown={onReavelMine} onContextMenu={onReavelMine}>{mine.minesCount === 0 ? "" : mine.minesCount}</div>   
        </>
    )
}

export default Tile
