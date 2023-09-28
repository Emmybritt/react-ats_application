import { FC } from "react";
import "./Card.css";

type CardProp = {
	children?: React.ReactNode;
	cardTitle?: string;
	footerLeft?: React.ReactNode;
	footerRight?: React.ReactNode;
	className?: string;
};

const Card: FC<CardProp> = ({ children, cardTitle, footerLeft, footerRight, className }) => {
	return (
		<div className={`${className} cardContainer`}>
			<div className="cardTitle">{cardTitle}</div>
			<div className="cardBody">{children}</div>
			<div className="cardFooter">
				<div>{footerLeft && footerLeft}</div>
				<div>{footerRight && footerRight}</div>
			</div>
		</div>
	);
};

export default Card;
