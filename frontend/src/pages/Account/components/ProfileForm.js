import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import BtnSubmit from "../../../components/FormFields/BtnSubmit";
import InputField from "../../../components/FormFields/InputField";
import Widget from "./Widget";

export default function ProfileForm() {
	const { t } = useTranslation();
	const { info } = useSelector((state) => state.user);
	const {
		formState: { errors },
		handleSubmit,
		control,
		reset,
	} = useForm({
		defaultValues: {
			email: "",
			name: "",
			address: "",
			birthday: "",
			mobile: "",
		},
	});

	const onSubmit = () => {};

	useEffect(() => {
		reset({ ...info });
	}, [info]);

	return (
		<>
			<Widget title={t("content.profile")}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<InputField
							control={control}
							id="name"
							name="name"
							label={t("content.name")}
							error={errors["name"]}
						/>
						<InputField
							control={control}
							id="mobile"
							name="mobile"
							label={t("content.phone")}
							error={errors["mobile"]}
							type="number"
						/>
						<InputField
							control={control}
							id="email"
							name="email"
							label="Email"
							error={errors["email"]}
						/>
						<InputField
							control={control}
							id="address"
							name="address"
							label={t("content.address")}
							error={errors["address"]}
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
