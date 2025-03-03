import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Checkbox } from "@heroui/checkbox";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

export const DynamicForm = ({ fields, onSubmit }) => {
    return (
        <form id="dynamic-form" onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields?.map((field) => {
                const commonProps = {
                    name: field.name,
                    isRequired: field.required,
                    onChange: field.onChange,
                    className: field.className || "",
                    size: 'sm',
                    classNames: { input: "text-xs" },
                    variant: "faded"
                };

                const key = field.id || field.name;

                switch (field.type) {
                    case 'text':
                    case 'email':
                    case 'password':
                    case 'number':
                        return (
                            <Input
                                {...commonProps}
                                key={key}
                                label={field.label}
                                type={field.type}
                                placeholder={field.placeholder}
                                value={field.value}
                                startContent={field.startContent}
                                autoComplete={field.autoComplete}
                            />
                        );
                    case 'select':
                        return (
                            <Select
                                className="text-xs"
                                key={key}
                                {...commonProps}
                                label={field.label}
                                placeholder={field.placeholder}
                                selectedKeys={field.selectedKeys}
                                onSelectionChange={field.onSelectionChange}
                            >
                                {field.options?.map((option) => (
                                    <SelectItem classNames={{ option: 'text-xs' }} key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        );
                    case 'checkbox':
                        return (
                            <Checkbox key={key} {...commonProps}>
                                {field.label}
                            </Checkbox>
                        );
                    case 'autocomplete':
                        return (
                            <Autocomplete
                                {...commonProps}
                                key={key}
                                label={field.label}
                                placeholder={field.placeholder}
                                defaultItems={field.options}
                                onInputChange={field.onInputChange}
                                onSelectionChange={field.onSelectionChange}
                            >
                                {(item) => (
                                    <AutocompleteItem key={item.value}>
                                        {item.label}
                                    </AutocompleteItem>
                                )}
                            </Autocomplete>
                        );
                    default:
                        return null;
                }
            })}
        </form>
    );
};