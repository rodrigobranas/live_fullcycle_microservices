import Event from "../../domain/entities/Event";

export default interface EventRepository {
	get (eventId: string): Promise<Event>;
}
