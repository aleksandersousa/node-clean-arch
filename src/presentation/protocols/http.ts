export type HttpResponse = {
  statusCode: number | undefined;
  body: any | undefined;
};

export type HttpRequest = {
  headers?: any;
  params?: any;
  body?: any;
  accountId?: string;
};
