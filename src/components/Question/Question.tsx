import { FC } from "react";
import Card from "../Card/Card";
import { Button } from "antd";
import { QuestionType } from "../../../store/feature/interface";
import InputField from "../Input";
import { SelectOptions } from "../../constants";
import { CloseOutlined, PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";

export type QuestionProp = {
	type?: QuestionType;
	setQuestionType?: (value: QuestionType) => void;
};

export const Question: FC<QuestionProp> = ({ type = "Paragraph", setQuestionType }) => {
	return (
		<>
			<Card
				className="mt-2"
				cardTitle="Question"
				footerLeft={
					<Button type="text" style={{ color: "#A80000", fontWeight: "600" }}>
						<CloseOutlined color="red" /> Delete question
					</Button>
				}
				footerRight={
					<Button type="primary" className="btn_info">
						Save
					</Button>
				}>
				<label htmlFor="" className="label">
					Type
					<InputField
						onChange={setQuestionType}
						value={type}
						type="select"
						style={{ height: 40 }}
						options={SelectOptions}
						placeholder="Select question type"
					/>
				</label>
				<label htmlFor="" className="label">
					Question
					<InputField placeholder="Type here" style={{ height: 40 }} />
				</label>
				{["multiChoice", "dropDown"].includes(type) && (
					<>
						<div style={{ display: "flex", alignItems: "center" }}>
							<Button type="text">
								<UnorderedListOutlined />
							</Button>
							<label htmlFor="" className="label">
								Choice
								<InputField placeholder="Type here" style={{ height: 40, width: "450px" }} />
							</label>
							<Button type="text">
								<PlusOutlined />
							</Button>
						</div>
						<InputField type="checkbox" otherLabel='Enable "Other" option' />
					</>
				)}

				{["multiChoice"].includes(type) && (
					<>
						<label htmlFor="" className="label">
							Max choice allowed
							<InputField style={{ height: 40 }} placeholder="Enter number of choice allowed here" />
						</label>
					</>
				)}
				{["yesOrNo"].includes(type) && (
					<>
						<InputField type="checkbox" otherLabel="Disqualify candidate if the answer is no" />
					</>
				)}
			</Card>
		</>
	);
};