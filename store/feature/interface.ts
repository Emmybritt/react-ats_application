export interface Toggles {
	internalUse: boolean;
	show: boolean;
}
export interface ProfileVal {
	mandatory: boolean;
	show: boolean;
}

export type QuestionType = "Paragraph" | "shortAnswer" | "yesOrNo" | "dropDown" | "multiChoice" | "date" | "number" | "fileUpload" | "videoQuestion";
export interface Question {
	id: string;
	type: string;
	question: string;
	choices: string[];
	maxChoice: number;
	disqualify: boolean;
	other: boolean;
}

interface Attributes {
	coverImage: string;
	personalInformation?: {
		firstName?: Toggles;
		lastName?: Toggles;
		emailId?: Toggles;
		phoneNumber?: Toggles;
		nationality?: Toggles;
		currentResidence?: Toggles;
		idNumber: Toggles;
		dateOfBirth: Toggles;
		gender: Toggles;
	};
	personalQuestions?: Question;
	profile?: {
		education: ProfileVal;
		experience: ProfileVal;
		resume: ProfileVal;
	};
	profileQuestions?: Question;
	customisedQuestions?: Question;
}

export type ApplicationFormData = {
	id: string;
	type: string;
	attributes: Attributes;
};

export type Options = { value: string; label: string };
