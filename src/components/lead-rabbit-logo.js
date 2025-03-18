import { RabbitIcon } from "@/components/icons";
import { gamjaFlower } from "@/fonts";

export default function LeadRabbitLogo() {
	return (
		<div className={`flex items-center gap-1 text-lg ${gamjaFlower.className}`}>
			<p className="text-xl">LeadRabbit</p>
			<RabbitIcon />
		</div>
	);
}
