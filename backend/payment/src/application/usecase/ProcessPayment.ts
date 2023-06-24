import Transaction from "../../domain/entities/Transaction";
import PaymentApproved from "../../domain/event/PaymentApproved";
import Queue from "../../infra/queue/Queue";
import Registry from "../../infra/registry/Registry";
import PaymentGateway from "../gateway/PaymentGateway";
import TransactionRepository from "../repository/TransactionRepository";

export default class ProcessPayment {
	transactionRepository: TransactionRepository;
	paymentGateway: PaymentGateway;
	queue: Queue;

	constructor (readonly registry: Registry) {
		this.transactionRepository = registry.inject("transactionRepository");
		this.paymentGateway = registry.inject("paymentGateway");
		this.queue = registry.inject("queue");
	}

	async execute (input: Input): Promise<void> {
		const output = await this.paymentGateway.createTransaction({ email: input.email, creditCardToken: input.creditCardToken, price: input.price });
		const transaction = Transaction.create(input.ticketId, input.eventId, output.tid, input.price, output.status);
		await this.transactionRepository.save(transaction);
		if (output.status === "approved") {
			const paymentApproved = new PaymentApproved(input.ticketId);
			await this.queue.publish("paymentApproved", paymentApproved);
		}
		
	}
}

type Input = {
	ticketId: string,
	eventId: string,
	email: string,
	price: number,
	creditCardToken: string
}

type Output = {
	status: string,
	tid: string,
	price: number
}
