import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Checkbox } from "@heroui/checkbox";

export const DynamicForm = ({ fields, onSubmit }) => {
    return (
        <form id="dynamic-form" onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => {
                const commonProps = {
                    name: field.name,
                    isRequired: field.required,
                    onChange: field.onChange,
                    className: field.className || "",
                };

                switch (field.type) {
                    case 'text':
                    case 'email':
                    case 'password':
                        return (
                            <Input
                                key={field.name}                                
                                label={field.label}
                                type={field.type}
                                placeholder={field.placeholder}
                                variant="faded"
                                value={field.value}

                            />
                        );
                    case 'select':
                        return (
                            <Select {...commonProps} label={field.label} placeholder={field.placeholder}>
                                {field.options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        );
                    case 'checkbox':
                        return (
                            <Checkbox {...commonProps}>
                                {field.label}
                            </Checkbox>
                        );
                    default:
                        return null;
                }
            })}
        </form>
    );
};
