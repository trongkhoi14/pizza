import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import BtnSubmit from "../../../components/FormFields/BtnSubmit";
import InputField from "../../../components/FormFields/InputField";
import Widget from "./Widget";

export default function ChangePasswordForm() {
	const { t } = useTranslation();
	const {
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			password: "",
			retypePassword: "",
		},
	});

	const onSubmit = () => {};
   
	return (
		<>
			<Widget title={t("content.change-password")}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<InputField
							control={control}
							id="password"
							name="password"
							label={t("content.password")}
							error={errors["password"]}
							type="password"
						/>
						<InputField
							control={control}
							id="retypePassword"
							name="retypePassword"
							label={t("content.confirm-password")}
							error={errors["retypePassword"]}
							type="password"
						/>
					</div>
					<div className="flex justify-start mt-3">
						<BtnSubmit className="-ml-2 bg-light-blue hover:bg-light-blue/75">
							{t("content.save")}
						</BtnSubmit>
					</div>
				</form>
			</Widget>
		</>
	);
}
