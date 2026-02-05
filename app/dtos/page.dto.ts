export class PageDto<T = unknown> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}
