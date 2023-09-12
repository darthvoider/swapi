export type TCharacter = {
  name: string;
  birthYear: string;
  height: string;
  created: string;
  url: string;
};

export interface IPeopleData {
  results: TCharacter[];
  previous: string | null;
  next: string | null;
  count: number;
}
