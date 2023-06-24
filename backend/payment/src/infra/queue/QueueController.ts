import TicketReserved from "../../domain/event/TicketReserved";
import Registry from "../registry/Registry";

export default class QueueController {

	constructor (readonly registry: Registry) {
		const queue = registry.inject("queue");
		const processPayment = registry.inject("processPayment");

		queue.on("ticketReserved", async function (event: TicketReserved) {
			await processPayment.execute(event);
		});
	}
}