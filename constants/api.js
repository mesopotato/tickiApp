export const fetchTickets = () =>
    fetch('http://localhost:3000/api')
        .then(res => res.json());