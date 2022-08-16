import { useNavigate, useLocation } from "react-router-dom";

export default function Home  ()  {
    const history = useNavigate();
    const location = useLocation();
    console.log("STATE: ", location.state)

    return (
        <p>Hej</p>
        /*<Fragment>
            Home
            <br/>
            <a href="#" onClick={() => history.goBack()}>Back</a>
        </Fragment>*/
    );
}