// import React, { Component } from 'react';

// export class ChatBot extends Component {
//   componentDidMount() {
//     (function (d, m) {
//       var kommunicateSettings = {
//         appId: '383a1307118ebfbafb28a720ce84d2d8b',
//         popupWidget: true,
//         hidePostCTA: true,
//         oneTimeRating: true,
//         labels: {
//           'start.new': 'Bắt đầu cuộc trò chuyện mới',
//           'conversations.title': 'Hội thoại',
//       },
//         onInit: function () {
//           var css =
//             '.chat-popup-widget-text{color:orange!important;} .chat-popup-widget-container{background-color:white!important;} .mck-message-inner{over-flow: auto!important; height: 280 !important} '
//           window.Kommunicate.customizeWidgetCss(css);
//           var iframeStyle = document.createElement('style');
//           var classSettings =
//             '.change-kommunicate-iframe-height{height:450px!important;width:375px!important;right:10px!important;bottom:50px!important;max-height: 100%!important;}';
//           iframeStyle.type = 'text/css';
//           iframeStyle.innerHTML = classSettings;
//           document.getElementsByTagName('head')[0].appendChild(iframeStyle);
//           var launcherIconStyle =
//             '@media(min-width: 510px){.mck-sidebox.fade.in,.mck-box .mck-box-sm{width:100%; height:100%;max-height:100%!important;border-radius:0px!important;}.mck-sidebox{right:0!important;bottom:0!important;}}';
//           window.Kommunicate.customizeWidgetCss(launcherIconStyle);

//           var iframe = window.parent.document.getElementById(
//               'kommunicate-widget-iframe'
//             ),
//             launcher = window.KommunicateGlobal.document.getElementById(
//               'mck-sidebox-launcher'
//             ),
//             preChatPopup = window.KommunicateGlobal.document.querySelector(
//               '#chat-popup-widget-container .chat-popup-widget-text-wrapper'
//             ),
//             closeButton = window.KommunicateGlobal.document.getElementById(
//               'km-chat-widget-close-button'
//             );

//           [launcher, preChatPopup].forEach(function (element) {
//             element &&
//               element.addEventListener('click', function () {
//                 iframe.classList.add('change-kommunicate-iframe-height');
//               });
//           });

//           closeButton.addEventListener('click', function () {
//             iframe.classList.remove('change-kommunicate-iframe-height');
//           });
//         },
//       };
//       // kommunicateSettings.restartConversationByUser = true;
//       //   kommunicateSettings.onInit = function () {
//       //     var defaultSettings = {
//       //             "customWelcomeEvent": "customEvent",
//       //         };
//       //         window.updateSettings(defaultSettings);
//       //     };
//       var s = document.createElement('script');
//       s.type = 'text/javascript';
//       s.async = true;
//       s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
//       var h = document.getElementsByTagName('head')[0];
//       h.appendChild(s);
//       window.kommunicate = m;
//       m._globals = kommunicateSettings;
//     })(document, window.kommunicate || {});
//   }
//   render() {
//     return <div></div>;
//   }
// }

// export default ChatBot;
import React from 'react'

const ChatBot = () => {
  return (
    <div>
      
    </div>
  )
}

export default ChatBot
