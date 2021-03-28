import {useHistory} from "react-router-dom"

const ProfileDetail = (props) => {
    const history = useHistory();

    const userInfo = props.match.params.state;
    let urlSearchParams = new URLSearchParams(props.location.search.slice(1));
    console.log(urlSearchParams.get("nickname"));

    return (
        <>
        </>
    );
}

export default ProfileDetail