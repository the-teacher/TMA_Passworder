import { ALLOWED_SERVICES } from '../consts';

// Define allowed service types
export type ServiceType = (typeof ALLOWED_SERVICES)[number];
