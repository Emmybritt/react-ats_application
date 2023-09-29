import { CloseOutlined } from "@ant-design/icons";
import { Image } from "antd";
import "./App.css";
import MainComponent from "./components/Main/Main";
import { Question } from "./components/Question/Question";
import { useApplication } from "./hooks/useApplication";

function App() {
	const { form, formatCardTitle, handleChangeinput, image, setImage, setQuestionType, addNewQuestion } = useApplication();
	const personalInformation = form?.attributes?.personalInformation;
	const profile = form?.attributes?.profile;

	return (
		<>
			<div className="container">
				<div className="side">
					{image && (
						<div className="img_container">
							<Image src={form?.attributes?.coverImage} style={{ height: "400px", width: "576px" }} />
							<div className="img_action" onClick={() => setImage("")}>
								<CloseOutlined />
								<span>Delete & re-upload</span>
							</div>
						</div>
					)}
					{personalInformation?.personalQuestions?.map((question, _id: number) => {
						console.log(question, "test");

						return (
							<div key={_id}>
								<Question
									index={_id}
									attributes="personalInformation"
									handleChange={handleChangeinput}
									section="Personal information question"
									type={question.type}
									setQuestionType={(e) => setQuestionType(e)}
								/>
							</div>
						);
					})}
					{profile?.profileQuestions?.map((question, _id: number) => (
						<div key={_id}>
							<Question
								value={question.type}
								index={_id}
								handleChange={handleChangeinput}
								attributes="profile"
								section="Profile question"
								type={question.type}
								setQuestionType={(e) => setQuestionType(e)}
							/>
						</div>
					))}
				</div>
				<div className="main">
					<div>
						<MainComponent
							addQuestion={addNewQuestion}
							applicationForm={form}
							formatCardTitle={formatCardTitle}
							handleChangeinput={handleChangeinput}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
