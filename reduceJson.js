var tickets = require("./flights.json");

let ticketsArr = []

tickets.result.flights.forEach((item, index) => {
    ticketsArr.push({
        price: +item.flight.price.total.amount,
        priceCur: item.flight.price.total.currencyCode,
        forwardTicket: {
            airline: item.flight.legs[0].segments[0].airline.airlineCode,
            departureDate: item.flight.legs[0].segments[0].departureDate,
            cityDep: item.flight.legs[0].segments[0].departureCity.caption,
            airportDep: item.flight.legs[0].segments[0].departureAirport.caption,
            uidDep: item.flight.legs[0].segments[0].departureAirport.uid,
            arrivalDate: item.flight.legs[0].segments[item.flight.legs[0].segments.length - 1].arrivalDate,
            airpotArrival: item.flight.legs[0].segments[item.flight.legs[0].segments.length - 1].arrivalAirport.caption,
            uidArrival: item.flight.legs[0].segments[item.flight.legs[0].segments.length - 1].departureAirport.uid,
            cityArrival: item.flight.legs[0].segments[item.flight.legs[0].segments.length - 1].arrivalCity?.caption,
            transfer: item.flight.legs[0].segments.length - 1,
            totalDuration: item.flight.legs[0].duration
        },
        backTicket: {
            airline: item.flight.legs[1].segments[0].airline.airlineCode,
            departureDate: item.flight.legs[1].segments[0].departureDate,
            cityDep: item.flight.legs[1].segments[0].departureCity?.caption,
            airportDep: item.flight.legs[1].segments[0].departureAirport.caption,
            uidDep: item.flight.legs[1].segments[0].departureAirport.uid,
            arrivalDate: item.flight.legs[0].segments[item.flight.legs[0].segments.length - 1].arrivalDate,
            airpotArrival: item.flight.legs[1].segments[item.flight.legs[1].segments.length - 1].arrivalAirport?.caption,
            uidArrival: item.flight.legs[1].segments[item.flight.legs[1].segments.length - 1].departureAirport.uid,
            cityArrival: item.flight.legs[1].segments[item.flight.legs[1].segments.length - 1].arrivalCity?.caption,
            transfer: item.flight.legs[1].segments.length - 1,
            totalDuration: item.flight.legs[1].duration
        }
    })
})

module.exports = ticketsArr;
