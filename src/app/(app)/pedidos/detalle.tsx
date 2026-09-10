import { Button, Col, FormItem, Row } from "@/components";
import { useCrearModelo, useEditarModelo } from "@/features/pedidos/mutations";
import { usePedido } from "@/features/pedidos/queries";
import { pedido } from "@/features/pedidos/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";

const formSchema = pedido.pick({
  identificador_externo: true,
  fecha_atencion: true,
  total: true,
  producto_id: true,
  consumidor_id: true,
  comentarios: true,
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  identificador_externo: "",
  fecha_atencion: "",
  total: "",
  producto_id: "",
  consumidor_id: "",
  comentarios: "",
};

const inputClass =
  "w-full border border-neutral-300 rounded-xl px-4 py-3 text-base";

export default function PedidosDetalle() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pedidoDetalle = usePedido(id);

  const editar = useEditarModelo(
    () => {
      setError(null);
      setMensaje("Pedido guardado correctamente.");
    },
    () => {
      setMensaje(null);
      setError("No se pudo guardar el pedido.");
    },
  );

  const crear = useCrearModelo(
    () => {
      setError(null);
      setMensaje("Pedido creado correctamente.");
    },
    () => {
      setMensaje(null);
      setError("No se pudo crear el pedido.");
    },
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = handleSubmit((values) => {
    const body = id ? { ...values, id } : values;
    if (id) {
      editar.mutate(body);
    } else {
      crear.mutate(body);
    }
  });

  const isSaving = editar.isPending || crear.isPending;

  useEffect(() => {
    if (!pedidoDetalle.data) return;
    reset({
      identificador_externo: pedidoDetalle.data.identificador_externo,
      fecha_atencion: pedidoDetalle.data.fecha_atencion,
      total: pedidoDetalle.data.total,
      producto_id: pedidoDetalle.data.producto_id,
      consumidor_id: pedidoDetalle.data.consumidor_id,
      comentarios: pedidoDetalle.data.comentarios,
    });
  }, [pedidoDetalle.data, reset]);

  if (id && pedidoDetalle.isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#a3a3a3" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4 gap-4">
        {id ? (
          <Text className="text-sm text-neutral-500">Pedido #{id}</Text>
        ) : null}

        {pedidoDetalle.isError ? (
          <Text className="text-sm text-red-500">
            No se pudo cargar el pedido.
          </Text>
        ) : null}
        {mensaje ? (
          <Text className="text-sm text-green-600">{mensaje}</Text>
        ) : null}
        {error ? <Text className="text-sm text-red-500">{error}</Text> : null}

        <Row gutter={[5, 5]}>
          <Col span={24}>
            <FormItem
              label="Identificador externo"
              name="identificador_externo"
              control={control}
              required
              render={({ value, onChange }) => (
                <TextInput
                  className={inputClass}
                  placeholder="ej. PED-0001"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </Col>

          <Col span={24}>
            <FormItem
              label="Fecha de atención"
              name="fecha_atencion"
              control={control}
              required
              render={({ value, onChange }) => (
                <TextInput
                  className={inputClass}
                  placeholder="YYYY-MM-DD"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </Col>

          <Col span={24}>
            <FormItem
              label="Total"
              name="total"
              control={control}
              required
              render={({ value, onChange }) => (
                <TextInput
                  className={inputClass}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </Col>

          <Col span={24}>
            <FormItem
              label="Producto"
              name="producto_id"
              control={control}
              render={({ value, onChange }) => (
                <TextInput
                  className={inputClass}
                  placeholder="ID del producto"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </Col>

          <Col span={24}>
            <FormItem
              label="Consumidor"
              name="consumidor_id"
              control={control}
              render={({ value, onChange }) => (
                <TextInput
                  className={inputClass}
                  placeholder="ID del consumidor"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </Col>

          <Col span={24}>
            <FormItem
              label="Comentarios"
              name="comentarios"
              control={control}
              render={({ value, onChange }) => (
                <TextInput
                  className={`${inputClass} min-h-24`}
                  placeholder="Notas del pedido"
                  multiline
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </Col>
        </Row>

        <Button onPress={onSubmit} disabled={isSubmitting || isSaving}>
          {isSubmitting || isSaving ? "Guardando..." : "Guardar"}
        </Button>
      </View>
    </ScrollView>
  );
}
