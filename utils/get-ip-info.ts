import axios from "axios";

interface IAPiInfo {
	ip_add: string;
	ip_location: string;
	latitude: number;
	longitude: number;
}
export interface IPApiResponse {
	ip: string;
	network: string;
	version: string;
	city: string;
	region: string;
	region_code: string;
	country: string;
	country_name: string;
	country_code: string;
	country_code_iso3: string;
	country_capital: string;
	country_tld: string;
	continent_code: string;
	in_eu: boolean;
	postal: string;
	latitude: number;
	longitude: number;
	timezone: string;
	utc_offset: string;
	country_calling_code: string;
	currency: string;
	currency_name: string;
	languages: string;
	country_area: number;
	country_population: number;
	asn: string;
	org: string;
}

/**
 * Function for retrieving ip info based on user's IP address
 * @param ip string
 * @returns `object` data object that includes needed data for tracking user
 */
export async function getIPInfo(ip: string): Promise<IAPiInfo | null> {
	try {
		const url = `https://ipapi.co/${ip}/json/`;
		const response = await axios.get<IPApiResponse>(url);
		return {
			ip_add: ip,
			ip_location: `${response.data?.region}, ${response.data?.country}`,
			longitude: response.data?.longitude,
			latitude: response.data?.latitude,
		};
	} catch (error) {
		console.error("Failed to fetch IP info:", error);
		return null;
	}
}
