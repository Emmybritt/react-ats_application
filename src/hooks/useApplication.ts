/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { UpdateApplication, getApplicationFormData, updateApplication } from "../../store/feature/applicationSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { QuestionType } from "../../store/feature/interface";

export const useApplication = () => {
	const [form, setForm] = useState<Partial<UpdateApplication>>();
	const [image, setImage] = useState<string>("");
	const [questionType, setQuestionType] = useState<QuestionType>("Paragraph");
	const [newQuestion, setNewQuestion] = useState();

	const dispatch = useAppDispatch();
	const { isLoading, applicationForm } = useAppSelector((store) => store.application);

	function formatCardTitle(title: string): string {
		if (title === "customisedQuestions") {
			return "Additional questions";
		} else if (title === "coverImage") {
			return "Upload cover image";
		}
		return title.replace(/([A-Z])/g, " $1").trim();
	}

	const handleChangeinput = (info: any, name: string) => {
		if (name === "coverImage") {
			let newFileList = [...info.fileList];

			newFileList = newFileList.slice(-1);

			newFileList = newFileList.map((file) => {
				if (file.status === "done" || file.status === "error") {
					return file;
				}
				return {
					...file,
					status: "done",
					thumbUrl: URL.createObjectURL(file.originFileObj),
				};
			});
			setImage(newFileList[0].thumbUrl);
			setForm((prev) => ({
				...prev,
				attributes: { ...prev?.attributes, coverImage: newFileList[0].thumbUrl },
			}));
		}
	};

	const SubmitForm = () => {
		dispatch(updateApplication({ ...form }));
	};

	const addNewQuestion = (key: string) => {
		console.log(key);
	};

	useEffect(() => {
		setForm({ ...applicationForm });
	}, [applicationForm]);

	useEffect(() => {
		dispatch(getApplicationFormData());
	}, [dispatch]);
	return {
		form,
		setForm,
		isLoading,
		applicationForm,
		formatCardTitle,
		image,
		setImage,
		handleChangeinput,
		SubmitForm,
		questionType,
		setQuestionType,
		newQuestion,
		setNewQuestion,
		addNewQuestion,
	};
};
