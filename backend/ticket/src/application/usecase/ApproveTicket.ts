import Registry from "../../infra/registry/Registry";
import TicketRepository from "../repository/TicketRepository";

export default class ApproveTicket {
	ticketRepository: TicketRepository;

	constructor (readonly registry: Registry) {
		this.ticketRepository = registry.inject("ticketRepository");
	}
	
	async execute (input: Input): Promise<void> {
		console.log("approveTicket", input);
		const ticket = await this.ticketRepository.get(input.ticketId);
		ticket.approve();
		await this.ticketRepository.update(ticket);
	}
}

type Input = {
	ticketId: string
}
