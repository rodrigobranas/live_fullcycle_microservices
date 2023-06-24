import crypto from "crypto";

export default class Transaction {

	private constructor (readonly transactionId: string, readonly ticketId: string, readonly eventId: string, readonly tid: string, readonly price: number, readonly status: string) {
	}

	static create (ticketId: string, eventId: string, tid: string, price: number, status: string) {
		const transactionId = crypto.randomUUID();;
		return new Transaction(transactionId, ticketId, eventId, tid, price, status);
	}
}