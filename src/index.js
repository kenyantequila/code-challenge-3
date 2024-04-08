// // // Your code here
const db = "http://localhost:3000/films"

document.addEventListener("DOMContentLoaded", () => {
    getMovies();
    document.querySelector("#buy-ticket").addEventListener("click", handleBuyTicket);
});

function getMovies() {
    fetch(db)
        .then(res => res.json())
        .then(movies => {
            movies.forEach(movie => {
                renderMovieList(movie)
            })
            const firstMovie = document.querySelector("#id1");
            firstMovie.dispatchEvent(new Event("click"));
        })
}

function renderMovieList(movie) {
    const li = document.createElement("li");
    li.textContent = `${movie.title}`;
    li.id = "id" + movie.id;
    const ul = document.querySelector("#films");
    ul.appendChild(li);
    li.classList.add("film");
    li.classList.add('item');
    li.addEventListener("click", () => {
        handleMovieClick(movie)
    })
}

function handleMovieClick(movie) {
    const poster = document.querySelector("img#poster")
    poster.src = movie.poster;
    poster.alt = movie.title;
    const info = document.querySelector("#showing");
    info.querySelector("#title").textContent = movie.title;
    info.querySelector("#runtime").textContent = movie.runtime + " minutes";
    info.querySelector("#film-info").textContent = movie.description;
    info.querySelector("#showtime").textContent = movie.showtime;
    info.querySelector("#ticket-num").textContent = movie.capacity - movie.tickets_sold + " remaining tickets";
}

function handleBuyTicket(e) {
    const ticketDiv = document.querySelector("#ticket-num");
    const tickets = ticketDiv.textContent.split(" ")[0];
    if (tickets > 0) {
        ticketDiv.textContent = tickets - 1 + " remaining tickets";
    } else if (tickets == 0) {
        alert("tickets sold out!");
        e.target.classList.add("sold-out");
        e.target.classList.remove("orange");
    }
}
const btn = document.querySelector("button");
const ticketNums = document.getElementById("ticket-num");
btn.addEventListener("click", () => {
    const availableTickets = parseInt(ticketNums.textContent, 3);
    if (availableTickets > 0) {
        ticketNums.textContent = availableTickets - 1;

        if (availableTickets <= 0) {


            btn.textContent = "ticket-sold";
        } else {
            btn.textContent = "sold out";
        }
    }
});