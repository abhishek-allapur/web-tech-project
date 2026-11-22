const buses = [
    {
        name: "Express Travels",
        from: "Bengaluru",
        to: "Mysuru",
        departure: "08:00 AM",
        arrival: "11:00 AM",
        price: 350
    },
    {
        name: "Green Line Travels",
        from: "Bengaluru",
        to: "Mysuru",
        departure: "10:00 AM",
        arrival: "01:00 PM",
        price: 450
    },
    {
        name: "Royal Bus Service",
        from: "Bengaluru",
        to: "Mysuru",
        departure: "09:00 PM",
        arrival: "12:00 AM",
        price: 550
    },
    {
        name: "Express Travels",
        from: "Bengaluru",
        to: "Mysuru",
        departure: "08:00 AM",
        arrival: "11:00 AM",
        price: 350
    },

    {
        name: "Green Line Travels",
        from: "Bengaluru",
        to: "Mysuru",
        departure: "10:00 AM",
        arrival: "01:00 PM",
        price: 450
    },

    {
        name: "Royal Travels",
        from: "Bengaluru",
        to: "Mangaluru",
        departure: "09:00 PM",
        arrival: "06:00 AM",
        price: 850
    },

    {
        name: "VRL Travels",
        from: "Bengaluru",
        to: "Hubballi",
        departure: "10:00 PM",
        arrival: "06:00 AM",
        price: 700
    },

    {
        name: "National Travels",
        from: "Bengaluru",
        to: "Kalaburagi",
        departure: "08:00 PM",
        arrival: "07:00 AM",
        price: 900
    },

    {
        name: "Orange Travels",
        from: "Mysuru",
        to: "Bengaluru",
        departure: "07:00 AM",
        arrival: "10:00 AM",
        price: 400
    },

    {
        name: "SRS Travels",
        from: "Hubballi",
        to: "Bengaluru",
        departure: "09:00 PM",
        arrival: "05:00 AM",
        price: 750
    },

    {
        name: "VRL Express",
        from: "Kalaburagi",
        to: "Bengaluru",
        departure: "08:30 PM",
        arrival: "07:30 AM",
        price: 950
    },
    {
        name: "VRL Travels",
        from: "Bengaluru",
        to: "Bidar",
        departure: "10:00 PM",
        arrival: "06:00 AM",
        price: 990
    },

];

let selectedBus = null;
let selectedSeats = [];

const bookedSeats = [3, 7, 12];

// Search buses

function searchBuses() {

    const from = document.getElementById("from")
        .value.trim().toLowerCase();

    const to = document.getElementById("to")
        .value.trim().toLowerCase();

    const date = document.getElementById("date").value;

    const busList = document.getElementById("busList");

    if (!from || !to || !date) {
        alert("Please enter source, destination and date!");
        return;
    }

    if (from === to) {
        alert("Source and destination cannot be the same!");
        return;
    }

    busList.innerHTML = "";

    const availableBuses = buses.filter(bus =>
        bus.from.toLowerCase() === from &&
        bus.to.toLowerCase() === to
    );

    if (availableBuses.length === 0) {
        busList.innerHTML = "<p>No buses found!</p>";
        document.getElementById("seatSection").style.display = "none";
        return;
    }

    availableBuses.forEach(bus => {

        const card = document.createElement("div");

        card.className = "bus-card";

        card.innerHTML = `
            <div>
                <h3>${bus.name}</h3>
                <p>${bus.from} → ${bus.to}</p>
                <p>${bus.departure} - ${bus.arrival}</p>
                <h3>₹${bus.price}</h3>
            </div>

            <button>Select Seats</button>
        `;

        card.querySelector("button").onclick = () => {
            selectBus(bus);
        };

        busList.appendChild(card);

    });

}

// Select bus

function selectBus(bus) {

    selectedBus = bus;
    selectedSeats = [];

    document.getElementById("seatSection").style.display = "block";

    createSeats();

    updateTotal();

    document.getElementById("seatSection")
        .scrollIntoView({ behavior: "smooth" });
}

// Create seats

function createSeats() {

    const container = document.getElementById("seats");

    container.innerHTML = "";

    for (let i = 1; i <= 20; i++) {

        const seat = document.createElement("div");

        seat.className = "seat";
        seat.innerText = i;

        if (bookedSeats.includes(i)) {

            seat.classList.add("booked");

        } else {

            seat.onclick = () => toggleSeat(i, seat);

        }

        container.appendChild(seat);

    }

}

// Select or deselect seat

function toggleSeat(number, element) {

    if (selectedSeats.includes(number)) {

        selectedSeats = selectedSeats.filter(
            seat => seat !== number
        );

        element.classList.remove("selected");

    } else {

        selectedSeats.push(number);

        element.classList.add("selected");

    }

    updateTotal();

}

// Calculate price

function updateTotal() {

    const total = selectedSeats.length * selectedBus.price;

    document.getElementById("total").innerText =
        "Total: ₹" + total;

}

// Confirm booking

function bookTicket() {

    if (!selectedBus || selectedSeats.length === 0) {

        alert("Please select at least one seat!");

        return;

    }

    const seats = selectedSeats.join(", ");

    const total = selectedSeats.length * selectedBus.price;

    alert(
        "Booking Successful!\n\n" +
        "Bus: " + selectedBus.name + "\n" +
        "Route: " + selectedBus.from + " to " +
        selectedBus.to + "\n" +
        "Seats: " + seats + "\n" +
        "Total Amount: ₹" + total
    );

    selectedSeats.forEach(number => {
        bookedSeats.push(number);
    });

    selectedSeats = [];

    createSeats();

    updateTotal();

}
