import { CloseOutlined } from "@ant-design/icons";
import { Image } from "antd";
import "./App.css";
import MainComponent from "./components/Main/Main";
import { Question } from "./components/Question/Question";
import { useApplication } from "./hooks/useApplication";

function App() {
	const { form, formatCardTitle, handleChangeinput, image, setImage, questionType, setQuestionType, addNewQuestion } = useApplication();
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

					<Question type={questionType} setQuestionType={(e) => setQuestionType(e)} />
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
