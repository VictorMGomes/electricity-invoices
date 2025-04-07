import axios, { AxiosRequestHeaders, Method } from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

interface ApiRequestParams<TData = unknown> {
  method: Method;
  endpoint: string;
  data?: TData;
  params?: Record<string, unknown>;
  headers?: AxiosRequestHeaders;
}

export async function httpRequest<TResponse = unknown, TData = unknown>({
  method,
  endpoint,
  data,
  params,
  headers,
}: ApiRequestParams<TData>): Promise<TResponse> {
  try {
    const response = await http({
      method,
      url: endpoint,
      data,
      params,
      headers,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as {
      message: string;
      response?: unknown;
    };

    console.error('Erro na requisição:', {
      message: axiosError.message,
      response: axiosError.response,
    });

    throw axiosError.response ?? axiosError;
  }
}

export const httpGet = <TResponse = unknown>(
  endpoint: string,
  params?: Record<string, unknown>,
  headers?: AxiosRequestHeaders,
): Promise<TResponse> =>
  httpRequest<TResponse>({
    method: 'GET',
    endpoint,
    params,
    headers,
  });

export const httpPost = <TResponse = unknown, TData = unknown>(
  endpoint: string,
  data: TData,
  headers?: AxiosRequestHeaders,
): Promise<TResponse> =>
  httpRequest<TResponse, TData>({
    method: 'POST',
    endpoint,
    data,
    headers,
  });

export const httpPut = <TResponse = unknown, TData = unknown>(
  endpoint: string,
  data: TData,
  headers?: AxiosRequestHeaders,
): Promise<TResponse> =>
  httpRequest<TResponse, TData>({
    method: 'PUT',
    endpoint,
    data,
    headers,
  });

export const httpPatch = <TResponse = unknown, TData = unknown>(
  endpoint: string,
  data: TData,
  headers?: AxiosRequestHeaders,
): Promise<TResponse> =>
  httpRequest<TResponse, TData>({
    method: 'PATCH',
    endpoint,
    data,
    headers,
  });

export const httpDelete = <TResponse = unknown>(
  endpoint: string,
  params?: Record<string, unknown>,
  headers?: AxiosRequestHeaders,
): Promise<TResponse> =>
  httpRequest<TResponse>({
    method: 'DELETE',
    endpoint,
    params,
    headers,
  });
