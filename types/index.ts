export interface IUserPayload {
 user:
  | {
     name: string;
    }
  | undefined;
 token: string;
}
