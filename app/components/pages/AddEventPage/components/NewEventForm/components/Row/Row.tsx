import React, { memo } from 'react';
import { FormRow, Input, Textarea } from 'components/ui';

interface Props {
    label: string;
    name: string;
    value: string;
    error?: string;
    disabled: boolean;
    autoFocus: boolean;
    onChange: React.ChangeEventHandler;
}

const TEXTAREA_FIELDS = ['description', 'notes'];

const Row = ({ label, name, value, error, disabled, autoFocus, onChange }: Props): JSX.Element => (
    <FormRow
        htmlFor={name}
        label={label}
        error={error}>
        {TEXTAREA_FIELDS.includes(name) ? (
            <Textarea
                id={name}
                name={name}
                value={value}
                disabled={disabled}
                autoFocus={autoFocus}
                autoComplete='off'
                rows={5}
                onChange={onChange} />
        ) : (
            <Input
                id={name}
                name={name}
                value={value}
                disabled={disabled}
                autoFocus={autoFocus}
                autoComplete='off'
                onChange={onChange} />
        )}
    </FormRow>
);

export default memo(Row);
