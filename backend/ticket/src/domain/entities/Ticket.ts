import crypto from "crypto";

export default class Ticket {

	constructor (readonly ticketId: string, readonly eventId: string, readonly email: string, public status: string) {
	}

	static create (eventId: string, email: string) {
		const ticketId = crypto.randomUUID();
		const initialStatus = "reserved";
		return new Ticket(ticketId, eventId, email, initialStatus);
	}

	approve () {
		this.status = "approved";
	}

	cancel () {
		this.status = "cancelled";
	}
}
