export type PresetImport = string | [name: string, as?: string, from?: string];
export type PresetDirective = Record<string, string | [directive: string, name?: string]>;

export interface Options {
  components: string[];
  subComponents: Record<string, string[]>;
  directives: PresetDirective;
  include: RegExp[];
  exclude: RegExp[];
}
