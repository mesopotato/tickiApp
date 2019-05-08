export const fetchTickets = () =>
    fetch('http://10.0.2.2:3000/api/getEvents')
        .then(res => res.json());