import { CustomerQuote } from "./CustomerQuote";
import { CustomerStats } from "./CustomerStats";

export const customerMdxComponents = {
  CustomerQuote,
  Quote: CustomerQuote,
  CustomerStats,
  Stats: CustomerStats,
  hr: () => <hr className="customer-divider" />,
};
