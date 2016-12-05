class SocketSignals {
    static ctsMainStart() {
      return 'ctsMainStart';
    }

    static ctsMain() {
      return 'ctsMain';
    }

    static ctsCon() {
      return 'ctsCon';
    }

    static ctsConTouch() {
      return 'ctsConTouch';
    }

    static stcMainRoomID() {
      return 'stcMainRoomID';
    }

    static stcMainPlayerLogin() {
        return 'stcMainPlayerLogin';
    }

    static stcConTouchFlg() {
      return 'stcConTouchFlg';
    }
};

module.exports = SocketSignals;
