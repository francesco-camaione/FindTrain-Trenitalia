from utils import utils


class Train:

    def __init__(self, idsolution, origin, destination, direction, departuretime, arrivaltime, minprice, optionaltext,
                 duration, changesno, bookable, saleable, trainlist, onlycustom, extraInfo, showSeat, specialOffer,
                 transportMeasureList, originalPrice):
        self.idsolution = idsolution
        self.origin = origin
        self.destination = destination
        self.direction = direction
        self.departuretime = departuretime
        self.arrivaltime = arrivaltime
        self.minprice = minprice
        self.optionaltext = optionaltext
        self.duration = duration
        self.changesno = changesno  # numero cambi
        self.bookable = bookable    # mostra se prenotabile (useless)
        self.saleable = saleable    # mostra se acquistabile
        self.trainlist = trainlist
        self.onlycustom = onlycustom
        self.extraInfo = extraInfo
        self.showSeat = showSeat
        self.specialOffer = specialOffer
        self.transportMeasureList = transportMeasureList
        self.originalPrice = int(originalPrice)

    def __lt__(self, other) -> bool:
        return self.originalPrice < other.originalPrice

    def __repr__(self):
        return f"{self.minprice} {utils.get_date(self.departuretime)} {self.duration}"
