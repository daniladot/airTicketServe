HOW GET JSON!!!!

/ - all tickets

/filter - for filtration

filter has some get-params

1)&forwardAirline=[name airline] - filtration for airline in forward ticket
2)&backAirline=[name airline] - filtration for airline in back ticket
3)&limit=[number] - filtration for count tickets
4)&sortForwardDuration=[true] - filtration for increase in forward ticket
5)&sortForwardDuration=[false] - filtration for decrease in forward ticket
6)&sortBackDuration=[true] - filtration for increase in back ticket
7)&sortBackDuration=[false] - filtration for decrease in back ticket
7)&minPrice=[number] - filtration from price
7)&maxPrice=[number] - filtration to price

limit for default - all tickets
sort for default - filtration for increase in forward ticket

example /filter?forwardAirline=SU&limit=20&sortForwardDuration=true
