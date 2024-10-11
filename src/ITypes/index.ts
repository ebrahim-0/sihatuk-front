/* eslint-disable @typescript-eslint/no-explicit-any */
export type IconProps = React.SVGProps<SVGSVGElement>;

export interface DispatchParams {
  state: Record<string, any>;
  addState: (newState: { [key: string]: any }, key?: string) => void;
  update: (payload?: any, key?: string, cb?: (pa?: object) => void) => void;
}
