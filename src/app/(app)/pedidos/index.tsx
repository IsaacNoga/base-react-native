import { Card, Col, FormItem, Row } from "@/components";
import Divider from "@/components/Divider";
import { usePedidos } from "@/features/pedidos/queries";
import { formatDate } from "@/lib/format/fecha";
import { IRequestParams } from "@/types/api";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function PedidosIndex() {
  const router = useRouter();
  const [params, setParams] = useState<IRequestParams | undefined>(undefined);
  const { data, isLoading, isError } = usePedidos(params);

  const { control } = useForm({
    defaultValues: { buscar: "" },
    mode: "onChange",
  });

  const buscar = useWatch({ control, name: "buscar" });
  const primeraVez = useRef(true);

  useEffect(() => {
    if (primeraVez.current) {
      primeraVez.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      setParams({ buscar });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [buscar]);

  const pedidos = data?.resultado;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#a3a3a3" />
      </View>
    );
  }

  return (
    <View className="flex-1 gap-4 bg-white p-4">
      <Row gutter={[5, 5]}>
        <Col span={24}>
          <FormItem
            label="Buscar"
            name="buscar"
            control={control}
            render={({ value, onChange }) => (
              <TextInput
                className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-base"
                placeholder="buscar"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </Col>
        <Divider />
        <Col span={24}>
          <Row gutter={[5, 10]}>
            {pedidos?.map((pedido, i) => (
              <Col span={24} key={i}>
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/pedidos/detalle",
                      params: { id: pedido?.id },
                    })
                  }
                >
                  <Card hoverable={true}>
                    <Row gutter={[5, 5]} justify="space-between">
                      <Col>
                        <Text>{pedido.identificador_externo}</Text>
                      </Col>
                      <Col>
                        <Text>{formatDate(pedido.fecha_atencion, true)}</Text>
                      </Col>
                      <Divider />
                      <Col>
                        <Text>{pedido.comentarios}</Text>
                      </Col>
                    </Row>
                  </Card>
                </Pressable>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </View>
  );
}
