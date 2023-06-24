import PaymentApproved from "../../domain/event/PaymentApproved";
import Registry from "../registry/Registry";

export default class QueueController {

	constructor (readonly registry: Registry) {
		const queue = registry.inject("queue");
		const approveTicket = registry.inject("approveTicket");

		queue.on("paymentApproved", async function (event: PaymentApproved) {
			await approveTicket.execute(event);
		});
	}
}