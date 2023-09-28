/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Question, Toggles } from "../../../store/feature/interface";
import InputField from "../Input";
import "./CardData.css";

type CardDataProp = {
	title: "personalInformation" | "profile" | "customisedQuestions" | "coverImage" | string;
	cardValues: Question[] | Toggles | any;
	formatTitle: (value: string) => string;
};

export const RenderInput = (title: string, values: { internalUse: boolean; show: boolean } | any) => {
	if (title === "firstName" || title === "lastName" || title === "emailId") return;
	return (
		<>
			<InputField type="checkbox" checked={values.internalUse} otherLabel="Internal" />
			<InputField type="switch" checked={values.show} otherLabel="Hide" />
		</>
	);
};

const CardDataComponent: FC<CardDataProp> = ({ title, cardValues, formatTitle }) => {
	return (
		<>
			{title === "personalInformation" && (
				<div>
					{Object.entries(cardValues ?? {}).map(([key, values]) => {
						return (
							<div key={key} className="card__data-header position-relative">
								<div className="text-capitalize title">{formatTitle(key)}</div>
								<div className="flex-between">{RenderInput(key, values)}</div>
							</div>
						);
					})}
				</div>
			)}

			{title === "profile" && (
				<div>
					{Object.entries(cardValues ?? {}).map(([key, values]) => {
						return (
							<div key={key} className="card__data-header position-relative">
								<div className="text-capitalize title">{formatTitle(key)}</div>
								<div className="flex-between">{RenderInput(key, values)}</div>
							</div>
						);
					})}
				</div>
			)}

			{title === "customisedQuestions" && (
				<>
					{cardValues.map((val: Question, _index: number) => (
						<div key={_index}>
							<div>{val.type}</div>
							<div>{val.question}</div>
						</div>
					))}
				</>
			)}
		</>
	);
};

export default CardDataComponent;
