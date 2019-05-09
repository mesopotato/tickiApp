import { AuthSession } from 'expo';

export const fetchTickets = () =>
    fetch('http://10.0.2.2:3000/api/getEvents')
        .then(res => res.json());

export const loginNow = (name, password) =>
    fetch(`http://10.0.2.2:3000/api/login/${name}&${password}`)
        .then(res => res.json());

export var handleLogin = async (name, password) => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let results = await AuthSession.startAsync({
        authUrl:
            `http://10.0.2.2:3000/api/login/${name}
            &${password}
              &${encodeURIComponent(redirectUrl)}`
    });
    // Defined in next step
    if (results.type !== 'success') {
        this.setState({ didError: true });
    } else {
        const userInfo = await axios.get(`https://api.spotify.com/v1/me`, {
            headers: {
                "Authorization": `Bearer ${results.params.access_token}`
            }
        });
        this.setState({ userInfo: userInfo.data });
    }
};