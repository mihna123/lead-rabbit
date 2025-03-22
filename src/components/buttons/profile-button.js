import { useEffect, useRef, useState } from "react";
import { ProfileIcon } from "../icons";
import SignOutButton from "./sign-out";
import Link from "next/link";
import { showMessage } from "@/lib/utils/renderUtils";

export default function ProfileButton({ session }) {
	const [menuOpened, setMenuOpened] = useState(false);

	const menuRef = useRef(null);

	const handleButtonClick = () => {
		setMenuOpened(!menuOpened);
	};

	useEffect(() => {
		if (!menuOpened) return;

		const handleOutsideClick = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setMenuOpened(false);
			}
		};

		document.addEventListener("click", handleOutsideClick);

		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, [menuOpened]);

	return (
		<div className="flex justify-center">
			<button
				onClick={handleButtonClick}
				className="cursor-pointer"
				type="button"
			>
				<ProfileIcon />
			</button>
			{menuOpened && (
				<div
					ref={menuRef}
					className="flex flex-col gap-3 absolute right-5 top-15 p-4 w-46 rounded border bg-[var(--background)]"
				>
					<p>{session?.user?.name}</p>
					<Link href="/leads">My Leads</Link>
					<button
						onClick={() =>
							showMessage(
								`LeadRabbit is made by Mihailo Vojinović,
                                currently a student and a web developer.\n
                                If you want to get in touch you can send an 
                                email to mihailonvojinovic@gmail.com`,
							)
						}
						type="button"
						className="cursor-pointer w-fit"
					>
						About
					</button>
					<SignOutButton />
				</div>
			)}
		</div>
	);
}
