export const fetchTickets = () =>
    fetch('http://localhost:3000/api/getEvents')
        .then(res => res.json());