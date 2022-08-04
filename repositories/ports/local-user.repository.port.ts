import { LocalUser } from "../../core/domain/local-user";

export interface LocalUserRepositoryPort {
  get(): LocalUser | null;
  getOrThrow(): LocalUser;
  set(user: LocalUser): void;
  remove(): void;
}
