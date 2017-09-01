import * as React from 'react';
import { IMessageMenuBottomProps } from './MessageMenuBottom';

export class MessageMenuTop extends React.Component<IMessageMenuBottomProps, {}> {
  render(): JSX.Element  {
    return (
      <div className="message-menu-top-root">
        {(() => {
          let availableMessageType: string;
          let menus = new Array;

          if (this.props.availableMessageTypes && this.props.availableMessageTypes.length > 0) {
            for (let i = 0; i < this.props.availableMessageTypes.length; i++) {
              availableMessageType = this.props.availableMessageTypes[i];
              for (let j = 0; j < this.props.pluginState.customMessages.length; j++) {
                let plugin = this.props.pluginState.customMessages[j];
                if (plugin.name === availableMessageType && plugin.name !== 'TextMenu' && plugin.position === 'TOP') {
                  menus.push(React.createElement(
                    this.props.pluginState.customMessages[this.props.currentMenuIndex].menu, {
                      key: 'plugin-message-interaction-' + i,
                      userState: this.props.userState,
                      roomState: this.props.roomState,
                      ownMenuIndex: i,
                      currentMenuIndex: this.props.currentMenuIndex,
                    }
                  ));
                }
              }
            }
          } else {
            for (let i = 0; i < this.props.pluginState.messages.length; i++) {
              const plugin = this.props.pluginState.messages[i];
              if (plugin.menu.name !== 'TextMenu' && plugin.position === 'TOP') {
                menus.push(React.createElement(
                  plugin.menu, {
                    key: 'plugin-message-interaction-' + i,
                    userState: this.props.userState,
                    roomState: this.props.roomState,
                    ownMenuIndex: i,
                    currentMenuIndex: this.props.currentMenuIndex,
                  }
                ));
              }
            }
          }
          return menus;
        })()}
      </div>
    );
  }
}