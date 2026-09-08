import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, View } from "react-native";

interface FormItemProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  hint?: string;
  render: (field: {
    value: any;
    onChange: (val: any) => void;
    onBlur: () => void;
  }) => React.ReactNode;
}

function FormItem<T extends FieldValues>({
  name,
  control,
  label,
  required,
  hint,
  render,
}: FormItemProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <View className="mb-4">
          {label && (
            <Text className="mb-1 font-medium text-neutral-800">
              {label}
              {required && <Text className="text-red-500"> *</Text>}
            </Text>
          )}

          {render(field)}

          {error ? (
            <Text className="mt-1 text-xs text-red-500">{error.message}</Text>
          ) : hint ? (
            <Text className="mt-1 text-xs text-neutral-400">{hint}</Text>
          ) : null}
        </View>
      )}
    />
  );
}

export default FormItem;
