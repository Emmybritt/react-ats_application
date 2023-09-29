/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { ApplicationFormData, AttributesProp } from "../../../store/feature/interface";
import Card from "../Card/Card";
import CardDataComponent from "../CardData/CardData";
import InputField from "../Input";
import { Button } from "antd";

interface MainComponentProp {
	applicationForm: ApplicationFormData | any;
	formatCardTitle: (value: string) => string;
	addQuestion: (value: AttributesProp) => void;
	handleChangeinput: (event: any, name: string) => void;
}

const MainComponent: FC<MainComponentProp> = ({ applicationForm, formatCardTitle, handleChangeinput, addQuestion }) => {
	return (
		<div className="">
			{Object.entries(applicationForm?.attributes ?? {}).map(([key, values]: [any, unknown]) => {
				return (
					<Card
						key={key}
						footerLeft={
							key === "coverImage" ? (
								<></>
							) : (
								<Button
									type="text"
									onClick={() => addQuestion(key)}
									className="addQuestion cursor-pointer">
									+ Add question
								</Button>
							)
						}
						cardTitle={formatCardTitle(key)}
						className="mt-2">
						{key === "coverImage" ? (
							<InputField onChange={(e) => handleChangeinput(e, "coverImage")} type="file" />
						) : (
							<CardDataComponent cardValues={values} title={key} formatTitle={formatCardTitle} />
						)}
					</Card>
				);
			})}
		</div>
	);
};

export default MainComponent;
