import Spinner from 'react-bootstrap/Spinner';
import Container from "react-bootstrap/Container";

function SpinnerCustom() {
    return (
        <Spinner animation="border" role="status" style={{display: "block",margin: '0 auto'}}>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}

export default SpinnerCustom;