interface BaseMeta {
  total: number;
  skip: number;
  limit: number;
}

interface BaseResponse<T> {
  body: T;
}
