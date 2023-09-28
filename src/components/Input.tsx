/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Form, FormRule, Input, Select, Switch, Upload, UploadProps } from "antd";
import React, { FC } from "react";
import UploadImage from "../assets/upload.png";
import { Options } from "../../store/feature/interface";
type TYPE = "text" | "select" | "textArea" | "file" | "number" | "date" | "switch" | "checkbox";
interface InputFieldProp {
	type?: TYPE;
	name?: string;
	label?: string;
	required?: boolean;
	rules?: FormRule[];
	mode?: string;
	style?: React.CSSProperties;
	className?: string;
	props?: UploadProps;
	checked?: boolean;
	value?: any;
	onChange?: (event: React.ChangeEvent<HTMLInputElement> | any) => void;
	otherLabel?: string;
	options?: Options[];
	placeholder?: string;
}

const InputField: FC<InputFieldProp> = ({
	type = "text",
	name,
	label,
	required = false,
	rules,
	style,
	className,
	checked,
	onChange,
	otherLabel,
	options,
	placeholder,
	value,
}) => {
	return (
		<>
			<Form.Item name={name} label={label} required={required} className={className} rules={rules}>
				{type === "text" && <Input placeholder={placeholder} style={style} className={className} onChange={onChange} />}
				{type === "textArea" && (
					<Input.TextArea
						placeholder={placeholder}
						value={value ?? ""}
						style={style}
						className={className}
						onChange={onChange}
					/>
				)}
				{type === "select" && (
					<Select
						placeholder={placeholder}
						style={style}
						value={value}
						className={className}
						options={options}
						onChange={onChange}
					/>
				)}
				{type === "checkbox" && (
					<Checkbox style={style} className={className} onChange={onChange} checked={checked}>
						{otherLabel}
					</Checkbox>
				)}
				{type === "switch" && (
					<label>
						<Switch
							checked={checked}
							style={style}
							className={className}
							defaultChecked={checked}
							onChange={onChange}
						/>
						<span className="other-label">{otherLabel}</span>
					</label>
				)}
				{type === "file" && (
					<Upload.Dragger onChange={onChange} beforeUpload={() => false} accept=".png,.jpg,.jpeg">
						<p className="ant-upload-drag-icon">
							<img src={UploadImage} alt="" />
						</p>
						<p className="ant-upload-text">Upload Cover Image</p>
						<p className="ant-upload-hint">16:9 ratio is recommended. Max image size 1mb</p>
					</Upload.Dragger>
				)}
			</Form.Item>
		</>
	);
};

export default InputField;
