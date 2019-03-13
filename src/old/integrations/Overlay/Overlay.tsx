import { Filter, Overlay as OverlayContainer } from "@sajari/sdk-react";
import { css } from "emotion";
import * as React from "react";

import { Input } from "../Input";
import { SearchResponse } from "../SearchResponse";
import { Close } from "./Close";

export interface OverlayProps {
  config: { [k: string]: any };
  tabsFilter?: Filter;
  isActive?: boolean;
  defaultValue?: string;

  setOverlayControls: (obj: { [k: string]: any }) => { [k: string]: any };
}

export class Overlay extends React.Component<OverlayProps> {
  public state = { active: false };

  public componentDidMount() {
    const { isActive, setOverlayControls } = this.props;
    this.setState(state => ({ ...state, active: isActive }));

    const controls = setOverlayControls({
      hide: () => this.setState({ active: false }),
      show: () => this.setState({ active: true })
    });

    this.hide = controls.hide;
  }

  public render() {
    const { config, tabsFilter } = this.props;
    const { active } = this.state;

    return (
      <OverlayContainer isActive={active} onOuterClick={this.hide}>
        <div className={header}>
          <div className="sj-logo" onClick={this.hide} />
          <Input config={config} defaultValue={this.props.defaultValue} />
          <Close onClick={this.hide} />
        </div>

        {/* This css calc is super fragile, should look into replacing it with how i do the button width in @sajari/sdk-react */}
        <div className={css({ height: "calc(100% - 44px)" })}>
          <SearchResponse config={config} tabsFilter={tabsFilter} />
        </div>
      </OverlayContainer>
    );
  }

  // tslint:disable-next-line
  private hide = () => {};
}

const header = css({
  display: "flex",
  marginBottom: "1rem"
});