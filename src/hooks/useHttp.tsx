import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Toast from "react-native-toast-message";
import { IRequestParams, Respuesta } from "./types";

export interface IHttpRequest {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: any;
  params?: IRequestParams;
  showNotificacion?: boolean;
  onSuccess?: (resp: Respuesta) => void;
  onError?: (resp: Respuesta) => void;
  onFinish?: (resp: Respuesta) => void;
}

function useHttp() {
  const showSuccessNotification = (mensaje: string) => {
    Toast.show({
      type: "success",
      text1: "Éxito",
      text2: mensaje,
    });
  };

  const showErrorNotification = (mensaje: string) => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: mensaje,
      position: "bottom",
    });
  };

  async function get({
    endpoint,
    params,
    onSuccess,
    onError,
    onFinish,
    showNotificacion = false,
  }: IHttpRequest): Promise<Respuesta> {
    let response: Respuesta = { resultado: [] };
    try {
      const { data, status } = await httpService.get<Respuesta>(endpoint, {
        params,
      });
      response = data;
      if (status === 200) {
        if (onSuccess) onSuccess(response);
        if (showNotificacion && response.mensaje) {
          showSuccessNotification(response.mensaje);
        }
      }
    } catch (error) {
      handleError(response, error, showNotificacion);
      if (onError) onError(response);
    } finally {
      if (onFinish) onFinish(response);
    }
    return response;
  }

  async function post({
    endpoint,
    body,
    headers,
    onSuccess,
    onError,
    onFinish,
    showNotificacion = true,
  }: IHttpRequest): Promise<Respuesta> {
    let response: Respuesta = { resultado: [] };
    try {
      const { data, status } = await httpService.post<Respuesta>(
        endpoint,
        body,
        { headers },
      );
      response = data;
      if (status === 200) {
        if (onSuccess) onSuccess(response);
        if (showNotificacion && response.mensaje) {
          showSuccessNotification(response.mensaje);
        }
      }
    } catch (error) {
      handleError(response, error, showNotificacion);
      if (onError) onError(response);
    } finally {
      if (onFinish) onFinish(response);
    }
    return response;
  }

  async function put({
    endpoint,
    body,
    headers,
    onSuccess,
    onError,
    onFinish,
    showNotificacion = true,
  }: IHttpRequest): Promise<Respuesta> {
    let response: Respuesta = { resultado: [] };
    try {
      const { data, status } = await httpService.put<Respuesta>(
        endpoint,
        body,
        { headers },
      );
      response = data;
      if (status === 200) {
        if (onSuccess) onSuccess(response);
        if (showNotificacion && response.mensaje) {
          showSuccessNotification(response.mensaje);
        }
      }
    } catch (error) {
      handleError(response, error, showNotificacion);
      if (onError) onError(response);
    } finally {
      if (onFinish) onFinish(response);
    }
    return response;
  }

  async function del({
    endpoint,
    params,
    body,
    headers,
    onSuccess,
    onError,
    onFinish,
    showNotificacion = true,
  }: IHttpRequest): Promise<Respuesta> {
    let response: Respuesta = { resultado: [] };
    try {
      const { data, status } = await httpService.delete(endpoint, {
        params,
        headers,
        data: body ?? params,
      });
      response = data;
      if (status === 200) {
        if (onSuccess) onSuccess(response);
        if (showNotificacion && response.mensaje) {
          showSuccessNotification(response.mensaje);
        }
      }
    } catch (error) {
      handleError(response, error, showNotificacion);
      if (onError) onError(response);
    } finally {
      if (onFinish) onFinish(response);
    }
    return response;
  }

  async function descargarArchivo({
    endpoint,
    params,
    headers,
  }: IHttpRequest): Promise<void> {
    try {
      const response = await httpService.get(endpoint, {
        params,
        headers,
        responseType: "arraybuffer",
      });

      const disposition = response.headers["content-disposition"];
      const filename =
        disposition?.match(/filename="?(.+)"?/i)?.[1] || "archivo-descargado";

      const base64 = arrayBufferToBase64(response.data);

      const fileUri = FileSystem.documentDirectory + filename;
      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(fileUri);
      } else {
        showSuccessNotification(`Archivo guardado en ${fileUri}`);
      }
    } catch (error) {
      handleError({ resultado: [] }, error, true);
    }
  }

  function arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return global.btoa(binary);
  }

  function handleError(
    response: Respuesta,
    error: any,
    showNotificacion: boolean = false,
  ): void {
    const errorMessage =
      error?.response?.data?.mensaje || "Ha ocurrido un error en la solicitud.";
    const errorDetails = error?.response?.data?.error || "Error inesperado";
    const errores = error?.response?.data?.errores;

    response.errores = [errorDetails];
    response.mensaje = errorMessage;

    if (showNotificacion) {
      if (errores && typeof errores === "object" && !Array.isArray(errores)) {
        const mensajes = Object.values(errores)
          .flat()
          .filter(Boolean) as string[];
        if (mensajes.length > 0) {
          showErrorNotification(mensajes.join("\n"));
          return;
        }
      }
      showErrorNotification(errorMessage);
    }
  }

  return { get, post, put, del, descargarArchivo };
}

export default useHttp;
