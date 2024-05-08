import './Time.css';

function Time(props) {
    return (
        <>
            <div className="div">
                <p className="p1">{props.time}</p>
                <p style={{ "marginLeft": "10px" }}><img width="40px" height="40px" src="https://img.icons8.com/color/48/partly-cloudy-rain--v1.png" alt="partly-cloudy-rain--v1" /></p>
                <p className="p2">{props.degree}</p>
            </div>

        </>
    );
}

export default Time;