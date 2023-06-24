export default class TicketReserved {

	constructor (readonly ticketId: string, readonly eventId: string, readonly creditCardToken: string, readonly price: number) {
	}
}