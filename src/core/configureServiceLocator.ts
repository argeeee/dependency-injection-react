import { ServiceLocator } from "./ServiceLocator"

export const configureServiceLocator = () => {
	const sl = new ServiceLocator();

	// TODO
	// sl.register(...)

	return sl;
}