export interface HttpResponse {
  statusCode: number | undefined;
  body: any | undefined;
}

export interface HttpRequest {
  headers?: any;
  body?: any;
}
