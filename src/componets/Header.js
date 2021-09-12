const Header = ({reSetBoard ,mine}) => {

    return (
        <div className="header">
            <div className='display'> {mine > 0 ? mine : 0}</div>
            <button className="btn btn-block" style={{backgroundColor: "green"}} onClick={() => reSetBoard({height:9,width:9,mines:10})}>Beginner</button>
            <button className="btn btn-block" style={{backgroundColor: "orange"}} onClick={() => reSetBoard({height:16,width:16,mines:40})}>Intermediate</button>
            <button className="btn btn-block" style={{backgroundColor: "red"}} onClick={() => reSetBoard({height:16,width:30,mines:99})}>Expert</button>
        </div>
    )
}

export default Header
