import { LocalUser } from "../core/domain/local-user";
import { LocalUserRepositoryPort } from "./ports/local-user.repository.port";
import { LocalUserMapper } from "../adapters/mappers/local-user.mapper";

export class LocalUserRepository {
  public get(): LocalUser | null {
    if (typeof window !== "undefined") {
      const stringObject = localStorage.getItem("user");
      if (!stringObject) return null;
      return LocalUserMapper.toDomain(JSON.parse(stringObject));
    } else {
      return null;
    }
  }
  public getOrThrow(): LocalUser {
    const stringObject = localStorage.getItem("user");
    if (!stringObject) throw new Error("please log in");
    return LocalUserMapper.toDomain(JSON.parse(stringObject));
  }
  public set(user: LocalUser): void {
    localStorage.setItem(
      "user",
      JSON.stringify(LocalUserMapper.toRepository(user))
    );
  }
  public remove(): void {
    localStorage.removeItem("user");
  }
}
