import { ChangeEvent, FormEvent } from 'react';
import { Input } from '@/components/forms';
import { Spinner } from '@/components/common';
import SubmitButton from '../common/SubmitButton';

interface Config {
	labelText: string;
	labelId: string;
	type: string;
	value: string;
	link?: {
		linkText: string;
		linkUrl: string;
	};
	required?: boolean;
}

interface Props {
	config: Config[];
	isLoading: boolean;
	btnText: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({
	config,
	isLoading,
	btnText,
	onChange,
	onSubmit,
}: Props) {
	return (
		<form className='space-y-6' onSubmit={onSubmit}>
			{config.map(input => (
				<Input
					key={input.labelId}
					labelId={input.labelId}
					type={input.type}
					onChange={onChange}
					value={input.value}
					link={input.link}
					required={input.required}
				>
					{input.labelText}
				</Input>
			))}

			<div>
        <SubmitButton isLoading={isLoading} btnText={btnText} type='submit' />
			</div>
		</form>
	);
}
