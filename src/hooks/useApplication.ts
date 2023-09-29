/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { UpdateApplication, getApplicationFormData, updateApplication } from "../../store/feature/applicationSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { AttributesProp, Question, QuestionType } from "../../store/feature/interface";

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

	const handleChangeinput = (info: any, name: string, section?: AttributesProp, index?: number) => {
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
		} else {
			if (section) {
				// const data: any = form?.attributes && form?.attributes[section];
				if (index !== undefined) {
					if (section === "personalInformation") {
						setForm((prev) => {
							const updatedPersonalQuestions = [
								...(prev?.attributes?.personalInformation?.personalQuestions ?? []),
							];
							updatedPersonalQuestions[index] = {
								...updatedPersonalQuestions[index],
								[name]: info,
							};
							return {
								...prev,
								attributes: {
									...prev?.attributes,
									personalInformation: {
										...prev?.attributes?.personalInformation,
										personalQuestions: updatedPersonalQuestions,
									},
								},
							};
						});
					} else if (section === "customisedQuestions") {
						setForm((prev) => {
							const updateCustomisedQuestions = [...(prev?.attributes?.customisedQuestions ?? [])];

							updateCustomisedQuestions[index] = {
								...updateCustomisedQuestions[index],
								[name]: info,
							};

							return {
								...prev,
								attributes: {
									...prev?.attributes,
									personalInformation: {
										...prev?.attributes?.personalInformation,
										personalQuestions: updateCustomisedQuestions,
									},
								},
							};
						});
					} else if (section === "profile") {
						setForm((prev) => {
							const profileQuestions = [...(prev?.attributes?.profile?.profileQuestions ?? [])];

							profileQuestions[index] = {
								...profileQuestions[index],
								[name]: info,
							};

							return {
								...prev,
								attributes: {
									...prev?.attributes,
									profile: {
										...prev?.attributes?.profile,
										personalQuestions: profileQuestions,
									},
								},
							};
						});
					}
				}
			}
		}
	};

	console.log(form, "dddddd");

	const SubmitForm = () => {
		dispatch(updateApplication({ ...form }));
	};

	const addNewQuestion = (key: AttributesProp) => {
		const newQuestion: Question = {
			type: "Paragraph",
			question: "string",
			choices: ["string"],
			maxChoice: 0,
			disqualify: false,
			other: false,
		};
		if (key === "personalInformation") {
			setForm((prev) => ({
				...prev,
				attributes: {
					...prev?.attributes,
					personalInformation: {
						...prev?.attributes?.personalInformation,
						personalQuestions: [...(prev?.attributes?.personalInformation?.personalQuestions ?? []), newQuestion],
					},
				},
			}));
		}

		if (key === "profile") {
			setForm((prev) => ({
				...prev,
				attributes: {
					...prev?.attributes,
					profile: {
						...prev?.attributes?.profile,
						profileQuestions: [...(prev?.attributes?.profile?.profileQuestions ?? []), newQuestion],
					},
				},
			}));
		}

		if (key === "customisedQuestions") {
			setForm((prev) => ({
				...prev,
				attributes: {
					...prev?.attributes,
					customisedQuestions: [...(prev?.attributes?.customisedQuestions ?? []), newQuestion],
				},
			}));
		}
	};

	// const deleteQuestion = (key: number, type: string) => {};

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
