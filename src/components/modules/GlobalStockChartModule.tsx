/**
 * GlobalStockChartModule - Biểu đồ cổ phiếu quốc tế
 * Sử dụng TradingView Widget
 */

import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get('window');

export const GlobalStockChartModule: React.FC = () => {
  const [symbol] = useState('OANDA:XAUUSD');

  // HTML with TradingView Widget - Giống web project
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html, body {
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-color: #0d0d0d;
        }
        #tradingview_widget {
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>
      <div id="tradingview_widget"></div>
      <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      <script type="text/javascript">
        new TradingView.widget({
          "width": "100%",
          "height": "100%",
          "symbol": "${symbol}",
          "interval": "D",
          "timezone": "Asia/Ho_Chi_Minh",
          "theme": "dark",
          "style": "1",
          "locale": "vi_VN",
          "toolbar_bg": "#0d0d0d",
          "enable_publishing": false,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "save_image": false,
          "container_id": "tradingview_widget",
          "backgroundColor": "#0d0d0d",
          "gridColor": "rgba(255, 255, 255, 0.06)",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "studies": [
            "MASimple@tv-basicstudies",
            "RSI@tv-basicstudies"
          ],
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "650"
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={{ height: 450 }}>
      <WebView
        source={{ html: htmlContent }}
        style={{ flex: 1, backgroundColor: '#0d0d0d' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadEnd={true}
        scalesPageToFit={true}
        scrollEnabled={false}
        originWhitelist={['*']}
      />
    </View>
  );
};
